import React, { useEffect, useState } from "react";
import { Container, Grid, List, Paper, TextField, Form, FormControl, Button } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import RecipeCardSmall from "../RecipeCardSmall";
import { makeStyles } from "@mui/styles";
import MainNavbar from "../../Navbars/MainNavbar";
import Comments from "./comments";
import AddComment from "./addComment";
import AddCommentIcon from '@mui/icons-material/AddComment';



export default function CommentsArray({recipe}){

  const [comments, setComments] = useState(recipe.comments)

  function addComment(comment){
    setComments([comment,...comments])
  }

  return (
    <Container className="container">
      <h1>Comments</h1>
      <AddComment recipeID={recipe.recipeID} newComment={addComment}/>
      {comments.sort((comment1, comment2) => (comment1.dateCreated- comment2.dateCreated)).reverse().map(comment => (      
        <Comments comment={comment}></Comments>))}
    </Container>
  );
};
