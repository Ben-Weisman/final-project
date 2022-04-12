import { DeleteOutlined } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { makeStyles } from "@mui/styles";

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
    height: "50vh",
    top: "30px",
    marginTop: 40,
    width: 700
  },
  modal: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center"
  },
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
const RecipeCardBig = ({ recipe }) => {
  const classes = useStyles();
  // const [modalStyle] = React.useState(getModalStyle);
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
      <CardMedia
        component="img"
        height="194"
        image={recipe.picture}
        alt={recipe.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
      </CardContent>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
    </Card>
  );
};

export default RecipeCardBig;
