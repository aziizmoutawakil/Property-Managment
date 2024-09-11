const {RentalPayment} = require('../models');

exports.createPayment = async (req, res) => {
    try {
        const { amount,
             paymentDate,
              tenantId,
               status } = req.body;
        const payment = await RentalPayment.create({
             amount,
              paymentDate,
               tenantId,
                status });
        res.status(201).json(payment);
    } catch (error) {
        res.status(400)
        .json({ error: error.message });
    }
};

exports.ViewAllPayments = async(req,res) => {
    try {
        const payments = await RentalPayment.findAll()
    res.status(200).json(payments)
    } catch (error) {
        console.log('error viewing', error);
        
        res.status(500).json({error : error.message})
    }
}
