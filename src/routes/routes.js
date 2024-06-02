import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {createCategory, readCategory, readOneCategory, updateCategory, deleteCategory} from "../controllers/category.controller.js";

import {createSubCategory, readSubCategory, readOneSubCategory, updateSubCategory, deleteSubCategory} from "../controllers/subCategory.controller.js";

import {createProduct, readProducts, readOneProduct, updateProduct, deleteProduct} from "../controllers/product.controller.js";

import {addToCart, getCartItems, updateCartItemsQuantity, deleteCartItems} from "../controllers/cart.controller.js"


import {registerUser, loginUser, getOneUser, getUsers, deleteUser, updateUser} from "../controllers/users.controllers.js";

import {createOrder, readOrders, readOneOrder, updateOrder, deleteOrder, orderHistory} from "../controllers/order.controller.js"



const router = express.Router();

// User API 
router.post("/register", registerUser )
router.post("/login", loginUser)
router.get("/getUsers", getUsers)
router.get("/getOneUser/:id", getOneUser)
router.put("/updateUser/:id", updateUser)




// Category API
router.post("/create", authMiddleware.authenticate, authMiddleware.authorize(['admin']), createCategory)

router.get("/readCategory", authMiddleware.authenticate, authMiddleware.authorize(['admin']), readCategory)

router.get("/readOneCategory/:id", authMiddleware.authenticate, authMiddleware.authorize(['admin']), readOneCategory)

router.put("/updateCategory/:id", authMiddleware.authenticate, authMiddleware.authorize(['admin']), updateCategory)

router.delete("/deleteCategory/:id", authMiddleware.authenticate, authMiddleware.authorize(['admin']), deleteCategory)



// Sub-Category API
router.post("/createSubCategory", authMiddleware.authenticate, authMiddleware.authorize(['admin']), createSubCategory)

router.get("/readSubCategory", authMiddleware.authenticate, authMiddleware.authorize(['admin']), readSubCategory)


router.get("/readOneSubCategory/:id", authMiddleware.authenticate, authMiddleware.authorize(['admin']), readOneSubCategory)

router.put("/updateSubCategory/:id", authMiddleware.authenticate, authMiddleware.authorize(['admin']), updateSubCategory)




// Product API
router.post("/createProduct", authMiddleware.authenticate, authMiddleware.authorize(['admin']), createProduct)

router.get("/readProducts", authMiddleware.authenticate, authMiddleware.authorize(['admin']), readProducts)

router.get("/readOneProduct/:id", authMiddleware.authenticate, authMiddleware.authorize(['admin']), readOneProduct)

router.put("/updateProduct/:id", authMiddleware.authenticate, authMiddleware.authorize(['admin']), updateProduct)

router.delete("/deleteProduct/:id", authMiddleware.authenticate, authMiddleware.authorize(['admin']), deleteProduct)




// Cart API

router.post("/addToCart", authMiddleware.authenticate, authMiddleware.authorize(['user']), addToCart)

router.get("/getCartItems", authMiddleware.authenticate, authMiddleware.authorize(['user']), getCartItems)

router.put("/updateCartItemsQuantity", authMiddleware.authenticate, authMiddleware.authorize(['user']), updateCartItemsQuantity)



// Order API

router.post("/createOrder", authMiddleware.authenticate, authMiddleware.authorize(['user']), createOrder)

router.get("/readOrders", authMiddleware.authenticate, authMiddleware.authorize(['user', 'admin']), readOrders)

router.get("/orderHistory", authMiddleware.authenticate, authMiddleware.authorize(['user', 'admin']), orderHistory)






export default router;