const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/students_crud").then(() => {
    console.log("MongoDB connection established");
}).catch(() => {
    console.log("Something went wrong");
})