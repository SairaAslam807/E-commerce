import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },

    subCategoryName : {
        type : String,
        required : true
    }
    
}, {timestamps : true})

const subCategory = mongoose.model("subCategory", subCategorySchema)

export default subCategory 