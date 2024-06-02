import Product from "../models/product.model.js";


// Admin Can Only 

// create Product
const createProduct = async (req, res) => {
    try {

        const { categoryId, subCategoryId, productTitle, salePrice, discount, thumbnail, description } = req.body;

        const create = await Product.create({
            categoryId,
            subCategoryId,
            productTitle,
            salePrice,
            discount,
            thumbnail,
            description

        })

        if (!create) {
            return res.status(404).json({
                error: "Product is not created"
            })
        }

        return res.status(200).json({
            status: "Success",
            message: "Product is created",
            create
        })

    } catch (error) {
        console.log("Error in creating Product", error)
    }
}


// read Products
const readProducts = async (req, res) => {
    try {

        const read = await Product.find().populate('categoryId').populate('subCategoryId')

        if (!read) {
            return res.status(404).json({
                error: "Error"
            })
        }

        return res.status(200).json({
            status: "Success",
            message: "All Products here",
            read
        })

    } catch (error) {
        console.log("Error in read Product controller", error)
    }
}


// read One Product
const readOneProduct = async (req, res) => {
    try {

        const read = await Product.findById(req.params.id).populate('categoryId').populate('subCategoryId')

        if (!read) {
            return res.status(404).json({
                error: "Error"
            })
        }

        return res.status(200).json({
            status: "Success",
            message: "One Product Info is here",
            read
        })

    } catch (error) {
        console.log("Error in read Product controller", error)
    }
}

// update Product
const updateProduct = async (req, res) => {
    try {

        const update = await Product.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }).populate('categoryId').populate('subCategoryId')

        if (!update) {
            return res.status(404).json({
                error: "Error"
            })
        }

        return res.status(200).json({
            status: "Success",
            message: "Product Updated Successfully",
            update
        })

    } catch (error) {
        console.log("Error in update Product controller", error)
    }
}

// delete Product
const deleteProduct = async (req, res) => {
    try {

        const deleted = await Product.findByIdAndDelete(req.params.id).populate('categoryId').populate('subCategoryId')

        if (!deleted) {
            return res.status(404).json({
                error: "Error"
            })
        }

        return res.status(200).json({
            status: "Success",
            message: "Product Deleted successfully",
            deleted
        })

    } catch (error) {
        console.log("Error in delete Product controller", error)
    }
}
export { createProduct, readProducts, readOneProduct, updateProduct, deleteProduct }