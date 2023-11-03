//Import
const coursesQueries = require('./queries/courses')
coursesQueries.deleteCourse(`6544ddb76f33217f677e01f5`)

const courses = require('./routes/courses')
const home = require('./routes/home')

const express = require("express");

//Create app instance using express
const app = express();

//For SSR views
app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json());

app.use('/api/courses', courses);
app.use('/', home);

const port = process.env.PORT || 3000;

//Listen server
app.listen(port, () => console.log("server started at " + port))