const express = require('express')
const app = express()
const port = 3010
const cors = require('cors')
const jwt = require('jsonwebtoken');


const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sklep'
});
connection.connect();
module.exports.connection = connection;
const PRIVATE_KEY = 'PRIVATE_KEY_123';
module.exports.PRIVATE_KEY = PRIVATE_KEY;

const getUserId = require('./components/getUserId');
const verifyUserToken = require('./components/verifyUserToken');
const verifyIsAdmin = require('./components/verifyIsAdmin');


app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Server')
})

const usersRoute = require('./routes/users')
const adminsRoute = require('./routes/admins')
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






app.post('/product', (req, res) => {
    console.log(req.body.id);
    connection.query(`SELECT * from products WHERE id=${req.body.id}`,
        (error, result) => {
            if (error)
                return console.log(error);
            if (result.length > 0) {
                res.send({ 'product': result[0] })
            }
            else {
                res.send({ 'status': false })
            }
        });
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})