import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },

    invoiceNo : {
        type : Number,
        required : true
    },

    quantity : {
        type : Number,
        required : true
    },

    salePrice : {
        type : Number,
        required : true
    },

    discount : {
        type : Number,
        required : true
    },

    totalPrice : {
        type : Number,
        required : true
    },

    status : {
        type : String,
        enum : ["pending", "accepted", "outForDelivery", "delivery", "done"]
    }
   
}, {timestamps : true})

const Order = mongoose.model("Order", orderSchema)

export default Order