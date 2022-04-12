import { makeStyles } from "@mui/styles";
import React from "react";
import useWindowPosition from "../../Hooks/useWindowPosition";
import AboutUs from "./AboutUs";
const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    }
  }
}));
const LandingContent = () => {
  const classes = useStyles();
  const checked = useWindowPosition("header");
  return (
    <div id="about-us" className={classes.root}>
      <AboutUs checked={checked} />
    </div>
  );
};

export default LandingContent;
