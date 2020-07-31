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
const getProvider = (request, response) => {
    const { providerId } = request.body

    connection.query('SELECT * FROM provider WHERE providerId = ?', [providerId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método POST
const insertProvider = (request, response) => {
    const { providerId, providerName, address, postalCode, telephone } = request.body
    connection.query('INSERT INTO provider VALUES (?,?,?,?,?)',
        [providerId, providerName, address, postalCode, telephone], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método PUT
const updateProvider = (request, response) => {
    const { providerName, address, postalCode, telephone, providerId } = request.body
    connection.query('UPDATE provider SET providerName=?, address=?, postalCode=?, telephone=? WHERE providerId=?',
        [providerName, address, postalCode, telephone, providerId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método DELETE
const deleteProvider = (request, response) => {
    const { providerId } = request.body
    connection.query('DELETE FROM provider WHERE providerId=?', [providerId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

module.exports = {
    getProvider,
    insertProvider,
    updateProvider,
    deleteProvider,
}