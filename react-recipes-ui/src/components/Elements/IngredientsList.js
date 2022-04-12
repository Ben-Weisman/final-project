import { List } from "@mui/material";
import React from "react";
import IngredientItem from "./IngredientItem";

const IngredientsList = ({ ingredients }, { removeItem }) => {
  return (
    <List>
      {ingredients.map(ingredient => (
        <IngredientItem
          ingredient={ingredient}
          removeItem={removeItem}
        ></IngredientItem>
      ))}
    </List>
  );
};

export default IngredientsList;
