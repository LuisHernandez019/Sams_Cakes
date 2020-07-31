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
const getProduct = (request, response) => {
    const { productId } = request.body

    connection.query('SELECT * FROM product WHERE productId = ?', [productId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método POST
const insertProduct = (request, response) => {
    const { productId, productName, category, unitPrice, expirationDate, providerId } = request.body
    connection.query('INSERT INTO product VALUES (?,?,?,?,?,?)',
        [productId, productName, category, unitPrice, expirationDate, providerId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método PUT
const updateProduct = (request, response) => {
    const { productName, category, unitPrice, expirationDate, providerId, productId } = request.body
    connection.query('UPDATE product SET productName=?, category=?, unitPrice=?, expirationDate=?, providerId=? WHERE productId=?',
        [productName, category, unitPrice, expirationDate, providerId, productId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método DELETE
const deleteProduct = (request, response) => {
    const { productId } = request.body
    connection.query('DELETE FROM product WHERE productId=?', [productId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

module.exports = {
    getProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
}