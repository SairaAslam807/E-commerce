import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },

    subCategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subCategory",
        required : true
    },

    productTitle : {
        type : String,
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

    thumbnail : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    }

}, {timestamps : true})

const Product = mongoose.model("Product", productSchema)

export default Product 