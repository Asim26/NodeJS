const {User, validateUser, createUser} = require('../model/users');
const {getUsers} = require('../model/users')
const express = require('express');
const router = express.Router();

router.get('/', async(req, rsp)=>{
    let allUsers = await getUsers()
    rsp.send(allUsers)
})

router.post('/', async(req, res) => {
    const { error } = validateUser(req.body);

    if (error) {
        let errMsg = [];

        error?.details.map((err) => {
            errMsg.push(err?.message)
        })
        return res.status(400).send(errMsg);
    }
    else{
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered')

        user = createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,            
        })

        let newUser = await user;
        res.send(newUser)
    }
});

module.exports = router;