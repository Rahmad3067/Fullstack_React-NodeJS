const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = Schema({
    name: String,
    lastName: String,
    email: { type:String, unique:true },
    password: String,
    isAdmin: Boolean,
});


const User = mongoose.model('User', UserSchema);
module.exports = User;