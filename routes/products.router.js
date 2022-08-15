const express = require('express');
const productsController = require('../controllers/products.controller');
const { validatePostProduct } = require('../middlewares/products.validators');

const router = express.Router();

router.get('/', productsController.getProductsAll);
router.get('/:id', productsController.getProductById);
router.post('/', validatePostProduct, productsController.postInsertProduct);
router.put('/:id', productsController.updateProduct);

module.exports = router;