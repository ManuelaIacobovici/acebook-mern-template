const mongoose = require("mongoose");
//const { ObjectId } = require ("mongoose")

const PostSchema = new mongoose.Schema({
  message: String, 
  authorUserID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: []
  }],
  }, {
    timestamps: true
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
