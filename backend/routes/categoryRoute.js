const express = require('express')
const { testFunction, postCategory, categoryList, categoryDetials, updateCategory, deleteCategory } = require('../controllers/categoryController')
const router = express.Router()
const { categoryValidation, validation } = require('../validation/validator')
// const { requireSignin, requireAdmin } = require('../controllers/userController')

router.get('/demo', testFunction)
router.post('/postcategory', categoryValidation, validation, postCategory) // to insert data we have to put method post
router.get('/categorylist', categoryList)
router.get('/categorydetail/:id', categoryDetials)
router.put('/updatecategory/:id', categoryValidation, validation, updateCategory)
router.delete('/deletecategory/:id', deleteCategory)

module.exports = router
