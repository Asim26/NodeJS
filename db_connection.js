const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/testDb')
.then((rsp) => {
    console.log('Connection Rsp ==>',)
}).catch((err) => {
    console.log('Connection err ==>', err)
})

module.exports = mongoose;