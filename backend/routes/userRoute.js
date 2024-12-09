const express = require('express')
const { postUser, postEmailConfirmation, signIn, forgetPassword, resetPassword, userList, userDetials, signOut, requireSignin } = require('../controllers/userController')
const { userValidation, passwordValidation, validation } = require('../validation/validator')
const router = express.Router()

router.post('/register', userValidation, passwordValidation, validation, postUser)
router.put('/confirmation/:token', postEmailConfirmation)
router.post('/signin', signIn)
router.post('/forgetpassword', forgetPassword)
router.put('/resetpassword/:token', passwordValidation, validation, resetPassword)
router.get('/userlist', requireSignin, userList)
router.get('/userdetails/:id',requireSignin, userDetials)
router.post('/signout', signOut)


module.exports = router