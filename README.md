# Cristina Romero

Project realized for me, Cristina Romero for the technical test of MedBioinformatics


## Introduction

I have developed the project using Javascript language and the React.js framework, with Bootstrap as a library.



## PROJECT DESCRIPTION

The project consists of a main page composed of two components: first functionality and second functionality. 

Each of the components has an entry where you can write the desired code and a sample table with the requested information.

The first functionality returns a table with the top 10 disease-associated genes. They are displayed in descending order of score with the following information: The disease identifier, Gene HGNC Symbol, score, year initial and year final. 

In addition, the id of the associated gene to which each row of the table refers is specified as extra information.
For the correct information to be displayed, the UMLS code associated with the disease must be entered and 'enter' must be pressed.

The second functionality returns a table with the Gene HGNC symbol, the number of variants and the list of variants.
For the correct information to be displayed, a Gene HGNC symbol must be entered and 'enter' must be pressed.



## COMMENTS

To create the tables, I chose to use the Bootstrap library because the ReactDataGrid library gave me problems.

What I found more complicated was to understand the API and to know what information I was looking for and how I could get it.


At first I put the API KEY in a .js file and wrote it down in the gitignore so that it would be hidden, but I decided to change it so that there would be no problems when initializing the application.

