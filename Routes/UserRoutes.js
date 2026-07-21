const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/UserModels");

const router = express.Router();

const isValidObject = (id) => mongoose.Types.ObjectId.isValid(id);

router.post("/create", async (req, res) => {
    try {
        console.log("req.body =", req.body);

        const { name, email, password, mobile } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            mobile,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating the user",
            error: error.message,
        });
    }
});




router.get("/all", async (req, res) => {

    try {

        res.render("homepage", {
            users
        });

        return res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            count: users.length,
            data: users,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error fetching the user information",
            error: error.message,
        });

    }

});

router.get("/byMail", async(req,res) => {
    try{
        console.log(req.body);
        const {email} = req.body;

        if(!email){
            return res.status(400).json({
                success : false,
                message : "Please enter the email to search"
            });
        }
        
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success : false,
                message : "Specified User Not found"
            });
        }

        console.log(`User Name : ${user.name}\nUser Email : ${user.email}\nUser ID : ${user.id}`);

        return res.status(200).json({
            success : true,
            message : "Successfully found the specified user",
            data : user,
            id: user.id
        });
        

    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Error fetching Users",
            error : error.message
        });
    }
})






module.exports = router;