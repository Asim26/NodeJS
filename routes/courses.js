const { courses } = require('../utils')
const express = require('express')
const router = express.Router();
const Joi = require("joi")

const coursesQueries = require('../queries/courses')

router.get('/', async(req, rsp) => {
    let allCourses = await coursesQueries.getCourses()
    rsp.send(allCourses)
});

router.get('/:id', (req, rsp) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return rsp.status(404).send('The course with given ID was not found')
    rsp.send(course)
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
    
        coursesQueries.createCourse(course);
    
        courses.push(course);
        res.send(course);
    }
});

router.put('/:id', (req, res) => {
    //Look up the course
    //If not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return rsp.status(404).send('The course with given ID was not found')

    //Validate
    //If not valid, return 400 - Bad request
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //Update course
    //Return the updated course
    course.name = req.body.name;
    res.send(course)
})

router.delete('/:id', (req, rsp) => {
    //Look up the course
    //If not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return rsp.status(404).send('The course with given ID was not found')

    //Delete 
    const index = courses.indexOf(course);
    courses.splice(index, 1)

    //Return the same course
    rsp.send(course)
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