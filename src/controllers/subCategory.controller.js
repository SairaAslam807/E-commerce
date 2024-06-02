import subCategory from "../models/sub-category.model.js";


// Admin Can Only

// create Sub-Category 
const createSubCategory = async (req, res) =>{
    try {

        const{categoryId, subCategoryName} = req.body;

        const newSubCategory = await subCategory.create({
            categoryId, 
            subCategoryName
        })


        if(!newSubCategory){
            return res.status(404).json({
                error : "Sub-Category is not created"
            })
        }

        const create = await subCategory.findById(newSubCategory._id).populate('categoryId')

        return res.status(200).json({
            status : "Success",
            message : "Sub-Category is created",
            create
        })

    } catch (error) {
        console.log("Error in creating Sub-category", error)
    }
}

// read Sub-Category
const readSubCategory = async (req, res) =>{
    try {
        
        const read = await subCategory.find().populate("categoryId")

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
        console.log("Error in read Sub-category controller", error)
    }
}

// read One Sub-Category
const readOneSubCategory = async (req, res) =>{
    try {
        
        const read = await subCategory.findById(req.params.id).populate("categoryId")

        if(!read){
            return res.status(404).json({
                error : "Error"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Your Sub-category Data is here",
            read
        })

    } catch (error) {
        console.log("Error in read One Sub-category controller", error)
    }
}

// update Sub-category
const updateSubCategory = async (req, res) =>{
    try {

        // const{subCategoryName} = req.body;
        
        const update = await subCategory.findByIdAndUpdate(req.params.id,
            {$set : req.body},
            {new : true})

        if(!update){
            return res.status(404).json({
                error : "Error"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Sub-Category Successfully Updated",
            update
        })

    } catch (error) {
        console.log("Error in updated sub-category controller", error)
    }
}

// delete Sub-category
const deleteSubCategory = async (req, res) =>{
    try {

        const deleted = await subCategory.findByIdAndDelete(req.params.id)
        
        if(!deleted){
            return res.status(404).json({
                error : "Error"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Sub-Category Successfully deleted",
            deleted
        })

    } catch (error) {
        console.log("Error in deleting sub-category controller", error)
    }
}



export{createSubCategory, readSubCategory, readOneSubCategory, updateSubCategory, deleteSubCategory}
