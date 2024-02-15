const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: [
      {
        type: {
          type: String,
          enum: ["title", "paragraph", "image"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    image: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
    postedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("BlogPost", postSchema);
