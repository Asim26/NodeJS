const mongoose = require('../db_connection')
const coursesSchema = require('../schema/courses')

const Course = mongoose.model('Course', coursesSchema.createCourseSchema);

const createCourse = async (payload) => {
    const course = new Course(payload);
    const result = await course.save();
    console.log('Course Saved ==>', result)
}

const getCourses = async () => {
    const courses = await Course.find();
    console.log('Get courses ===>', courses)
    return courses;
}

const getCourse = async (id) => {
    const course = await Course.find({
        _id: id,
    })
    console.log('Get course ===>', course)
    return course;
}

const editCourse = async(id, payload) => {
    const result = await Course.findByIdAndUpdate(id,{
        $set: payload
    })
    console.log('Course Update ==>',result);
    return result;    
}

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    editCourse
};