const mongoose = require('mongoose');
const Product = require('../models/productModel')

// to path/insert product
exports.postProduct = async(req,res)=>{
    let product = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        countInStock: req.body.countInStock,
        product_description:req.body.product_description,
        product_image:req.file.path,
        category:req.body.category,
    })
    product = await product.save()
    if(!product){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(product)
}

// to show all the product
exports.productlist = async(req, res)=>{
    const product = await Product.find()
     if(!product){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(product)

}

// product details
exports.productDetails = async(req,res)=>{
    const product = await Product.findById(req.params.id)
    .populate('category', 'category_name') // to see data of connect table
    if(!product){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(product)
}

// update product
exports.updateProduct = async (req, res) => {
    const id = req.params.id.trim(); // Remove any whitespace or newlines

    // Check if the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid product ID format' });
    }

    try {
        const product = await Product.findByIdAndUpdate(id, {
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            countInStock: req.body.countInStock,
            product_description: req.body.product_description,
            product_image: req.file.paths,
            category: req.body.category,
        }, { new: true });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// delete product


exports.deleteProduct =(req, res)=>{
    Product.findByIdAndDelete(req.params.id)
    .then(product=>{
        if(!product){
            return res.status(403).json({error:'product with that id not found'})
        }
        else{
            return res.status(200).json({message:"product deleted"})
        }
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
}