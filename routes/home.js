const express = require('express');
const { courses } = require('../utils');
const router = express.Router();

router.get('/', (req, rsp) => {
    rsp.render('index', {
        title: 'My Express App',
        message: 'List of Courses',
        courses: courses
    })
});

module.exports = router;