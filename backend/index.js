const express = require('express')
const app = express()
const port = 3010
const cors = require('cors')

const mysql = require('mysql');
const poolConnection = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'media-kom'
});

module.exports.poolConnection = poolConnection;
const PRIVATE_KEY = 'PRIVATE_KEY_123'; //should be an environment variable
module.exports.PRIVATE_KEY = PRIVATE_KEY;

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server')
})


const usersRoute = require('./routes/users')
const adminsRoute = require('./routes/admin/admin')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/orders')
const searchRoute = require('./routes/search')
const deliveryRoute = require('./routes/delivery')
const productsRoute = require('./routes/products')
app.use('/users', usersRoute)
app.use('/admin', adminsRoute)
app.use('/cart', cartRoute)
app.use('/orders', orderRoute)
app.use('/search', searchRoute)
app.use('/delivery', deliveryRoute)
app.use('/products', productsRoute)




app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})