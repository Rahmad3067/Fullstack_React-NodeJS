const mongoose = require("mongoose");
const ArticleSchema = new mongoose.Schema({
    categoryID: { type: mongoose.Types.ObjectId, ref: "Category" },
    userID: { type: mongoose.Types.ObjectId, ref: "User" },
    title: String,

    text: String,
}
    , {
        timestamps: true,
    });



const Article = mongoose.model("Article", ArticleSchema);





module.exports = Article;