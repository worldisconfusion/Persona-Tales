const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// Authentication middleware
exports.auth = async (req, res, next) => {
    try {
        // Extract token from different sources
        const token = req.cookies.token 
                        || req.body.token 
                        || (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);

        // If token is missing, return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            });
        }

        // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            // Verification issue
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });
        }
        next();
    }
    catch (error) {  
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
}

// Admin middleware
exports.isAdmin = async (req, res, next) => {
    try {    
        console.log("Printing AccountType ", req.user.accountType);
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admin only',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        });
    }
}

// User middleware
exports.isUser = async (req, res, next) => {
    try {    
        console.log("Printing AccountType ", req.user.accountType);
        if (req.user.accountType !== "User") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Users only',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        });
    }
}

