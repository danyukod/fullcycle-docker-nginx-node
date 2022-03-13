const express = require('express')
const app = express()
const port = 3000

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
    const conn = await connect();
    conn.query('SELECT * FROM people', (err, rows) => {
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
    const conn = await connect();
    const sqlInsert = `INSERT INTO people(name)
                       values ('Danilo Kodavara')`
    conn.query(sqlInsert)
    conn.end()
}

async function connect() {
    const config = {
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'nodedb'
    }

    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql");
    const connection = await mysql.createConnection(config);
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}