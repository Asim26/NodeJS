const express = require('express');
const router = express.Router();
const Joi = require("joi")
const { User } = require('../model/users');
const bcrypt = require('bcrypt');

router.post('/', async (req, rsp) => {
    const { error } = validate(req.body);
    if (error) {
        let errMsg = [];

        error?.details.map((err) => {
            errMsg.push(err?.message)
        })
        return rsp.status(400).send(errMsg);

    } else {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return rsp.status(400).send('Invalid email or password.')

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return rsp.status(400).send('Invalid email or password.')

        const token = user.generateAuthToken();
        rsp.send(token)
    }
})

const validate = (req) => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(50).required(),
    }
    return Joi.validate(req, schema);
}

module.exports = router;