const express =require ('express');
const router =express.Router();
const PaymentController = require('../controllers/Payment.controller');


router.post('/',PaymentController.postPayment);

module.exports = router;