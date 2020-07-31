const {BrowserWindow} = require('electron').remote
const remote = require('electron').remote
const main = remote.require('./main.js')

let login
let pass

function openMenuAdmin() {
    //let view = new BrowserWindow({ icon: 'img/cupcake.png' })
    //view.loadFile('./html/addUser.html')
    
    login = document.querySelector('#login')
    pass = document.querySelector('#pass')

    console.log("Login: " + login.value)
    console.log("Password: " + pass.value)

    main.actualizar('./html/addUser.html')
}

function openMenuCashier() {
    //let view = new BrowserWindow({ icon: 'img/cupcake.png' })
    //view.loadFile('./html/addProduct.html')

    login = document.querySelector('#login')
    pass = document.querySelector('#pass')

    console.log("Login: " + login.value)
    console.log("Password: " + pass.value)

    main.actualizar('./html/addProduct.html')
}

document.querySelector('#btnAdmin').addEventListener('click', openMenuAdmin)
document.querySelector('#btnCashier').addEventListener('click', openMenuCashier)

/*const remote = require('electron').remote
const main = remote.require('./main.js')

console.log('Bienvenido a login.js')
let newWin

document.querySelector('#btnAdmin').addEventListener('click', () => {
    main.secondWindow()
    main.getLogin()
})*/