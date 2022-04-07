import { CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import LandingContent from "../components/LandingComponents/LandingContent";

import LandingNavbar from "../components/Navbars/LandingNavbar";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    //backgroundImage: `url(${process.env.PUBLIC_URL + "salad.jpg"})`,
    backgroundColor: "#FAEBD7",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
}));
const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LandingNavbar />
      <LandingContent />
      <CssBaseline />
    </div>
  );
};

export default Landing;
