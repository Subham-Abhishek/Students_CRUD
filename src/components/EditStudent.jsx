/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

export const EditStudent = () => {
  const history = useHistory();
  const { id } = useParams();

  const [payload, setPayload] = useState({
    name: "",
    age: "",
    gender: "",
    city: "",
  });

  const getStudents = async () => {
    await axios.get(`http://localhost:8000/students/${id}`).then(({ data }) => {
      setPayload({
        ...payload,
        name: data.name,
        age: data.age,
        gender: data.gender,
        city: data.city,
      });
    });
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/students/${id}`, payload);
    history.push("/");
  };

  return (
    <>
      <Link to="/">
        <button className="homebtn">Home</button>
      </Link>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Edit Student Details</h1>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  type="text"
                  value={payload.name}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="age"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  value={payload.age}
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  type="text"
                  value={payload.gender}
                  select
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                  fullWidth
                  name="city"
                  label="City"
                  type="text"
                  value={payload.city}
                  id="city"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {"Update"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
