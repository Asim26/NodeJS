const {courses} = require('../utils')
const express = require('express')
const router = express.Router();
const Joi = require("joi")

router.get('/', (req, rsp) => {
    rsp.send(courses)
});

router.get('/:id', (req, rsp) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return rsp.status(404).send('The course with given ID was not found')
    rsp.send(course)
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
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
        name: Joi.string()
    }
    return Joi.validate(course, schema)
}

module.exports = router;