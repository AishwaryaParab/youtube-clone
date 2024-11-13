import { createError } from "../errors.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import Video from "../models/Video.js";

export const updateUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })           

            res.status(200).json(updatedUser)
        } catch(err) {
            next(err)
        }
    } else {
        return next(createError(403, "You can only update your account!"))
    }
}

export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.")
        } catch(err) {
            next(err)
        }       
    } else {
        return next(createError(403, "You can only delete your account!"))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        next(createError(404, "User not found!"))
    }
    
}

export const subscribe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedUsers = user.subscribedUsers;

        const subscribedChannel = subscribedUsers.find((userId) => {
            return userId === req.params.id;
        })

        if(!subscribedChannel) {
            await User.findByIdAndUpdate(req.params.id, {
                $inc: {subscribers: 1}
            })
    
            await User.findByIdAndUpdate(req.user.id, {
                $addToSet: {subscribedUsers: req.params.id},
            })
        }

        res.status(200).json({
            "message": "Subscription Successful!"
        })
    } catch(err) {
        next(err);
    }
}

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {subscribedUsers: req.params.id}
        })

        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        })

        res.status(200).json({
            "message": "Unsubscription Successful!"
        })
    } catch(err) {
        next(err);
    }
}

export const like = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.videoId, {
            $addToSet: {likes: req.user.id},
            $pull: {dislikes: req.user.id}
        })
        res.status(200).json("Liked the video!");
    } catch(err) {
        next(err);
    }
}

export const dislike = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.videoId, {
            $addToSet: {dislikes: req.user.id},
            $pull: {likes: req.user.id}
        })
        res.status(200).json("Disliked the video!");
    } catch(err) {
        next(err);
    }
}