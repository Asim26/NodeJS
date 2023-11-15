const bcrypt = require('bcrypt');

const hashedPassword = async(password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds)
}

module.exports = {
    hashedPassword
}