const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productsController.getProductsAll);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.postInsertProduct);

module.exports = router;