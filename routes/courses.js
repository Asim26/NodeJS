const { courses } = require('../utils')
const express = require('express')
const router = express.Router();
const Joi = require("joi")
const {
    getCourses,
    getCourse, 
    createCourse, 
    editCourse, 
    deleteCourse
} = require('../model/courses');
var validator = require('validator');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.get('/',auth , async(req, rsp) => {
    let allCourses = await getCourses()
    rsp.send(allCourses)
});

router.get('/:id', async(req, rsp) => {
    if (validator.isMongoId(req.params.id)){
        let course = await getCourse(req.params.id)
        
        if (!course) return rsp.status(404).send('The course with given ID was not found')
        rsp.send(course)
    }else{
        rsp.status(404).send('Invalid ID')
    }
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        let errMsg = [];

        error?.details.map((err) => {
            errMsg.push(err?.message)
        })
        return res.status(400).send(errMsg);
    }
    else{
        const course = {
            name: req.body.name,
            author: req.body.author,
            tags: req.body.tags,
            isPublished: req.body.isPublished
        };
    
        createCourse(course);
    
        courses.push(course);
        res.send(course);
    }
});

router.put('/:id', async(req, res) => {
    //Look up the course
    //If not exist, return 404

    if (validator.isMongoId(req.params.id)){
        let allCourses = await getCourses()
        const course = allCourses.find(c => parseInt(c._id) === parseInt(req.params.id))
        console.log('course =====>',course)
    
        if (!course) return rsp.status(404).send('The course with given ID was not found')
    
        //Validate
        //If not valid, return 400 - Bad request
        const { error } = validateCourse(req.body);
    
        if (error) {
            let errMsg = [];
    
            error?.details.map((err) => {
                errMsg.push(err?.message)
            })
            
            return res.status(400).send(errMsg)
        }
        else{
            //Update course
            //Return the updated course
            let updatedCourse = await editCourse(req.params.id,req.body)
            if(updatedCourse !== null){
                res.send(updatedCourse)
            }else{
                res.status(404).send("The given id doesn`t exist")
            }
        }
    }else{
        res.status(404).send('Invalid ID')
    }  
})

router.delete('/:id', [auth, admin] ,async(req, rsp) => {
    //Look up the course
    //If not exist, return 404

    if (validator.isMongoId(req.params.id)){
        let allCourses = await getCourses()
        const course = allCourses.find(c => parseInt(c._id) === parseInt(req.params.id))
    
        if (!course) return rsp.status(404).send('The course with given ID was not found')
    
        //Delete 
        let deletedCourse = await deleteCourse(req.params.id)
    
        //Return the same course
        rsp.send(deletedCourse)
    }else{
        rsp.status(404).send('Invalid ID')
    }
})


function validateCourse(course) {
    const schema = {
        name: Joi.string(),
        author: Joi.string(),
        isPublished: Joi.boolean(),
        tags: Joi.array(),
    }
    return Joi.validate(course, schema, { abortEarly: false })
}

module.exports = router;