const mongoose = require('../db_connection')
const coursesSchema = require('../schema/courses')

const createCourse = async(payload) => {
    const Course = mongoose.model('Course', coursesSchema.createCourseSchema);    
    const course = new Course(payload);
    const result = await course.save();
    console.log('Course Saved ==>',result)
}

module.exports.createCourse = createCourse;