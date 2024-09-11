const express = require('express');
const router = express.Router();
const propertyController = require('../Controllers/PropertyControllers'); 
const isAuth = require('../Middleware/authMiddleware')
router.post('/create',isAuth, propertyController.addProperty);

router.get('/view', propertyController.getAllProperties);

router.get('/view/:id', propertyController.getPropertyById);

router.put('/update/:id',isAuth, propertyController.updateProperty);

router.delete('/delete/:id',isAuth, propertyController.deleteProperty);

module.exports = router;
