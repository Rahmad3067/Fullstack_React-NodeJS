const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Adding a new user
const passwordRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$/;
const addUser = async (req, res) => {
    const { name, lastName, email, password, isAdmin } = req.body;
    const resultPassword = passwordRegex.test(password);
    // Here we hash the password to secure it
    const hashedPassword = await bcrypt.hash(password, 12);
    if (resultPassword) {
        try {
            await User.create({ name: name, lastName: lastName, email: email, password: hashedPassword, isAdmin: isAdmin });
        } catch (err) {
            return res.status(400).json({
                message: "This user already exists",
            });
        }
    } else (res.status(400).json({
        message: "Email or password is not valid",
    }));
    res.status(201).json({
        message: `User created with email: ${email}`
    });
};

// Here we can delete a user or admin with our request
const deleteUser = async (req, res) => {
    const email = req.body.email;
    try {
        const removeUser = await User.deleteOne({ email: email });
        if (User) {
            res.status(201).json({
                message: "User deleted",
                data: removeUser
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: 'Can not delete user...'
        });
    }
};

// Getting user information with user email
const idUser = async(req,res) => {
    const email = req.params.email;
    try {
        const getID = await User.findOne({email});
        res.status(201).json({
            message: "ID of you User",
            data: getID
        })
    } catch(err) {
        res.status(400).json({
            message:"We couldn't find your user's ID"
        })
    }
}

// here we try to login with our email and passwrod 
const addlogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    try {
        const passwordValid = await bcrypt.compare(password, user.password);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log(token)
        if (passwordValid) {
            res.cookie("jwt", token, { httpOnly: true, secure: false });
            res.json({ 
                message: "user match",
                data: user});
        } else {
            res.json({
                message: "Password doesnt match..."
            });
        }
    } catch (err) {
        res.status(400).json({
            errorMesage: "search key not validate"
        });
    }
};

// Here we change users information
const changeUserInfo = async (req, res) => {
    const userEmail = req.params.email;
    // const { name, lastName, email, password, isAdmin } = req.params;
    const { name, lastName, email, password, isAdmin } = req.body;
    try {
        await User.findOneAndUpdate(userEmail, { name, lastName, email, password, isAdmin });
        res.json({
            message: "contact updated"
        });
    }
    catch (err) {
        return res.status(400).json({
            message: " user created",
        });
    }
};

// Logout the user 
const userLogout = async (req, res) => {
    res.clearCookie('jwt');
    res.json({
        messsage: 'you are disconnected ! :)',
    });
};



















// exporting

module.exports = {
    addUser,
    deleteUser,
    addlogin,
    changeUserInfo,
    userLogout,
    idUser
};
