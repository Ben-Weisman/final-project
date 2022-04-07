import { TheatersOutlined } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyles = makeStyles(theme => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    padding: theme.spacing(1)
  },
  btn: {
    marginTop: 5,
    marginBottom: 5,
    width: 210
  },
  form: { padding: 20, height: "50vh", width: 280, margin: "20px auto" },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "50vh",
    marginTop: 40
  }
}));

const handleSubmit = e => {
  e.prevetDefault();
};
const SignupForm = () => {
  const classes = useStyles();

  return (
    <Grid align="center">
      <FormControl className="form-control-div">
        <Paper elevation={10} className={classes.paper}>
          <Typography className={classes.title} component="h2" variant="h6">
            Sign Up!
          </Typography>
          <form noValidate className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
              <Grid item className={classes.field}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Username"
                  name="username"
                />
              </Grid>
              <Grid item className={classes.field}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Password"
                  name="password"
                  type="password"
                />
              </Grid>
              <Grid item className={classes.field}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Email"
                  name="password"
                />
              </Grid>
              <Grid className={classes.field} item>
                <Button
                  className={classes.btn}
                  color="secondary"
                  variant="contained"
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </FormControl>
    </Grid>
  );
};

export default SignupForm;
