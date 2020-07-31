const {app, BrowserWindow, net} = require('electron')

let win
let secondWin

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
    win.webContents.openDevTools()

    getLogin()
}

app.on('ready', createWindow)

exports.actualizar = (ruta) => {
    win.loadFile(ruta)
    win.maximize()
    win.setResizable(false)
    win.setMovable(false)
}

exports.secondWindow = () => {
    console.log(":)")
    secondWin = new BrowserWindow({ icon: 'img/cupcake.png' })
    secondWin.loadFile("./html/addUser.html")
    win.maximize()
    win.setResizable(false)
    win.setMovable(false)
}

function getLogin() {
    const data = JSON.stringify({
        'userName': 'La mera mera'
    })

    const options = {
        method: 'GET',
        protocol: 'http:',
        hostname: 'localhost',
        port: 9002,
        path: '/getUser'
    }

    const request = net.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)
    })

    request.setHeader('Content-Type', 'application/json');
    request.write(data);
    request.end();

    request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`)
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
            console.log(JSON.parse(chunk)[0].login)
        });
    });
}