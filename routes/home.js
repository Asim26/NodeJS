const express = require('express')
const router = express.Router();

router.get('/', (req, rsp) => {
    rsp.render('index', {title:'My Express App', message:'List of Courses'})
});

module.exports = router;