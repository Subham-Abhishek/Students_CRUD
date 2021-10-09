const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
require("./db/conn")

const cors = require('cors');

app.use(cors());
app.use(express.json());

const studentController = require('./controllers/student.controller')

app.use('/students', studentController);


app.listen(port, () => {
    console.log(`Connection is live at port: ${port}`);
});