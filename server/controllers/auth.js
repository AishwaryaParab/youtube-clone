import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createError } from "../errors.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash
        })

        await newUser.save()
        res.status(200).send("User has been created successfully!");
    } catch (err) {
        // handling express errors
        next(err)

        // creating custom errors
        // next(createError(500, "Cannot create a user!"))
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if(!user) {
            return next(createError(404, "User not found!"))
        }

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) {
            return next(createError(400, "Wrong Credentials!"))
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);

        // hiding the hashed password in the response
        const {password, ...others} = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)
        
    } catch (err) {
        // handling express errors
        next(err)

        // creating custom errors
        // next(createError(500, "Cannot create a user!"))
    }
}

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(user) {
            // LOGIN
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user._doc)
        } else {
            // REGISTER
            const newUser = new User({...req.body, fromGoogle: true})
            await newUser.save()
            
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY);
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(newUser._doc)
        }
    } catch(err) {
        next(err);
    }
}