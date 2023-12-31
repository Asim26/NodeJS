const mongoose = require('../db_connection')
const {createCourseSchema} = require('../schema/courses')

const Course = mongoose.model('Course', createCourseSchema);

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
    return course?.length>0 ?course : false;
}

const editCourse = async(id, payload) => {
    const result = await Course.findByIdAndUpdate(id,{
        $set: payload
    },{new: true})
    console.log('Course Update ==>',result);
    return result;    
}

const deleteCourse = async(id) => {
    const course = await Course.findByIdAndDelete(id);
    console.log('Delete Course ==>', course);
    return course;
}

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    editCourse,
    deleteCourse
};