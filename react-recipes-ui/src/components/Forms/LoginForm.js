import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
//import axios from "axios";
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

async function loginUser(email, password) {
  console.log(email, password);
  return fetch("http://localhost:3000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(email, password)
  })
    .then(data => data.json())
    .then(data => {
      console.log(data);
      return data;
    });
}

const LoginForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password
    });

    console.log(response.name);
    if (response.status === "Success") {
      Swal.fire("Success", "Hello " + response.name, "success", {
        buttons: false,
        timer: 2000
      }).then(() => {
        localStorage.setItem("user", JSON.stringify(response));
        window.location.href = "/home";
      });
    } else {
      console.log("here 111");
      Swal.fire("Failed", response.message, "error");
      setPassword("");
      setEmail("");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickShowPassword = () => {
    setShowPassword(true);
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
                label="Email"
                name="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className={classes.input}>
              <TextField
                className={classes.field}
                required
                id="outlined-basic"
                label="Password"
                name="password"
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={e => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              ></TextField>
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
