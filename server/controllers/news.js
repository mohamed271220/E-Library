const User = require("../models/user");
const Post = require("../models/post")
const Event = require("../models/event")

exports.getPosts = async (req, res, next) => {
    const { tag, search, limit } = req.query;
    try {
        let query = {};
        if (tag) {
            query.tag = tag;
        }
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        let posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .limit(limit ? parseInt(limit) : undefined);
        res.status(200).json({ posts });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getPost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        let post = await Post.findById(postId);
        res.status(200).json({ post });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getEvents = async (req, res, next) => {
    try {
        let events = await Event.find();
        res.status(200).json({ events });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
