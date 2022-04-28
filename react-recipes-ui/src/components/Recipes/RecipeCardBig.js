import { DeleteOutlined } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import ElementList from "./ElementList";

const useStyles = makeStyles(theme => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  },
  btn: {
    marginTop: 5,
    marginBottom: 5,
    width: 210
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "30px",
    marginTop: 40,
    width: 700
  },
  modal: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center"
  },
  title: {},

  paper: {
    // backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    // height: "200vh"
  }
}));
// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }
// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();
//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`
//   };
// }
const RecipeCardBig = ({ recipe, page }) => {
  const classes = useStyles();
  const [instructions, setInstructions] = useState();
  const [ingredients, setIngredients] = useState([]);
  // const [modalStyle] = React.useState(getModalStyle);
  useEffect(() => {
    console.log(recipe.instructions);
    setInstructions(recipe.instructions);
    setIngredients(recipe.ingredients);
    console.log(instructions);
  }, []);
  return (
    <Card className={classes.card} elevation={3}>
      <CardHeader
        action={
          <IconButton aria-label="delete">
            <DeleteOutlined />
          </IconButton>
        }
        title={recipe.recipe_name}
      ></CardHeader>
      {/* <CardMedia
        component="img"
        height="194"
        image={recipe.picture}
        alt={recipe.recipe_name}
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.recipe_description}
        </Typography>
        {/* <ElementList
          ItemsArray={recipe.instructions}
          title="Ingredients"
        ></ElementList> */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={"classes.title"}>
            {recipe.ingredients.title}
          </Typography>
          <div className={"classes.demo"}>
            <List>
              {recipe.ingredients.map(item => (
                <ListItem>
                  <ListItemText primary={item.ingredient_name} />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid>
          <Typography variant="h6" className={classes.title}>
            {recipe.instructions.title}
          </Typography>
          <div className={"classes.demo"}>
            <List dense={true}>
              {recipe.instructions.map(item => (
                <ListItem>
                  <ListItemText primary={item.instruction_description} />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </CardContent>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
    </Card>
  );
};

export default RecipeCardBig;
