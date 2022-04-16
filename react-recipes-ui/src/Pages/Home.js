import { Pages } from "@mui/icons-material";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import RecipeCardSmall from "../components/Recipes/RecipeCardSmall";
import RecipesArray from "../components/Recipes/RecipesArray";
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#FAEBD7",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
}));

const Home = () => {
  const classes = useStyles();
  const page = "Home";
  return (
    <div className={classes.root}>
      <RecipesArray page={page} />
      {/* <Button className='btn' /> */}
    </div>
  );
};

export default Home;
