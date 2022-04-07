import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { positions } from "@mui/system";
import { Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Fade } from "@mui/material";
import { border } from "@mui/system";
import { Backdrop } from "@mui/material";
import React, { useState } from "react";
import SignupForm from "./SignupForm";
import Swal from "sweetalert2";
// import FormLable from '@mui/material/core/FormLable'
const useStyles = makeStyles(theme => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    padding: 5
  },
  btn: {
    marginTop: 30,
    marginBottom: 20,
    width: 210,
    padding: 5
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    // padding: 20,
    // height: "50vh",
    // width: 280,
    // margin: "20px auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "50vh",
    top: "30px",
    marginTop: 40
  },
  root: {
    alignItems: "center",
    justifyContent: "center"
  },
  form: {},
  input: {
    padding: 20
  },
  btnWrapper: {
    marginTop: 100
  }
}));

// const [usernameError, setUsernameError] = useState(false)
// const [passwordError, setPasswordError] = useState(false)

async function loginUser(credentials) {
  console.log(credentials);
  return (
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      //.then(data => data.json())
      .then(data => console.log(data))
  );
}

const LoginForm = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });

    if ("accessToken" in response) {
      Swal.fire("Success", response.message, "success", {
        buttons: false,
        timer: 2000
      }).then(value => {
        localStorage.setItem("accessToken", response["accessToken"]);
        localStorage.setItem("user", JSON.stringify(response["user"]));
        window.location.href = "/home";
      });
    } else {
      //Swal("Failed", response.message, "error");
      Swal.fire("Failed", "Failed to login", "error");
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid align="center" className={classes.root}>
      <FormControl className="login-form-control">
        <Paper className={classes.paper}>
          <Typography className={classes.field} component="h2" variant="h6">
            Welcome to recipes
          </Typography>
          <form noValidate className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.input}>
              <TextField
                required
                id="outlined-basic"
                label="Username"
                name="username"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className={classes.input}>
              <TextField
                className={classes.field}
                required
                id="outlined-basic"
                label="Password"
                name="password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className={classes.btnWrapper}>
              <Grid>
                <Button
                  className={classes.btn}
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
              </Grid>
              <div>
                <Button
                  className={classes.btn}
                  color="secondary"
                  variant="contained"
                  onClick={handleOpen}
                >
                  Sign Up
                </Button>
                <Dialog
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500
                  }}
                >
                  <Fade in={open}>
                    <Paper>
                      <SignupForm />
                    </Paper>
                  </Fade>
                </Dialog>
              </div>
            </div>
          </form>
        </Paper>
      </FormControl>
    </Grid>
  );
};

export default LoginForm;
