import Video from "../models/Video.js";
import { createError } from "../errors.js"
import User from "../models/User.js";
import mongoose from "mongoose";

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({userId: req.user.id, ...req.body});

    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch(err) {
        next(err);
    }

}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404, "Video not found!"));

        if(video.userId === req.user.id) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })

            res.status(200).json(updatedVideo);
        } else {
            return next(createError(403, "You can only update your video."))
        }
    } catch(err) {
        next(err)
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = new Video.findById(req.params.id);

        if(!video) return next(createError(404, "Video not found!"));

        if(video.userId === req.user.id) {
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("Video has been deleted successfully!");
        } else {
            return next(createError(403, "You can only delete your video."))
        }
    } catch(err) {
        next(err)
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch(err) {
        next(err)
    }
}

export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        })

        res.status(200).json({
            message: "The view has been increased."
        })
    } catch(err) {
        next(err)
    }
}

export const random = async (req, res, next) => {
    try {
        // we could use Video.find() but that would sort our videos
        const videos = await Video.aggregate([{$sample: {size: 40}}])
        res.status(200).json(videos);
    } catch(err) {
        next(err)
    }
}

export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({views: -1})
        res.status(200).json(videos);
    } catch(err) {
        next(err)
    }
}

export const sub = async (req, res, next) => {  
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers;

        // returning a list after performing asynchronous operation on each item
        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.findOne({ userId: channelId });
            })
        );

        // sort videos to view the latest videos first
        res.status(200).json(list.sort((a, b) => b.createdAt - a.createdAt))
    } catch(err) {
        next(err)
    }
}

export const getByTags = async (req, res, next) => {
    const tags = req.query.tags.split(",");

    try {
        // filtering videos if the tags contain any of the tags mentioned in the array
        const videos = await Video.find({tags: {$in: tags}}).limit(20);
        res.status(200).json(videos);
    } catch(err) {
        next(err)
    }
}

export const search = async (req, res, next) => {
    const query = req.query.q;

    try {
        // $options: 'i' is for case sensitivity
        const videos = await Video.find({ title: {$regex: query, $options: "i"}}).limit(40);
        res.status(200).json(videos);
    } catch(err) {
        next(err);
    }
}

