const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/insert', async (req, res) => {
    await insertPeople(res);
})

app.get('/', async (req, res) => {
    await selectPeople(res)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})

async function selectPeople(res) {
    connection.query('SELECT * FROM people', (err, rows) => {
        if (err) res.send(err)
        else{
            res.write('<h1>Full Cycle</h1>')
            rows.forEach(row => {
                res.write('<h2>'+ row.name +'</h2>')
            })
            res.end()
        }
    })
}

async function insertPeople() {
    const sqlInsert = `INSERT INTO people(name)
                       values ('Danilo Kodavara')`
    connection.query(sqlInsert)
}