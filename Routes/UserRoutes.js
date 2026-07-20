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

module.exports = router;