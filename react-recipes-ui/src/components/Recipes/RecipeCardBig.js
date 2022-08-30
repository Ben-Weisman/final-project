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
  Typography,
  Tooltip
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from '@mui/icons-material/Comment';
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import ElementList from "./ElementList";
import CommentsArray from "./comments/commentsArray"



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
    marginBottom: 40,
    width: 700
  },
  typography: {
    fontFamily: ['Lora', 'Georgia', 'serif'],
    fontSize: '1.2rem',
    fontStyle: 'italic',
    marginBottom: 30
  },

  img: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 40,
    width: 300
  },
  
  modal: {

  },
  title: {},

  paper: {

  }
}));

const RecipeCardBig = ({ recipe, page }) => {

  console.log(recipe.likes.length+"likes")

  const classes = useStyles();
  const [instructions, setInstructions] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [showComments, setShowComments] = useState(false);

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
        title={recipe.name}
      ></CardHeader>
      <CardContent>
        <typography className={classes.typography}>{recipe.description}</typography>       
        <img className={classes.img} src={recipe.image} />
        <Grid container spacing={2}>
        <Grid item xs={4} md={6}>
          <Typography variant="h6" className={"classes.title"}>
            Ingredients:
          </Typography>
          <div className={"classes.demo"}>
            <List>
              {recipe.ingredients.map(item => (
                <ListItem>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={4} md={6}>
          <Typography variant="h6" className={classes.title}>
            Instructions:
          </Typography>
          <div className={"classes.demo"}>
            <List dense={true}>
              {recipe.instructions.map(item => (
                <ListItem>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </div>
          </Grid>
        </Grid>
      </CardContent>
      <Tooltip title="comments">
        <IconButton aria-label="see comments">
          <CommentIcon onClick={() => {setShowComments(true)}}/>
        </IconButton>
      </Tooltip>
      {showComments && <CommentsArray recipe={recipe}/>}

    </Card>
  );
};

export default RecipeCardBig;
