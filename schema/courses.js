const mongoose = require('../db_connection')

const createCourseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

module.exports.createCourseSchema = createCourseSchema;