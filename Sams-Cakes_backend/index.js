const express = require('express')
const bodyParser = require('body-parser')

const servicesOrder = require('./services/orderUp')
const servicesProduct = require('./services/product')
const servicesProvider = require('./services/provider')
const servicesSale = require('./services/sale')
const servicesUser = require('./services/user')

const app = express()
const port = 9003

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/getOrder', servicesOrder.getOrder)
app.post('/insertOrder', servicesOrder.insertOrder)
app.put('/updateOrder', servicesOrder.updateOrder)
app.delete('/deleteOrder', servicesOrder.deleteOrder)

app.get('/getProduct', servicesProduct.getProduct)
app.post('/insertProduct', servicesProduct.insertProduct)
app.put('/updateProduct', servicesProduct.updateProduct)
app.delete('/deleteProduct', servicesProduct.deleteProduct)

app.get('/getProvider', servicesProvider.getProvider)
app.post('/insertProvider', servicesProvider.insertProvider)
app.put('/updateProvider', servicesProvider.updateProvider)
app.delete('/deleteProvider', servicesProvider.deleteProvider)

app.get('/getSale', servicesSale.getSale)
app.post('/insertSale', servicesSale.insertSale)
app.put('/updateSale', servicesSale.updateSale)
app.delete('/deleteSale', servicesSale.deleteSale)

app.get('/getUserLogin', servicesUser.getUser)
app.post('/insertUser', servicesUser.insertUser)
app.put('/updateUser', servicesUser.updateUser)
app.delete('/deleteUser', servicesUser.deleteUser)

app.listen(port, () => {
    console.log('Conexión exitosa en el puerto: ' + port)
})