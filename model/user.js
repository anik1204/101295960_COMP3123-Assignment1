const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, maxLength: 100},
    email: { type: String, required: true, unique: true, maxLength: 50},
    password: { type: String, required: true, maxLength: 50 }
},
{collection: 'Users'});

const model = mongoose.model('userSchema', userSchema);
module.exports = model;