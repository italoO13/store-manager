const express = require('express');
const salesController = require('../controllers/sales.controller');
const { insertValidator } = require('../middlewares/sales.validators');

const router = express.Router();

router.post('/', insertValidator, salesController.insertSales);

module.exports = router;