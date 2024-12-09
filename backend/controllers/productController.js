const Product = require('../models/productModel')

    // to post / insert product
    exports.postProduct = async(req,res)=>{
        let product =new Product({
            product_name:req.body.product_name,
            product_price:req.body.product_price,
            countInStock:req.body.countInStock,
            product_description:req.body.product_description,
            // product_image:req.file.path,
            category:req.body.category
        })
        product=await product.save()
        if(!product){
            return res.status(400).json({error:'Something went wrong'})
        }
        res.send(product)
    }

    // retrive all product
  exports.productList=async(req,res)=>{
    const product=await Product.find().populate("category","_id category_name")
    if(!product){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.send(product)
  }  

  //productdetails
  exports.productDetails=async(req,res)=>{
    const product =await Product.findById(req.params.id)
    .populate('category','category_name')
    if(!product){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.send(product)
}

// product update
exports.updateProduct=async(req,res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,{
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        countInStock:req.body.countInStock,
        product_description:req.body.product_description,
        // product_image:req.file.path,
        category:req.body.category
    },
    {new:true}
    )

    if(!product){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.send(product)
}

// product deleted
exports.deleteProduct=(req,res)=>{
    Product.findByIdAndDelete(req.params.id)
    .then(product=>{
        if(!product){
            return res.status(404).json({error:'Category with that id is not found'})
        }
        else{
            return res.status(404).json({error:'Category deleted'})

        }
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
}