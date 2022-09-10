import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  List,
  TextField,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';



export default function Search(){


    return(
      <Grid align="center">
        <Typography component="h1" variant="h5">
          Search for recipes
        </Typography>
        <br></br>
        <TextField 
          placeholder="title, ingredient, category..."

        />
        <IconButton>
          <SearchIcon></SearchIcon>
        </IconButton>
      </Grid>

    )

}