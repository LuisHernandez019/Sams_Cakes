const mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'user.nodejs',
    password: '12345',
    database: 'bakerysamscakes'
})

connection.connect((err) => {
    if (err) throw err
    console.log('Conexión a la base de datos ha sido exitosa')
})

// Método GET
const getSale = (request, response) => {
    const { saleId } = request.body

    connection.query('SELECT * FROM sale WHERE saleId = ?', [saleId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método POST
const insertSale = (request, response) => {
    const { saleId, dateSale, timeSale, subtotal, VAT, total, productId } = request.body
    connection.query('INSERT INTO sale VALUES (?,?,?,?,?,?,?)',
        [saleId, dateSale, timeSale, subtotal, VAT, total, productId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método PUT
const updateSale = (request, response) => {
    const { dateSale, timeSale, subtotal, VAT, total, productId, saleId } = request.body
    connection.query('UPDATE sale SET dateSale=?, timeSale=?, subtotal=?, VAT=?, total=?, productId=? WHERE saleId=?',
        [dateSale, timeSale, subtotal, VAT, total, productId, saleId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método DELETE
const deleteSale = (request, response) => {
    const { saleId } = request.body
    connection.query('DELETE FROM sale WHERE saleId=?', [saleId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

module.exports = {
    getSale,
    insertSale,
    updateSale,
    deleteSale,
}