import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import { makeStyles } from "@mui/styles";
import { border, borderColor } from "@mui/system";
import SignIn from "../components/Forms/SignIn/SignIn";
// import RecipeCardSmall from '..components/Recipes'
// const useStyles = makeStyles({
//     form:{
//         shape: borderColor="primary"
//     }
// })
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#FAEBD7",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
}));
const Login = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <LoginForm ServerURL={props.ServerURL}></LoginForm> */}
      <SignIn ServerURL={props.ServerURL}></SignIn>
    </div>
  );
};

export default Login;
