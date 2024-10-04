const express = require('express');
const router = express.Router();
const tenantController = require('../Controllers/TenantControllers');
const authMidleware = require('../Middleware/authMiddleware')

router.post('/create',authMidleware, tenantController.addTenant);
router.get('/view', tenantController.ViewTenants);
router.get('/view/:id', tenantController.ViewTenant);
router.delete('/delete/:id', tenantController.deleteTenant);
router.patch('/update/:id', authMidleware,tenantController.updateTenant);

module.exports = router;
