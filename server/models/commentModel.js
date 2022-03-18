const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
    articleID: { type: mongoose.Types.ObjectId, ref: "article" },
    author: String,
    text: String,
    isValid: { type: Boolean, default: false },
}
    , {
        timestamps: true,
    });


const Comment = mongoose.model("Comment", CommentSchema);





module.exports = Comment;