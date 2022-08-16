const express = require('express');
const salesController = require('../controllers/sales.controller');
const { insertValidator } = require('../middlewares/sales.validators');

const router = express.Router();

router.post('/', insertValidator, salesController.insertSales);
router.get('/', salesController.getSalesAll);
router.get('/:id', salesController.getSalesById);
router.delete('/:id', salesController.deleteSales);
router.put('/:id', insertValidator, salesController.updateSales);

module.exports = router;