const Category = require('../models/categoryModel')

exports.testFunction = (req,res)=>{
    res.send('This is from the category controller')   
}


// to inser the category data

exports.postCategory = async(req, res)=>{
    let category = new Category({
        // database name           
        category_name :req.body.category_name // to take input from user
    })
    // to check if category name already exist in database
    Category.findOne({category_name:category.category_name})
    .then(async categories =>{
        if(categories){
            return res.status(400).json({error:"category must be unique"})
        }
        else{
            category = await category.save() // to insert the take data from user
            if(!category){
                return res.status(400).json({error: 'Something went wrong'}) // bad request status
            }
            res.send(category)
        }
    })
    .catch(err=>res.status(400).json({error:err}))
   
}

// to retrieve all data
exports.categoryList = async(req, res)=>{
    const category = await Category.find()
    if(!category){
        return res.status(400).json({error: 'Something went wrong'})
    }
    res.send(category)
}

// to view category details
exports.categoryDetials = async(req, res)=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({error: 'Something went wrong'})
    }
    res.send(category)
}

// to update category

exports.updateCategory = async(req,res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id, {
        category_name:req.body.category_name
    },{new:true})
    if(!category){
        return res.status(400).json({error: 'Something went wrong'})
    }
    res.send(category)
}

// delete category
exports.deleteCategory =(req, res)=>{
    Category.findByIdAndDelete(req.params.id)
    .then(category=>{
        if(!category){
            return res.status(403).json({error:'category with that id not found'})
        }
        else{
            return res.status(200).json({message:"category deleted"})
        }
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
}