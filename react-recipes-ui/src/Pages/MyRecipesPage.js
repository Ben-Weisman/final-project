import { Typography } from "@mui/material";
import React from "react";
import LogedInUserRecipes from "../components/Recipes/LogedInUserRecipes";
import CookBook from "./CookBook";

const MyRecipesPage = () => {
  return (
    <div>
      <Typography align="center" variant="h2">
        {" "}
        My Cookbook
      </Typography>
      <CookBook></CookBook>
    </div>
  );
};

export default MyRecipesPage;
