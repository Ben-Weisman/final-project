import { Pages } from "@mui/icons-material";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import RecipeCardSmall from "../components/Recipes/RecipeCardSmall";
import RecipesArray from "../components/Recipes/RecipesArray";
import { Typography } from "@mui/material";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#FAEBD7",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
}));

const Home = props => {
  // function handleRecipes(recipes) {
  //   setRecipes(recipes);
  // }
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(props.ServerURL + "recipes/get-all")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRecipes(data);
        console.log(recipes);
      });
  }, [setRecipes]);

  const classes = useStyles();
  const page = "Home";
  return (
    <div className={classes.root}>
      {/* <Typography variant="h2"> Explore all our recipes!</Typography> */}
      <RecipesArray ServerURL={props.ServerURL} recipes={recipes} page={page} />
      {/* <Button className='btn' /> */}
    </div>
  );
};

export default Home;
