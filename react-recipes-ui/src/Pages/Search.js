import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  Box,
  List,
  TextField,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';



export default function Search(){

  const [category, setCategory] = useState()

  function handleSubmit(e){
    if(e.keyCode == 13){
      setCategory(e.target.value)
      console.log(category)
    }

  }


    return(
      <Grid align="center">
        <Typography component="h1" variant="h5">
          Search for recipes
        </Typography>
        <br></br>
        <TextField 
          label="serach by category"
          value={category}
          onChange={(e)=> setCategory(e.target.value)}
          onKeyDown={handleSubmit}
          //placeholder="title, ingredient, category..."

        />

        <IconButton>
          <SearchIcon></SearchIcon>
        </IconButton>
      </Grid>

    )

}