import React from "react";
import {  Grid, Paper } from "@mui/material";



export default function Comments({comment}) {

    return(
        
        <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.name}</h4>
            <p style={{ textAlign: "left" }}>
                {comment.content}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted on {comment.dateCreated}
            </p>
          </Grid>
        </Grid>
      </Paper>      
    )


}