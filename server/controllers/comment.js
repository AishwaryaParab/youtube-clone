import { createError } from "../errors.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
    try {
        const newComment = await Comment({...req.body, userId: req.user.id});
        await newComment.save();
        res.status(200).json(newComment);
    } catch(err) {
        next(err)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        // delete your comment | user deletes comment on his/her video
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(comment.videoId);
        if(req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment deleted successfully!");
        } else {
            return next(createError(403, "You can only delete your comment."))
        }
    } catch(err) {
        next(err)
    }
}

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({videoId: req.params.videoId});
        res.status(200).json(comments);
    } catch(err) {
        next(err)
    }
}