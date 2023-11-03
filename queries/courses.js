const mongoose = require('../db_connection')
const coursesSchema = require('../schema/courses')

const Course = mongoose.model('Course', coursesSchema.createCourseSchema);    

const createCourse = async(payload) => {
    const course = new Course(payload);
    const result = await course.save();
    console.log('Course Saved ==>',result)
}

const getCourses = async() => {
    const courses = await Course.find();
    console.log('Get courses ===>',courses)
    return courses;
}

module.exports = {
    createCourse,
    getCourses,
};