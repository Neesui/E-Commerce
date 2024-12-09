const{check, validationResult}=require('express-validator')


export const categoryValidation = [
    check('categoryName', 'Category name is required')
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters long'),

    check('description', 'Description is required')
        .notEmpty()
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long'),

    check('imageUrl', 'Image URL is required')
        .notEmpty()
        .isURL()
        .withMessage('Image URL must be a valid URL')
];

exports.productValidation = [
    check('product_name','product name is required').notEmpty()
    .isLength({min:3}).withMessage('product name must be more than 3 characters'),
    check('prduct_price', 'price is required').notEmpty()
    .isNumeric().withMessage('price must be a numeric value'),
    check('countInStock', 'stock is required').notEmpty()
    .isNumeric().withMessage('stock must be a numeric value'),
    check('product_description', 'description is required').notEmpty()
    .isLength({min:20}).withMessage('description must be at least of 20 characters or more'),
    check('category', 'category is required').notEmpty()
]

exports.userValidation=[
    check('name', 'name is required').notEmpty()
    .isLength({min:3}).withMessage('product name must be more than 3 characters'),
    check('email', 'email is required').notEmpty()
    .isEmail().withMessage('Invalid email'),
    check('password', 'password is required').notEmpty()
    .matches(/[a-z]/).withMessage('password must contain one lowercase letter')
    .matches(/[A-Z]/).withMessage('password must contain one uppercase letter')
    .matches(/[0-9]/).withMessage('password must contain one numeric value')
    .matches(/[@#$_?!]/).withMessage('password must contain special characters')
    .isLength({min:8}).withMessage('password must be minimum of 8 characters'),

]

exports.passwordValidation=[
    check('password', 'password is required').notEmpty()
    .matches(/[a-z]/).withMessage('password must contain one lowercase letter')
    .matches(/[A-Z]/).withMessage('password must contain one uppercase letter')
    .matches(/[0-9]/).withMessage('password must contain one numeric value')
    .matches(/[@#$_?!]/).withMessage('password must contain special characters')
    .isLength({min:8}).withMessage('password must be minimum of 8 characters'),
]
exports.validation=(req,res,next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        next()
    }
    else{
        return res.status(400).json({error:errors.array()[0].msg})
    }
}