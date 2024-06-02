import mongoose from "mongoose";
import Cart from "../models/cart.model.js";

// add to Cart Item  || User can
const addToCart = async (req, res) =>{
    try {
        const {userId, productId, quantity} = req.body;

        const addCart = await Cart.create({
        userId, 
        productId, 
        quantity
            
        })

        if(!addCart){
            return res.status(200).json({
                error : "Error in add To Cart Items"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Items Add into Cart",
            addCart
        })

    } catch (error) {
        console.log("Error in Add to Cart Controllers", error)
    }
}


// get Cart Items  || Admin & User Can View
const getCartItems = async (req, res) =>{
    try {
        
        const getItems = await Cart.find().populate('userId').populate('productId')
        console.log(typeof getItems)

        if(!getItems){
            return res.status(200).json({
                error : "Error in getting Cart Items"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Cart Items listed here",
            getItems
        })

    } catch (error) {
        console.log("Error in Getting items from Cart Controllers", error)
    }
}

// update Cart Items Quantity || Only User can 
const updateCartItemsQuantity = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user contains the authenticated user's information
        const { productId, quantity } = req.body; // Expecting productId and quantity in the request body

        if (!productId || quantity == null) {
            return res.status(400).json({ error: "Product ID and quantity are required" });
        }

        const cart = await Cart.findOne({ userId });
        console.log(cart.items)

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        // console.log(typeof cart)

        // const array = Object.entries(cart)

        // console.log(array)

        // Ensure items array exists and is an array
        if (!Array.isArray(cart.items)) {
            return res.status(404).json({ error: "Cart items not found" });
        }

        const itemIndex = cart.items.findIndex(item => 
            item.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ error: "Product not found in cart" });
        }

        cart.items[itemIndex].quantity = quantity;

        await cart.save();

        return res.status(200).json({
            status: "Success",
            message: "Cart item quantity updated",
            cart
        });

    } catch (error) {
        console.log("Error in Updating Cart Items Quantity", error);
        return res.status(500).json({ error: "Server error" });
    }
};

//  delete Cart  Items  || Only User can 
const deleteCartItems = async (req, res) =>{
    try {
        const deletedCartItems = await Cart.findByIdAndDelete(req.params._id, req.body).populate(userId, productId)

        if(!deletedCartItems){
            return res.status(404).json({
                error : "Error in Deleting Cart Items"
            })
        }

        return res.status(404).json({
            status : "Success",
            message : "Cart Items deleted",
            deletedCartItems
        })
    } catch (error) {
        console.log("Error in deleting Cart Items", error)
    }
}

export{addToCart, getCartItems, updateCartItemsQuantity, deleteCartItems}