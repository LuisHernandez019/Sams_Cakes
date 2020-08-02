const { app, BrowserWindow, net, ipcMain} = require('electron')

let win
var respuesta

function createWindow() {
    win = new BrowserWindow({ show: false, icon: 'img/cupcake.png',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    win.once('ready-to-show', () => { win.show() })
    win.loadFile("./html/login.html")
    win.maximize()
    win.setResizable(false)
    win.setMovable(false)
    win.removeMenu()
}

app.on('ready', createWindow)

let actualizar = (ruta) => {
    win.loadFile(ruta)
    win.maximize()
    win.setResizable(false)
    win.setMovable(false)
    win.removeMenu()
}

const consultaLoginAdmin = (userName) => {
    const options = {
        method: 'GET',
        protocol: 'http:',
        hostname: 'localhost',
        port: 9003,
        path: '/getUserAdmin'
    }

    const request = net.request(options, (res) => {
        console.log(` Request statusCode: ${res.statusCode}`)
    })
    request.setHeader('Content-Type', 'application/json');

    const data = JSON.stringify({
        'userName': userName
    });

    request.write(data);
    request.end();

    request.on('response', (response) => {
        response.on('data', (chunk) => {
            respuesta = JSON.parse(chunk)
        })
    })
}

const consultaLoginCashier = (userName) => {
    const options = {
        method: 'GET',
        protocol: 'http:',
        hostname: 'localhost',
        port: 9003,
        path: '/getUserCashier'
    }

    const request = net.request(options, (res) => {
        console.log(` Request statusCode: ${res.statusCode}`)
    })
    request.setHeader('Content-Type', 'application/json');

    const data = JSON.stringify({
        'userName': userName
    });

    request.write(data);
    request.end();

    request.on('response', (response) => {
        response.on('data', (chunk) => {
            respuesta = JSON.parse(chunk)
        })
    })
}

ipcMain.on('asynchronous-message', (event, arg, kindUser) => {
    dosomething(arg, kindUser, function () {
        setTimeout(() => {
            event.reply('user-reply', respuesta)
        }, 500)
    });
})

function dosomething(damsg, kindUser, callback) {
    if (kindUser == "Admin") {
        consultaLoginAdmin(damsg)
    }
    else if (kindUser == "Cashier") {
        consultaLoginCashier(damsg)
    }

    if (typeof callback == "function")
        callback()
}

module.exports = {
    actualizar,
}