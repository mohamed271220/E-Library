const User = require("../models/user");
const Post = require("../models/post")

exports.getPosts = async (req, res, next) => {
    const { search, limit = 10, page = 1 } = req.query;
    try {
        let query = {};
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        let posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        let count = await Post.countDocuments(query);
        res.status(200).json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
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

