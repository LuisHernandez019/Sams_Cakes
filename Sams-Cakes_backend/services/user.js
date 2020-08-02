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
const getUserAdmin = (request, response) => {
    const { userName } = request.body

    connection.query('SELECT * FROM user WHERE userName = ? AND kindUser = "Admin"', [userName], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

const getUserCashier = (request, response) => {
    const { userName } = request.body

    connection.query('SELECT * FROM user WHERE userName = ? AND kindUser = "Cajero"', [userName], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método POST
const insertUser = (request, response) => {
    const { userId, name, patSurname, matSurname, birthDate, kindUser, userName, password } = request.body
    connection.query('INSERT INTO user VALUES (?,?,?,?,?,?,?,?)',
        [userId, name, patSurname, matSurname, birthDate, kindUser, userName, password], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método PUT
const updateUser = (request, response) => {
    const { name, patSurname, matSurname, birthDate, kindUser, userName, password, userId } = request.body
    connection.query('UPDATE user SET name=?, patSurname=?, matSurname=?, birthDate=?, kindUser=?, userName=?, password=? WHERE userId=?',
        [name, patSurname, matSurname, birthDate, kindUser, userName, password, userId], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

// Método DELETE
const deleteUser = (request, response) => {
    const { userName } = request.body
    connection.query('DELETE FROM user WHERE userName=?', [userName], (error, result) => {
        if (error) throw error
        response.status(200).json(result)
    })
}

module.exports = {
    getUserAdmin,
    getUserCashier,
    insertUser,
    updateUser,
    deleteUser,
}