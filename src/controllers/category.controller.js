import Category from "../models/category.model.js";

// Admin Can Only

// create Category
const createCategory = async (req, res) =>{
    try {
        const { categoryName } = req.body;
        
        const create = await Category.create({
            categoryName
        })

        if(!create){
            return res.status(404).json({
                error : "Category is not created"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Category is created",
            categoryName
        })

    } 
    catch (error) {
        console.log("Error in creating category", error)
    }
}

// read Category
const readCategory = async (req, res) =>{
    try {
        
        const read = await Category.find()

        if(!read){
            return res.status(404).json({
                error : "Error"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "All categories here",
            read
        })

    } catch (error) {
        console.log("Error in read category controller", error)
    }
}

// read One Category
const readOneCategory = async (req, res) =>{
    try {
        
        const read = await Category.findById(req.params.id)

        if(!read){
            return res.status(404).json({
                error : "Error"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Reading One category is here",
            read
        })

    } catch (error) {
        console.log("Error in read category controller", error)
    }
}

// update Category
const updateCategory = async (req, res) =>{
    try {

        const{categoryName} = req.body;
        
        const update = await Category.findByIdAndUpdate(req.params.id, 
            {$set : req.body},
            {new : true})
        console.log(update)

        if(!update){
            return res.status(404).json({
                error : "Error"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Category Successfully Updated",
            update
        })

    } catch (error) {
        console.log("Error in updated category controller", error)
    }
}

// delete A category
const deleteCategory = async (req, res) =>{
    try {

        const deleted = await Category.findByIdAndDelete(req.params.id)
        
        if(!deleted){
            return res.status(404).json({
                error : "Error"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Category Successfully deleted",
            deleted
        })

    } catch (error) {
        console.log("Error in deleting category controller", error)
    }
}
export {createCategory, readCategory, readOneCategory, updateCategory, deleteCategory}