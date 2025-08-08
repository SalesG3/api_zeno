const { app, pool } = require('../../server')

// Login Usuário
app.post('/usuarios/login', async(req, res) => {
    
    let {CD_USUARIO, SENHA} = req.body

    // Validações Iniciais
    if(!CD_USUARIO || !SENHA){
        res.status(400).send({
            codigo: "001",
            mensagem: "Parâmetros esperados não encontrados!"
        })
        return
    }

    // Execução no Banco
    try{
        let [data] = await pool.promise().execute(`CALL LOGIN_USUARIO( ?, ?)`,
            [CD_USUARIO, SENHA]
        )

        if(data[0].length < 1){
            res.status(200).send({
                sucesso: false,
                codigo: "002",
                mensagem: "Credênciais Inválidas!"
            })
            return
        }

        res.status(200).send({
            sucesso: true,
            data: data[0]
        })
    }

    // Tratamento de erros
    catch(err){
        console.log(err)
        res.status(500).send({
            erro: err
        })
        return
    }
})