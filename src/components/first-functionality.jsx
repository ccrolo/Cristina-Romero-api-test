import React, { useEffect, useState } from "react"

//BOOTSTRAP
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

//API KEY

import {key} from "../apikey.js"




function FirstFunctionality() {


    const [disease, setDisease] = useState([])
    const [inputData, setInputData] = useState('')
    

    const handleSubmit = e => {

        e.preventDefault()
        setInputData(e.target.input.value)
        e.target.reset()

    }

    // Hacemos la llamada al endpoint: pasamos por query params la info introducida en el input

    useEffect(() => {
        fetch(`https://api.disgenetplus.com/api/v1/gda/summary?disease=UMLS_${inputData}`, {
            method: 'GET',
            headers: { 'Authorization': `${key}` }
        })
            .then(j => j.json())
            .then(data => {

                const diseaseInfo = data.payload
                const finalDiseaseInfo = diseaseInfo.slice(0, 10)
                setDisease(finalDiseaseInfo)
            })
                           
    }, [inputData])


    return (
        <React.Fragment>
            <Container fluid className="w-100">
                {/* Input de entrada */}
                <Card className="border-0 px-5" bg="transparent">
                    <Form className="mt-5 justify-content-end" onSubmit={handleSubmit}>

                        <Form.Control style={{ width: "200px" }} className="p-3 text-end" name="input " type="input" id="input" placeholder="Enter disease identifier" />
                        <Button variant="dark" className="mt-3 mb-5" type="submit">Enter</Button>
                    </Form>
                {/* Tabla con la info solicitada. El spinner  */}
                    {disease === null
                        ? <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        : <Table striped bordered hover size="sm" variant="dark">
                            <thead>
                                <tr>
                                    <th>{inputData}</th>
                                    <th>Gene HGNC Symbol</th>
                                    <th>Score</th>
                                    <th>Year Initial</th>
                                    <th>Year Final</th>
                                </tr>
                            </thead>
                            <tbody>
                                {disease !== undefined
                                    ? disease.map(e =>
                                        <tr key={e.assocID}>
                                            <td> Associate ID: {e.assocID}</td>
                                            <td>{e.symbolOfGene}</td>
                                            <td> {e.score}</td>
                                            <td>{e.yearInitial}</td>
                                            <td>{e.yearFinal}</td>
                                        </tr>)
                                    : ''}
                            </tbody>

                        </Table>}
                </Card>

            </Container>
        </React.Fragment>
    )
}

export default FirstFunctionality