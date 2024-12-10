const OrderItem = require('../models/order-itemModel')
const Order = require('../models/orderModel')

// post order
exports.postOrder = async(req,res)=>{
    const orderItemIds = Promise.all(req.body.orderItems.map(async orderItem=>{
         let newOrderItem = new OrderItem({
            quantity:orderItem.quantity,
            product:orderItem.product,

         })
         newOrderItem = await newOrderItem.save()
         return newOrderItem._id

    } ))
    const orderItemIdsResolved = await orderItemIds
    // calculating total price
    const totalAmount = await Promise.all(orderItemIdsResolved.map(async orderId=>{
        const itemOrder = await OrderItem.findById(orderId).populate('product', 'product_price')
        const total = itemOrder.quantity*itemOrder.product.product_price
        return total

        //[400,3000,5000]

    }))
    const TotalPrice = totalAmount.reduce((a,b)=>a+b,0)

    let order = new Order({
        orderItems: orderItemIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2:req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        totalPrice:TotalPrice,
        user:req.body.user
    })
    order = await order.save()
    if(!order){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(order)
}

// orderlist
exports.orderList = async(req,res)=>{
    const order = await Order.find()
    .populate('user', 'name')
    .sort({createdAt:-1})
    if(!order){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(order)
}

// order details
exports.orderDetails = async(req,res)=>{
    const order = await Order.findById(req.params.id)
    .populate('user','name')
    .populate({
        path:'orderItems',populate:{
            path:'product',populate:'category'
        }
    })
    if(!order){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(order)
}


//update status
exports.updateStatus = async(req,res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {status:req.body.status},
        {new:true}
    )
    if(!order){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(order)
}

// order list of specific user
exports.userOrders = async(req,res)=>{
    const userOrderList = await Order.find({user:req.params.userId})
    .populate({
        path:'orderItems',populate:{
            path:'product',populate:'category'
        }
    })
    .sort({createdAt:-1})
    if(!userOrderList){
        return res.status(400).json({error:'something went wrong'})
    }
    res.send(userOrderList)
}