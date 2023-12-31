const { User, validateUser, createUser, getUsers } = require('../model/users');
const express = require('express');
const router = express.Router();
const { hashedPassword } = require('../helpers');

const saltRounds = 10

router.get('/', async (req, rsp) => {
    let allUsers = await getUsers()
    rsp.send(allUsers)
})

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);

    if (error) {
        let errMsg = [];

        error?.details.map((err) => {
            errMsg.push(err?.message)
        })
        return res.status(400).send(errMsg);
    }
    else {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered')

        user = createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin,
        })

        let newUser = await user;
        let encryptedPassword = await hashedPassword(newUser.password, saltRounds)
        newUser.password = encryptedPassword;

        newUser = await newUser.save();

        const token = newUser.generateAuthToken();
        res.header('x-auth-token', token).send(newUser)
    }
});

module.exports = router;