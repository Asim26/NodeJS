//Import
const config = require('config');
const courses = require('./routes/courses')
const users = require('./routes/users')
const auth = require('./routes/auth')
const home = require('./routes/home')

const express = require("express");

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit()
}

//Create app instance using express
const app = express();

//For SSR views
app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json());

app.use('/api/courses', courses);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);

const port = process.env.PORT || 3000;

//Listen server
app.listen(port, () => console.log("server started at " + port))