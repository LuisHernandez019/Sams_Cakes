const {BrowserWindow} = require('electron').remote
const { ipcRenderer } = require('electron')

const remote = require('electron').remote
const main = remote.require('./main.js')

let kindUser = "Admin"

document.querySelector('#btnAdmin').addEventListener('click', () => {
    let login = document.querySelector("#login");
    kindUser = "Admin"
    ipcRenderer.send('asynchronous-message', login.value, kindUser)
})

document.querySelector('#btnCashier').addEventListener('click', () => {
    let login = document.querySelector("#login");
    kindUser = "Cashier"
    ipcRenderer.send('asynchronous-message', login.value, kindUser)
})

window.onload = function () {
    ipcRenderer.on('user-reply', (event, arg) => {
        let pass = document.querySelector("#pass")

        if (arg.length == 0)
            document.querySelector("#error").textContent = 'El usuario no existe'
        else if (pass.value != arg[0].password)
            document.querySelector("#error").textContent = 'La contraseña es incorrecta'
        else if (kindUser == "Admin")
            main.actualizar('html/menuAdmin.html')
        else
            main.actualizar('html/menuCashier.html')

        setTimeout("ocultar()", 3000)
    })
};

function ocultar() {
    document.querySelector("#error").textContent = ''
}