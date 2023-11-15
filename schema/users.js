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
    }
});

module.exports = {
    createUserSchema,
};