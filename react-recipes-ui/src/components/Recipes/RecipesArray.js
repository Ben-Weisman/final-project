import React, { useEffect, useState } from "react";
import { Container, Grid, List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import RecipeCardSmall from "./RecipeCardSmall";
import { makeStyles } from "@mui/styles";
import MainNavbar from "../Navbars/MainNavbar";

const useStyles = makeStyles({
  recipeCard: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    height: "70vh",
    display: "block",
    width: 280
  },
  container: {
    height: `calc(100% - ${MainNavbar}px)`
  }
});
const RecipesArray = page => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/recipes/get-all")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRecipes(data.recipes);
      });
  }, []);

  return (
    <Container className="container">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {recipes.map(recipe => (
          <Grid
            className="recipeCard"
            item
            key={recipe.key}
            xs={12}
            md={6}
            lg={4}
          >
            <RecipeCardSmall
              className={classes.recipeCard}
              recipe={recipe}
              page={page}
            ></RecipeCardSmall>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipesArray;
