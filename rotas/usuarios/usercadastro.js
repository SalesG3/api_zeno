const { app, pool } = require('../../server')

app.post('/usuarios/cadastro', async(req, res) => {

    let { CD_USUARIO, NM_USUARIO, SENHA } = req.body

    // Validações Iniciais
    if(!CD_USUARIO || !NM_USUARIO || !SENHA){
        res.status(400).send({
            codigo: "001",
            mensagem: "Parâmetros esperados não encontrados!"
        })
        return
    }

    // Execução no Banco
    try{
        let [data] = await pool.promise().execute(`CALL INSERT_USUARIO( ?, ?, ?)`,
            [CD_USUARIO, NM_USUARIO, SENHA]
        )

        if(data.affectedRows > 0){
            res.status(200).send({
                sucesso: true,
                mensagem: "Registro salvo no Banco de Dados!"
            })
            return
        }
    }

    // Tratamento de Erros
    catch(err){
        if(err.code == "ER_DUP_ENTRY"){
            res.status(200).send({
                sucesso: false,
                mensagem: "Esse número de celular já foi cadastrado!"
            })
            return
        }

        console.log(err)
        res.status(500).send({
            erro: err
        })
    }
})