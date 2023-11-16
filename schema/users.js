const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('../db_connection')

const createUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 150,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024,
        unique: true
    },
    isAdmin: Boolean
});
createUserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    console.log('JWT Token ==>',token)
    return token;
}

module.exports = {
    createUserSchema,
};