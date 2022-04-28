import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

// const useStyles = makeStyles((theme)=>{

//   return({
//     appbar: {
//       width: `calc(100%)`
//     }
//   })
// })
const useStyles = makeStyles(theme => {
  return {
    toolbar: theme.mixins.toolbar,
    backgroundColor: "#FAEBD7",
    avatar: {
      marginLeft: theme.spacing(2)
    }
  };
});
function getUserName() {
  const user = localStorage.getItem("user");
  const userJson = JSON.parse(user);
  console.log(userJson);
  return userJson["name"];
}
const MainNavbar = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(getUserName());
  }, []);

  const classes = useStyles();
  //  const classes = useStyles()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar className={classes.Toolbar} color="transparent">
        <div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userName}
          </Typography>
        </div>
      </Toolbar>
    </Box>
  );
};

export default MainNavbar;
