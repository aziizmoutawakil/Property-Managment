// routes/rentalPaymentRoutes.js
const express = require('express');
const router = express.Router();
const rentalPaymentController = require('../Controllers/RentalPaymentController');
const isAuth = require('../Middleware/authMiddleware')
router.post('/create',isAuth, rentalPaymentController.createPayment);
router.get('/view', rentalPaymentController.ViewAllPayments);

module.exports = router;
