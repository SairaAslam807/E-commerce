import mongoose from "mongoose";
import Order from "../models/order.model.js";

// create or send order  || only User
const createOrder = async (req, res) =>{
    try {
        const {userId, productId, invoiceNo, quantity, salePrice, discount, totalPrice, status } = req.body;

        const create = await Order.create({
            userId, 
            productId, 
            invoiceNo, 
            quantity,
            salePrice, 
            discount, 
            totalPrice, 
            status
        })

        if(!create){
            return res.status(404).json({
                error : "Error",

            })
        }

        return res.status(200).json({
            status : "Success",
            message : "User order created",
            create
        })


    } catch (error) {
        console.log("Error in creating order", error)
        
    }
}


// read orders  || Admin can also view orders
const readOrders = async (req, res) =>{
    try {
       
        const read = await Order.find().populate('userId').populate('productId')

        if(!read){
            return res.status(404).json({
                error : "Error",

            })
        }

        return res.status(200).json({
            status : "Success",
            message : "All Orders listed here",
            read
        })


    } catch (error) {
        console.log("Error in reading orders", error)
        
    }
}

// read One order ||  Admin can also view one order
const readOneOrder = async (req, res) =>{
    try {
       
        const readOne = await Order.findById(req.params.id).populate('userId').populate('productId')

        if(!readOne){
            return res.status(404).json({
                error : "Error",

            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Your Order details are",
            readOne
        })


    } catch (error) {
        console.log("Error in reading your order", error)
        
    }
}

// update Order
const updateOrder = async (req, res) =>{
    try {
       
        const update = await Order.findByIdAndUpdate(req.params._id, {new : true}).populate(userId, productId)

        if(!update){
            return res.status(404).json({
                error : "Error",

            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Your order is updated",
            update
        })


    } catch (error) {
        console.log("Error in updating order", error)
        
    }
}

// delete A Order
const deleteOrder = async (req, res) =>{
    try {
       
        const deletedOrder = await Order.findByIdAndDelete(req.params._id).populate(userId, productId)

        if(!deleteOrder){
            return res.status(404).json({
                error : "Error",

            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Order is deleted",
            deleteOrder
        })


    } catch (error) {
        console.log("Error in deleting orders", error)
        
    }
}

// User Check Order history
const orderHistory = async (req, res) =>{
    try {
        const userId = req.user._id;
        console.log(userId)
        const history = await Order.find({userId : userId}).populate('productId').sort({createdAt : -1});

        console.log(history)

        if(!history){
            return res.status(404).json({
                error : "Order history not found"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Order History found",
            history
        })
    } catch (error) {
        console.log("Error in Order History Controller", error)
    }
}

export{createOrder, readOrders, readOneOrder, updateOrder, deleteOrder, orderHistory}