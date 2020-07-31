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
const getOrder = (request, response) => {
    const { orderId } = request.body

    connection.query('SELECT * FROM orderup WHERE orderId = ?', [orderId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método POST
const insertOrder = (request, response) => {
    const { orderId, orderDate, orderTime, deliveryDate, addressDelivery, clientName, telephone, subtotal, VAT, total, productId } = request.body
    connection.query('INSERT INTO orderup VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [orderId, orderDate, orderTime, deliveryDate, addressDelivery, clientName, telephone, subtotal, VAT, total, productId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método PUT
const updateOrder = (request, response) => {
    const { orderDate, orderTime, deliveryDate, addressDelivery, clientName, telephone, subtotal, VAT, total, productId, orderId } = request.body
    connection.query('UPDATE orderup SET orderDate=?, orderTime=?, deliveryDate=?, addressDelivery=?, clientName=?, telephone=?, subtotal=?, VAT=?, total=?, productId=? WHERE orderId=?',
        [orderDate, orderTime, deliveryDate, addressDelivery, clientName, telephone, subtotal, VAT, total, productId, orderId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método DELETE
const deleteOrder = (request, response) => {
    const { orderId } = request.body
    connection.query('DELETE FROM orderup WHERE orderId=?', [orderId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

module.exports = {
    getOrder,
    insertOrder,
    updateOrder,
    deleteOrder,
}