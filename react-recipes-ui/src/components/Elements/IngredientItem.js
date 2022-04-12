import { Grid, IconButton, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { ListItemIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const IngredientItem = ({ ingredient, removeItem }) => {
  return (
    <Grid key={ingredient.id}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <RemoveIcon onClick={() => removeItem(ingredient.id)}></RemoveIcon>
          </IconButton>
        }
      >
        <ListItemText primary={ingredient.text}></ListItemText>
      </ListItem>
    </Grid>
  );
};

export default IngredientItem;
