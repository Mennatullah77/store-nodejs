const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

router.get('/setup', adminController.getSetup);

router.post('/setup' , adminController.postSetup )

router.get('/login' , adminController.getLogin )

router.post('/login' , adminController.postLogin)

router.get('/dashboard' , adminController.dashboard)

module.exports = router;
