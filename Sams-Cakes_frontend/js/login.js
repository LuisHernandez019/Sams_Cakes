const {BrowserWindow} = require('electron').remote
const { ipcRenderer } = require('electron')

const remote = require('electron').remote
const main = remote.require('./main.js')

document.querySelector("#btnAdmin").addEventListener('click', () => {
    let login = document.querySelector("#login");
    ipcRenderer.send('asynchronous-message', login.value)
})

window.onload = function () {
    ipcRenderer.on('user-reply', (event, arg) => {
        let pass = document.querySelector("#pass")

        if (arg.length == 0)
            document.querySelector("#error").textContent = 'Usuario no existe'
        else if (pass.value != arg[0].password)
            document.querySelector("#error").textContent = 'La contraseña es incorrecta'
        else
            main.actualizar('html/menuAdmin.html')
    })
};