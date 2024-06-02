import mongoose from "mongoose";
import generateTokenAndSetCookie from "../Utils/generateTokenAndSetCookie.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";



// Admin Can Only


const registerUser = async (req, res) =>{
    try {
        const {name, email, password, role} = req.body;

        // Hashed Password Here
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const register = await User.create({
            name, 
            email, 
            password : hashedPassword,
            role
        })
        
        if(!register){
            return res.status(400).json({
                error : "ERROR in register User"
            })
        }

        const token = generateTokenAndSetCookie(register._id, role, res);

        return res.status(200).json({
            status : "Success",
            message : "User registered",
            register,
            token
        })
    } catch (error) {
        console.log("Error in Register User", error)
    }
}

// Login User
const loginUser = async (req, res) =>{
    try {
        const {email, password, role} = req.body;

        const currentUser = await User.findOne({email : email})

        const isPasswordCorrect = await bcrypt.compare(password, currentUser.password || "");

        if(!currentUser || !isPasswordCorrect){
            return res.status(400).json({
                error : "Invalid Username or Password"
            })
        }

        
        const token = generateTokenAndSetCookie(currentUser._id, role, res);

        return res.status(200).json({
            status : "Success",
            message : "User Logged In",
            currentUser,
            token
        })
    } catch (error) {
        console.log("Error in Login User", error)
    }
}

// get Users
const getUsers = async (req, res) =>{
    try {
        const users = await User.find()

        if(!users){
            return res.status(404).json({
                error : "Error in get All users"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Users here",
            users
        })

        
    } catch (error) {
        console.log("Error in get All Users", error)
    }
}


// get One User
const getOneUser = async (req, res) =>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        console.log(userId)
        console.log(user)

        if(!user){
            return res.status(404).json({
                error : "Error in get User"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "User details are",
            user
        })

        
    } catch (error) {
        console.log("Error in get User", error)
    }
}

// delete User
const deleteUser = async (req, res) =>{
    try {
        const deletedUser = await User.findByIdAndDelete(req.pararms._id)

        if(!deletedUser){
            return res.status(404).json({
                error : "Error in deleted User"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "User delete",
            deletedUser
        })

        
    } catch (error) {
        console.log("Error in deleting User", error)
    }
}

// update User
const updateUser = async (req, res) =>{
    try {

        if(req.body.password){

            // Hashed Password Here
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword;

        }
        
        const update = await User.findByIdAndUpdate(req.params.id, req.body, {new :true})

        if(!update){
            return res.status(404).json({
                error : "Error in update User"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "User updated",
            update
        })

    } catch (error) {
        console.log("Error in updating User controller", error)
    }
}

export{registerUser, loginUser, getOneUser, getUsers, deleteUser, updateUser}