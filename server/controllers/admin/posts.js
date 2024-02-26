const User = require('../../models/user');
const Post = require('../../models/post');

const { validationResult } = require('express-validator');

exports.addPost = async (req, res, next) => {
    try {
        if (req.userId) {
            // console.log(req.user);
            const user = await User.findById(req.userId).select("-password");

            if (!user) {
                const error = new Error("User not found");
                error.statusCode = 404;
                next(error);
            }
            if (user.role === "user") {
                const error = new Error("You are not authorized to post");
                error.statusCode = 404;
                next(error);
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const postedBy = user.username;

            const { title, author, image, tag, body } = req.body;

            const post = new Post({
                title,
                author,
                image,
                tag,
                body: JSON.parse(body),
                postedBy
            });
            await post.save();
            res.status(201).json({ message: "Post created successfully", post });

        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.editPost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const fieldsToUpdate = ['title', 'author', 'image', 'tag', 'body'];
        fieldsToUpdate.forEach(field => {
            if (req.body[field]) {
                if (field === 'body') {
                    post[field] = JSON.parse(req.body[field]);
                } else {
                    post[field] = req.body[field];
                }
            }
        });

        await post.save();
        res.status(200).json({ message: "Post edited successfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        await post.remove();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}