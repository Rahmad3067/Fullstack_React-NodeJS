const Article = require("../models/articleModel.js");
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");




// Add new article 
const addArticle = async (req, res) => {
    //const userID = req.cookies.jwtData.id
    const { categoryID, userID, title, text } = req.body;
    console.log(req.body);
    try {
        await Article.create({ categoryID, userID, title, text });
        res.status(201).json({
            message: 'New article created',
        });
    } catch (err) {
        return res.status(400).json({
            message: 'couldnt add new article',
            error: err
        });
    }
};



// editing article 
const changearticleInfo = async (req, res) => {
    const articleTitle = req.params.title;
    const { categoryID, userID, title, text, date } = req.body;
    try {

        await Article.findOneAndUpdate(articleTitle, { categoryID, userID, title, text, date }).populate("userID");
        res.json({
            message: "Article updated"
        });
    }
    catch (err) {
        return res.status(400).json({
            message: " Article created",
        });
    }
};


// Getting an article with its title
const getOnearticle = async (req, res) => {
    const articleTitle = req.params;
    try {
        const onlyArticle = await Article.findOne(articleTitle).populate("userID");
        res.status(201).json({
            message: "Article that you are clicked",
            data: onlyArticle

        });
    } catch (err) {
        return res.status(400).json({
            message: "Article that you are searching for doesnt exist"
        });
    }
};


// Getting articles by id
const articleID = async (req, res) => {
    const articlByeId = req.params.id;
    try {
        const onlyId = await Article.findById(articlByeId);
        res.status(201).json({
            message: "Article that you are searching by it's ID",
            data: onlyId
        });
    } catch (err) {
        return res.status(400).json({
            message: "Id doesn't exist"
        });
    }
};


// Getting list of all of the Articles
const lastArticles = async (req, res) => {
    try {
        const getAllArticle = await Article.find();

        const lastArticles = getAllArticle.sort(function (a, b) { return a.createdAt - b.createdAt; }).slice(0, 4);
        res.status(201).json({
            message: "List of last articles",
            data: lastArticles
        });


    } catch (err) {
        res.status(400).json({
            message: "Couldnt find last articles"
        });
    }
};

// Deleting an article
const deleteArticle = async (req, res) => {
    const title = req.body.title;
    try {
        await Article.deleteOne({ title: title });
        res.status(201).json({
            message: "Your article deleted",
        });
    } catch (err) {
        res.status(400).json({
            message: "Unable to delete you article"
        });
    }
};

// Getting all the Articles 

const AllArticles = async (req, res) => {
    try {
        const ArticleList = await Article.find();
        res.status(201).json({
            message: "List of your Articles",
            data: ArticleList,
        });
    } catch (err) {
        res.status(400).json({
            message: "We couldn't find the articles you want",
        });
    }
};


const OneCategoryArticle = async (req, res) => {
    const categoryID = req.params;
    try {
        const ArticleCatId = await Article.find(categoryID);
        res.status(201).json({
            message: "Your articles byt Categiry id",
            data: ArticleCatId
        });
    } catch (err) {
        return res.status(400).json({
            message: "Couldn's find you Articles with your categoryId"
        });
    }
};





module.exports = {
    addArticle,
    changearticleInfo,
    getOnearticle,
    lastArticles,
    articleID,
    deleteArticle,
    AllArticles,
    OneCategoryArticle
};