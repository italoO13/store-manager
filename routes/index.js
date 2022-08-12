const express = require('express');
const productsRoute = require('./products.router');

const routers = express.Router();

routers.use('/products', productsRoute);

module.exports = routers;