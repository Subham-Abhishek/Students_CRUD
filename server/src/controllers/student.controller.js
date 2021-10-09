const express = require("express");
const router = express.Router();

const Student = require("../models/student.model");

router.get("", async (req, res) => {
  try {
    let name = req.query.name || { $exists: true };
    let age = req.query.age || { $exists: true };
    let city = req.query.city || { $exists: true };
    let gender = req.query.gender || { $exists: true };
    let page = +req.query.page || 1;
    let limit = +req.query.limit || "";
    let skip = (page - 1) * limit;

    const students = await Student.find({
      name: name,
      age: age,
      city: city,
      gender: gender,
    })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
    res.status(200).send(students);
  } catch (err) {
    console.log(err);
    res.send(400).send(err);
  }
});

router.post("", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    console.log(student);
    res.status(201).send(student);
  } catch (err) {
    console.log(err);
    res.send(400).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    console.log(student);
    res.status(201).send(student);
  } catch (err) {
    console.log(err);
    res.send(400).send(err);
  }
})

router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(student);
    res.status(201).send(student);
  } catch (err) {
    console.log(err);
    res.send(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
    console.log(student);
    res.status(201).send(student);
  } catch (err) {
    console.log(err);
    res.send(400).send(err);
  }
});

module.exports = router;
