import React, { useState } from "react";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export const FilterCard = ({setStudents}) => {
  const [age, setAge] = useState(15);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  const searchStudent = () => {
    axios.get(`http://localhost:8000/students?name=${name}&gender=${gender}&city=${city}&age=${age}`)
    .then(({data}) => {
        console.log(data);
        setStudents(data)
    }).catch(err => {
        console.log(err);
    })
  }

  return (
    <Div>
      <h1>Filters</h1>
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
      <FormControl className="select">
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" className="searchbtn" onClick={() => searchStudent()}>Search</Button>
    </Div>
  );
};

const Div = styled.div`
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
  .inputs {
    margin: 5px;
  }
  .select {
    width: 225px;
    margin-top: 3px;
  }
  .searchbtn{
      margin-top: 10px;
  }
`;
