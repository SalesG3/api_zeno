const { app, pool } = require('../server')

app.post('/novo/categoria', async(req, res) => {
    
    let { ID_USUARIO, CD_CATEGORIA, NM_CATEGORIA, DS_CATEGORIA } = req.body

    try{
        let [data] = await pool.promise().execute(`CALL INSERT_CATEGORIA ( ?, ?, ?, ? )`,
            [ID_USUARIO, CD_CATEGORIA, NM_CATEGORIA, DS_CATEGORIA]
        )

        res.status(200).send({
            sucesso: true,
            mensagem: "Registro Salvo com Sucesso!"
        })
    }
    catch(err){
        

        if(err.code == "ER_DUP_ENTRY"){
            let match = err.sqlMessage.match(/key '(.+?)'/)

            res.status(200).send({
                sucesso: false,
                mensagem: `Chave Duplicada! (${match[1]})`
            })
            return
        }

        console.log(err)
        res.status(500).send({
            sucesso: false,
            mensagem: err
        })
    }
})

app.get('/grid/categoria/:id', async(req, res) => {

    let [data] = await pool.promise().execute(`SELECT * FROM CATEGORIAS WHERE ID_USUARIO = ?`,
        [req.params.id]
    )

    res.status(200).send(data)
})