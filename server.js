require('dotenv').config()

// Autenticação do Token
const auth = function(req, res, next){
    
    if(!req.headers.token || req.headers.token != process.env.TOKEN){
        res.status(401).send({
            atuh: "Não autorizado!"
        })
        return
    }
    else if(req.headers.token == process.env.TOKEN){
        next()
        return
    }
}

// Servidor Express
const express = require('express')
const cors = require('cors')
const http = require('http')

const app = express()
app.use(express.json(), cors({ origin: "*" }), auth)

const server = http.createServer(app)

server.listen(process.env.PORT, (err) => {
    if(err) throw err
    console.log('Servidor Live! Porta:', process.env.PORT)
})

// Conexão com Banco de Dados
const mysql = require('mysql2')

const pool = mysql.createPool(process.env.DBURL)

pool.getConnection((err, con) => {
    if(err) throw err
    console.log("Banco de Dados conectado!")
    con.release()
})

// Exporta os módulos

module.exports = {
    app: app,
    pool: pool
}