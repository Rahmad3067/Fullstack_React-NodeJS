const SubArticle = require("../models/subArticleModel.js");
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

// POST a subarticle

const addSubArticle = async (req, res) => {
    const { articleID, title, text } = req.body;
    try {
        //const data = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        //req.cookies.jwtData = data;

        await SubArticle.create({ articleID: articleID, title: title, text: text });
        res.status(201).json({
            message: 'New subArticle created',
        });
    } catch (err) {
        return res.status(400).json({
            message: 'couldnt add new subArticle',
        });
    }
};

// take one articles
const getSubArticle = async (req, res) => {
    const getArticle = req.params;
    try {
        console.log("getArticle :", getArticle);
        const findArticle = await SubArticle.findOne({ title: getArticle });
        console.log("findArticle :", findArticle);
        res.status(201).json({
            message: "you get your article",
            data: findArticle
        });
    } catch (err) {
        return res.status(400).json({
            message: "you can't get article"
        });

    }
};

// Delete an  subarticle
const deleteSubArticle = async (req, res) => {
    const deleteArticle = req.params;

    try {
        const deleteOneAticle = await SubArticle.deleteOne(deleteArticle);
        res.status(201).json({
            message: "you delete subarticle !",
        });
    } catch (err) {
        res.status(400).json({
            message: "you couldn't delete subarticle",
        });
    }
};

//Modify an subarticle
const modifyASubArticle = async (req, res) => {
    const modifyArticle = req.params.
        id;
    const { articleID, title, text } = req.body;
    try {
        await SubArticle.findOneAndUpdate(modifyArticle, { articleID, title, text });
        res.status(201).json({
            message: "you modify subarticle !!",
        });
    } catch (err) {
        return res.status(400).json({
            message: "you can't modify subarticle",
        });
    }
};



const subArticleTitles = async (req, res) => {
    try {
        const titleSubarticle = await SubArticle.find();
        res.status(201).json({
            message: "Your subArticle titles",
            data: titleSubarticle
        });
    } catch (err) {
        return res.status(400).json({
            message: "Unable to find"
        });
    }
};

// getting subarticles with its articles id
// const articleSubarticle = async (req, res) => {
//     const articleid = req.params.articleID;
//     try {
//         const subAr = await SubArticle.find({ articleid });
//         res.status(201).json({
//             message: "You sub articles by their article id",
//             data: subAr
//         });
//     } catch (err) {
//         return res.status(400).json({
//             message: "Sorry we couldn't find the sub articles you are looking for"
//         });
//     }
// };



// const subArticleTitles = async ( req, res ) => {
//     try {
//         titleSubarticle = await SubArticle.find();
//         res.status(201).json({
//             message:"Your subArticle titles",
//             data: titleSubarticle
//         })
//     } catch (err) {
//         return res.status(400).json({
//             message:"Unable to find"
//         })
//     }
// }


// getting subarticles with its articles id

const articleSubarticle = async (req,res)=> {
    const articleid = req.params.articleID
    try{
        const subAr = await SubArticle.findOne({articleid})
        res.status(201).json({
            message:"You sub articles by their article id",
            data: subAr
        })
    } catch(err) {
        return res.status(400).json({
            message:"Sorry we couldn't find the sub articles you are looking for"
        })
    }
}




module.exports = {
    addSubArticle,
    getSubArticle,
    deleteSubArticle,
    modifyASubArticle,
    subArticleTitles,
    articleSubarticle
};
