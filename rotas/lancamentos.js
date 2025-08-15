const { app, pool } = require('../server')

app.post('/novo/lancamento', async(req, res) => {
    let { DT_LANCAMENTO, TP_LANCAMENTO, ID_CATEGORIA, DS_LANCAMENTO, VL_LANCAMENTO } = req.body

    let [data] = await pool.execute(`INSERT INTO LANCAMENTOS`)
})