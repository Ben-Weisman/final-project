import {
  ConstructionOutlined,
  DeleteOutlined,
  Transform,
  Translate
} from "@mui/icons-material";
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
import React, { useEffect, useState } from "react";
import RecipeCardBig from "./RecipeCardBig";
import { Dialog } from "@mui/material";
import Popup from "../Tools/Popup";
import Swal from "sweetalert2";

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
  },
  home: {
    display: "none"
  },
  cookbook: {
    display: "flex"
  }
}));

function getUserEmail() {
  const user = localStorage.getItem("user");
  const userJson = JSON.parse(user);
  return userJson["email"];
}

async function deletFromDBServer(recipe_id) {
  //need to change the static url
  console.log(recipe_id);
  return fetch("http://localhost:3000/api/v1/recipes/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: recipe_id.id })
  })
    .then(data => data.json())
    .then(data => {
      console.log(data);
      return data;
    });
}

async function deletFromDB(id) {
  const response = await deletFromDBServer({
    id
  });
  if (response.status === "ok") {
    Swal.fire("Deleted!", "The recipe has been deleted.", "success").then(
      () => {
        window.location.reload();
      }
    );

    // window.location.reload();
  } else {
    Swal.fire("Failed", response.message, response.status);
  }
}
async function addToCookbook(id, email) {
  return fetch(
    "http://localhost:3000/api/v1/recipes/add-existing-to-cookbook",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(id, email)
    }
  )
    .then(data => data.json())
    .then(data => {
      console.log(data);
      return data;
    });
}

export default function RecipeCardSmall(props) {
  const handelDelete = async e => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      const recipe_id = props.recipe.recipeID;
      console.log(recipe_id);
      if (result.isConfirmed) {
        deletFromDB(recipe_id);
      }
    });
  };

  const AddToCookbookHandler = async e => {
    e.preventDefault();
    const id = props.recipe.recipeID;
    console.log("recipeID: " + id);
    const email = getUserEmail();
    const response = await addToCookbook({ id, email });
    if (response.status === "ok") {
      Swal.fire("Added!", "Your recipe was Added.", "success");
    }
  };

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [style, setStyle] = useState();
  const handleOpen = () => {
    setOpenPopup(true);
  };
  const handleClose = () => {
    setOpenPopup(false);
  };
  const checkPage = page => {
    console.log(page === "Home");
    if (page === "Home") return "none";
  };
  useEffect(() => {
    checkPage(props.page);
  }, []);

  return (
    <Card elevation={3}>
      <CardHeader
        action={
          <IconButton className={classes.style} aria-label="delete">
            <DeleteOutlined onClick={handelDelete} />
          </IconButton>
        }
        title={props.recipe.name}
      ></CardHeader>
      <img src={props.recipe.image} alt={props.recipe.name_name} width="370" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.recipe.description}
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
        title={props.recipe.name}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <RecipeCardBig recipe={props.recipe}></RecipeCardBig>
      </Popup>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon onClick={AddToCookbookHandler} />
      </IconButton>
    </Card>
  );
}
