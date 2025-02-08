const express = require('express')
const catchAsync = require('../utils/catchAsync.js')
const router = express.Router()
const { storeReturnTo, passportAuth } = require('../middleware.js')
const { getNewUserForm, createNewUser, getLoginForm,
    createUserSession, endUserSession } = require('../controllers/user.controller.js')


router.route('/register')
    .get(getNewUserForm)
    .post(catchAsync(createNewUser))

router.route('/login')
    .get(getLoginForm)
    .post(storeReturnTo, passportAuth, createUserSession)

router.get('/logout', endUserSession)

module.exports = router