const express = require('express');
const productsRoute = require('./products.router');
const salesRoute = require('./sales.router');

const routers = express.Router();

routers.use('/products', productsRoute);
routers.use('/sales', salesRoute);

module.exports = routers;