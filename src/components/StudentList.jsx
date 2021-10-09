/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { FilterCard } from "./FilterCard";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";

export const StudentList = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [bool, setBool] = useState(false)

  const getStudent = () => {
    axios.get(`http://localhost:8000/students?limit=${limit}&page=${page}`).then(({ data }) => {
      setStudents(data);
    });
  };

  const totalStudentCount = () => {
    axios.get(`http://localhost:8000/students`).then(({ data }) => {
      setTotal(data.length);
    });
  }

  const addStudent = () => {
    const payload = {
      name,
      age,
      gender,
      city,
    };
    axios.post('http://localhost:8000/students', payload).then(({ data }) => {
      setStudents([...students, data]);
    });
    setName("");
    setAge("");
    setGender("");
    setCity("");
    setOpen(!open);
  };

  const sortByName = () => {
    students.sort((a, b) => {
      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
    });
    setStudents([...students]);
  };

  const sortByAge = () => {
    students.sort((a, b) => {
      return a.age > b.age ? 1 : -1;
    });
    setStudents([...students]);
  };

  const sortByCity = () => {
    students.sort((a, b) => {
      return a.city.toLowerCase() > b.city.toLowerCase() ? 1 : -1;
    });
    setStudents([...students]);
  };

  const handleDelete = async (id) => {
    setBool(!bool)
    await axios.delete(`http://localhost:8000/students/${id}`);
  }

  useEffect(() => {
    getStudent();
  }, [page, bool]);

  useEffect(() => {
    totalStudentCount()
  }, [])

  return (
    <>
      <Div>
        <Button
          className="drawer"
          variant="contained"
          style={{ marginLeft: filter ? "26.5%" : "0px", transition: "500ms" }}
          onClick={() => setOpen(!open)}
        >
          Add Student
        </Button>
        <div className="filtercard">
          <Button
            className="filters"
            style={{ marginRight: open ? "30%" : "0px", transition: "500ms" }}
            variant="contained"
            onClick={() => setFilter(!filter)}
          >
            Filters
          </Button>
        </div>
        <div
          style={{ transform: filter ? "translateX(0%)" : "translateX(-100%)" }}
          className="card"
        >
          <FilterCard setStudents={setStudents} />
        </div>
        <div className="left">
          <div className="sortbtns">
            <button onClick={() => sortByName()}>Sort by name</button>
            <button onClick={() => sortByAge()}>Sort by age</button>
            <button onClick={() => sortByCity()}>Sort by city</button>
          </div>
          <h1>Student List</h1>
          <div className="table">
            <div className="heading">
              <h4>Name</h4>
              <h4>Age</h4>
              <h4>Gender</h4>
              <h4>City</h4>
              <h4>Edit</h4>
              <h4>Delete</h4>
            </div>
            <div className="studentData">
              {students.map((student) => {
                return (
                  <div className="student" key={student._id}>
                    <p>{student.name}</p>
                    <p>{student.age}</p>
                    <p>{student.gender}</p>
                    <p>{student.city}</p>
                    <div>
                      <Link to={`/${student._id}`}><button>Edit</button></Link>
                    </div>
                    <div>
                      <button onClick={() => handleDelete(student._id)}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          style={{ transform: open ? "translateX(0%)" : "translateX(100%)" }}
          className="right"
        >
          <h1>Add Student</h1>
          <TextField
            className="inputs"
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className="inputs"
            id="outlined-basic"
            label="Age"
            variant="outlined"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            className="inputs"
            id="outlined-basic"
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" onClick={() => addStudent()}>
            Add
          </Button>
        </div>
      </Div>
      <Page>
          <Pagination
            className="page"
            color="primary"
            count={Math.ceil(total / limit)}
            onChange={(event, value) => setPage(value)}
          />
      </Page>
    </>
  );
};

const Div = styled.div`
  display: flex;
  .drawer {
    position: fixed;
    top: 10px;
    left: 10px;
  }
  .filtercard {
    .filters {
      position: fixed;
      top: 10px;
      right: 10px;
    }
    .card {
    }
  }
  .card {
    width: 24%;
    min-width: 350px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    left: 0;
    background-color: white;
    z-index: 20;
    transition: 500ms;
    box-shadow: 5px 5px 10px #000000c2;
  }
  .left {
    width: 100%;
    background-color: blanchedalmond;
    /* min-height: 130vh; */
    display: flex;
    flex-direction: column;
    align-items: center;
    .sortbtns {
      button {
        margin: 10px 5px;
        padding: 5px 10px;
      }
    }
    h1 {
      margin-top: 50px;
    }
    .table {
      width: 100%;
      .heading {
        width: 85%;
        display: flex;
        justify-content: space-around;
        border: 1px solid black;
        margin: 0 auto;
        background-color: black;
        color: white;
        margin-bottom: 5px;
        border-radius: 5px;
        h4 {
          text-align: center;
          width: 25%;
        }
      }
      .studentData {
        .student {
          width: 85.35%;
          display: flex;
          justify-content: space-around;
          margin: 0 auto;
          p {
            text-align: center;
            width: 25%;
            font-weight: 500;
            color: white;
          }
          div {
            width: 25%;
            font-weight: 500;
            display: grid;
            place-items: center;
            button {
              width: 80px;
              padding: 8px 0;
              font-weight: 500;
              font-size: 16px;
              border-radius: 5px;
              cursor: pointer;
              &:focus {
                border: none;
              }
            }
          }
          &:nth-child(odd) {
            background-color: #3d3d3d;
          }
          &:nth-child(even) {
            background-color: #292929;
          }
        }
      }
    }
  }
  .right {
    width: 24%;
    min-width: 350px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    right: 0;
    background-color: white;
    z-index: 20;
    transition: 500ms;
    box-shadow: -5px -5px 10px #000000c2;
    .inputs {
      margin: 4px;
      /* width: 300px; */
    }
    button {
      margin-top: 10px;
    }
  }
`;

const Page = styled.div`
  .page {
    padding: 10px 0;
    background-color: blanchedalmond;
    ul{
      display: flex;
      justify-content: center;
    }
  }
`;
