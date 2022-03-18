const Comment = require("../models/commentModel.js");
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");


const createComment = async (req, res) => {
    const { articleID, author, text } = req.body
    try {
        const data = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        req.cookies.jwtData = data;

        await Comment.create({ articleID, author, text });
        res.status(201).json({
            message: "you create a comment :)",
        });
    } catch (err) {
        return res.status(400).json({
            message: "you can post your comment",
        });
    }
}



// Delete an comment 
const deleteComment = async (req, res) => {
    const delComment = req.params;
    try {
        const deleteOneComment = await Comment.deleteOne(delComment);
        res.status(201).json({
            message: "you delete comment with succes ;)",
        });
    } catch (err) {
        res.status(400).json({
            message: "i have problem for delete comment...",
        });
    }
}

// Modify an comment
const modifyComment = async (req, res) => {
    const modComment = res.params;
    const { articleID, author, text, isAdmin } = req.body;
    try {
        await Comment.findOneAndUpdate(modComment, { articleID, author, text, isAdmin });
        res.status(201).json({
            message: "you modify comment with success !",
        });
    } catch (err) {
        return res.status(400).json({
            message: "i have problem with delete commment !",
        });
    }
}

// get all comment of one artile
const getAllComment = async (req, res) => {
    const getComment = req.params.id;
    try {
        const findComment = await Comment.find({ articleID: getComment });
        res.status(201).json({
            message: "you get the comment with success",
            data: findComment,
        });
    } catch (err) {
        res.status(400).json({
            message: "i have a problem with your request..."
        });
    }
}


module.exports = {
    createComment,
    deleteComment,
    modifyComment,
    getAllComment,
};