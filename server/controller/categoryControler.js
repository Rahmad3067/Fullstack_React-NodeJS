const Category = require("../models/categoryModel")
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

// Here we add a categry (only name)
const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        await Category.create({ name: name, picture: `/image/${name}.png` })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: "Couldnt add new Category"
        })
    } res.status(201).json({
        message: "Information added"
    })
}


// Here we add the category's picture 
const uploadImage = async (req, res) => {
    await fs.renameSync(req.file.path, path.join(req.file.destination, req.file.originalname));
    res.status(201).json({
        message: "Image added"
    })
}

// Here we get all the category name and picture 

const categoryList = async (req, res) => {
    try {
        const allCategory = await Category.find();
        res.status(201).json({
            message: "List of all the Categories",
            data: allCategory,
        })
    } catch (err) {
        return res.status(400).json({
            message: "An error happened"
        })
    }
}

const oneCategory = async (req,res) =>{
    const catID = req.params.id
    try{
        const Alonecategory = await Category.findById(catID)
        res.status(201).json({
            message:'One Category',
            data: Alonecategory
        })
    } catch(err) {
        return res.status(400).json({
            message:"We couldn't find your category",
        })
    }
}






module.exports = {
    addCategory,
    uploadImage,
    categoryList,
    oneCategory
}