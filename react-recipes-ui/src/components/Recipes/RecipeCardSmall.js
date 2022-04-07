import { DeleteOutlined, Transform, Translate } from "@mui/icons-material";
import {
  Backdrop,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import React, { useState } from "react";
import RecipeCardBig from "./RecipeCardBig";
import { Dialog } from "@mui/material";
import Popup from "../Tools/Popup";

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "200vh"
  }
}));

const RecipeCardSmall = ({ recipe, page }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const handleOpen = () => {
    setOpenPopup(true);
  };
  const handleClose = () => {
    setOpenPopup(false);
  };
  const checkPage = page => {
    console.log(page === "home");
    if (page === "home") return "none";
  };

  return (
    <Card elevation={3}>
      <CardHeader
        action={
          <IconButton
            sx={{
              display: "none"
            }}
            aria-label="delete"
          >
            <DeleteOutlined />
          </IconButton>
        }
        title={recipe.name}
      ></CardHeader>
      <CardMedia
        className="recipe-image"
        image="public\salad.jpg"
        height="194"
        alt={recipe.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
      </CardContent>
      <IconButton aria-label="open full recipe">
        <OpenInFullIcon onClick={handleOpen} />
      </IconButton>
      {/* <Dialog
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <Paper>
              <RecipeCardBig recipe={recipe} />
            </Paper>
          </Fade>
        </Dialog> */}
      <Popup
        title={recipe.title}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <RecipeCardBig recipe={recipe}></RecipeCardBig>
      </Popup>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
    </Card>
  );
};

export default RecipeCardSmall;
