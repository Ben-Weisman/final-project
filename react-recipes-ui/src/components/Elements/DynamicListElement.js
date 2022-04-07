import { Grid, IconButton, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { ListItemIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const DynamicListElement = ({ element, removeItem }) => {
  return (
    <Grid key={element.id}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <RemoveIcon onClick={() => removeItem(element.id)}></RemoveIcon>
          </IconButton>
        }
      >
        <ListItemText primary={element.text}></ListItemText>
      </ListItem>
    </Grid>
  );
};

export default DynamicListElement;
