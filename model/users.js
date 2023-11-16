const mongoose = require('../db_connection')
const {createUserSchema} = require('../schema/users')
const Joi = require("joi")

const User = mongoose.model('User', createUserSchema);

const createUser = async(payload) => {
    let user = new User(payload)
    let newUser = await user.save()
    return newUser;
}

const getUsers = async() => {
    const allUsers = await User.find();
    console.log('Get allUsers ===>', allUsers)
    return allUsers;
}

const validateUser = (user) =>{
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    }
    return Joi.validate (user, schema);
}

module.exports = {
    User,
    createUser,
    validateUser,
    getUsers,
};