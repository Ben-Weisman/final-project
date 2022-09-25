import React, { useState, useRef } from "react";
import { Grid, List, Paper, TextareaAutosize, Button } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import {server} from "./../../../constants"


export default function addComment(props) {

    const current = new Date();
    const date = `${addZero(current.getDate())}/${addZero(current.getMonth()+1)}/${current.getFullYear()} at ${addZero(current.getHours())}:${addZero(current.getMinutes())}`;
    function addZero(i) {
      if (i < 10) {i = "0" + i}
      return i;
    }
    
    
    const userName = getUserName();
    const email = getUserEmail();

    function getUserName() {
        const user = localStorage.getItem("user");
        const userJson = JSON.parse(user);
        console.log(userJson);
        return userJson["name"];
    }

    function getUserEmail() {
      const user = localStorage.getItem("user");
      const userJson = JSON.parse(user);
      return userJson["email"];
  }


   
    const INITIAL_HEIGHT = 46;

      const [isExpanded, setIsExpanded] = useState(false);
      const [commentValue, setCommentValue] = useState();
      const outerHeight = useRef(INITIAL_HEIGHT);
      const containerRef = useRef(null);

    
      const onExpand = () => {
        if (!isExpanded) {
          outerHeight.current = containerRef.current.scrollHeight;
          setIsExpanded(true);
        }
      };
    
      const onChange = (e) => {
        setCommentValue(e.target.value);
      };
          
      async function addComment() {
        const comment = {
          "email":email,
          "name": userName,
          "dateCreated": date,
          "content": commentValue
      }  

        const response =  await fetch("http://"+server+":3000/api/v1/recipes/comment-likes", {
          method: "POST",
          headers: {
            'Content-type': 'application/json', 'Accept': 'application/json'
          },
          body: JSON.stringify({"comments":[comment], "recipeID":props.recipeID, "likes":[]})
        })

        if(response.status === 200){
          props.newComment(comment)
          setCommentValue("")
        }

       }
    
      return (
        <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{userName}</h4>
            <p style={{ textAlign: "left" }}>
            <TextareaAutosize

              ref={containerRef}

              style={{
                minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT,
                width: 600
              }}

              onClick={onExpand}
              onFocus={onExpand}
              onChange={onChange}
              className="comment-field"
              value={commentValue}
              name="comment"
              id="comment"
            />
            
            <Button 
                 onClick={addComment}
                 variant="outlined" 
                 color="secondary" 
                 size="small" 
                 endIcon={<AddCommentIcon />}>
                Post Comment
            </Button>
            </p>

            </Grid>
            </Grid>
        </Paper>      

      );
    
    


}