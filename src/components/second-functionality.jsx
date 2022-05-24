import React, { useEffect, useState } from "react"

//BOOTSTRAP
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'


function SecondFunctionality() {


    const [symbol, setSymbol] = useState([])
    const [variant, setVariant] = useState([])
    const [inputData, setInputData] = useState('')

    const handleSubmit = e => {

        e.preventDefault()
        setInputData(e.target.input.value)
        e.target.reset()

    }

     // Hacemos la llamada al endpoint: pasamos por query params la info introducida en el input

    useEffect(() => {
        fetch(`https://api.disgenetplus.com/api/v1/entity/gene?gene_symbol=${inputData}`, {
            method: 'GET',
            headers: { 'Authorization': `63bf1392-f32a-448d-8986-6b0b937f9b17` }
        })
            .then(j => j.json())
            .then(data => {
               
                setSymbol(data.payload[0].symbolOfGene)
                setVariant(data.payload[0].geneToVariants)


            })
    }, [inputData])


    return (
        <React.Fragment>

            <Container fluid className="w-100">
                <Card className="border-0 px-5" bg="transparent">
                    <Form className="mt-5 justify-content-end" onSubmit={handleSubmit}>

                        <Form.Control style={{ width: "250px" }} className="text-center p-3"
                            name="input " type="input" id="input" placeholder="Enter Gene HGNC symbol" />
                        <Button variant="dark" className="mt-3 mb-5" type="submit">Enter</Button>
                    </Form>
                    {variant === undefined
                        ? <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>

                        : <Table striped bordered hover size="sm" className="p-5 w-50" variant="dark">
                            <thead>
                                <tr>
                                    <th>Gene HGNC symbol: {symbol}</th>
                                    <th>Number of Variants: {variant.length} </th>
                                </tr>
                            </thead>
                            <tbody>
                                {variant !== undefined
                                    ? variant.map((e, i) =>
                                        <tr key={i}>
                                            <td> {i + 1}</td>
                                            <td> {e.variantStrID}</td>
                                        </tr>)
                                    : ''}
                            </tbody>

                        </Table>}
                </Card>

            </Container>
        </React.Fragment>
    )
}

export default SecondFunctionality