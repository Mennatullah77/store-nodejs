const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')
const { restrict, checkLogin, checkAccess } = require('../lib/auth')

router.get('/admin/setup', adminController.getSetup);

router.post('/admin/setup' , adminController.postSetup )

router.get('/admin/login' , adminController.getLogin )

router.post('/admin/login' , adminController.postLogin)

router.get('/admin/dashboard' , restrict , adminController.dashboard)

router.get('/admin/users' , restrict ,adminController.getUsers)

router.get('/admin/user/new' , restrict , checkAccess , adminController.getNewUser)

router.post('/admin/user/new' , restrict , checkAccess , adminController.postNewUser)

router.get('/admin/user/edit/:userId' , restrict , checkAccess, adminController.getEditUser)

router.post('/admin/user/edit/:userId' , restrict ,checkAccess ,adminController.postEditUser)

router.get('/admin/logout' , adminController.logout)




module.exports = router;
