import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Grid,
  IconButton,
  Box,
  List,
  TextField,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';



export default function categories(){

  const [categoryString, setCategoryString] = useState("");
  const [categoryArray, setCategoryArray] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(()=> {
    console.log("ds")
    getRecipes();
  },[categoryArray]);


function handleSubmit(e){
    if(e.keyCode == 13){
      var tempString = categoryString.replace(/\s+/g, ''); //remove spaces from the string
      var tempArray = tempString.split(','); 
      setCategoryArray(tempArray)      
      setCategoryString("");
      //console.log(categoryArray)
      // if(categoryArray.length>0){
      //   getRecipes();
      // }
    }
  }


  

    async function getRecipes(){
      const response = await fetch("http://localhost:3000/api/v1/search/category",{
        method: "POST",
        headers: {
          'Content-type': 'application/json', 'Accept': 'application/json'
        },
        body: JSON.stringify({"categories":categoryArray})
      })

      console.log(response)


    }



    return(
      <Grid align="center">
        <Typography component="h1" variant="h5">
          Search for recipes
        </Typography>
        <br></br>
        <TextField 
          label="serach by category"
          value={categoryString}
          onChange={(e)=> setCategoryString(e.target.value)}
          onKeyDown={handleSubmit}
          //placeholder="title, ingredient, category..."

        />

        <IconButton>
          <SearchIcon></SearchIcon>
        </IconButton>
      </Grid>

    )

}