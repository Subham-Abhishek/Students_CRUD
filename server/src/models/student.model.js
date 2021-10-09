const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: false,
        enum: ['male', 'female'],
        default: 'male'
    },
    city:{
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('student', studentSchema)