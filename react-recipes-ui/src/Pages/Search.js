import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Container,
  Grid,
  IconButton,
  Box,
  List,
  TextField,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';



export default function Search(){

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsString, setIngredientsString] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [value, setValue] = useState();
  const [text, setText] = useState();

  const searchOptions = [
    {
      value: "title",
      label: "Title",
      text: "recipe title..."
    },
    {
      value: "ingredients",
      label: "Ingredients",
      text: "ingredient1, ingredient2,..."
    },
    {
      value: "ownerName",
      label: "owner name",
      text: "owner name..."
    }
  ]


  function handleSubmitTitle(e){
    if(e.keyCode == 13){
      setTitle("")
    }

  }

function handleSubmitIngredients(e){
    if(e.keyCode == 13){
      var tempString = ingredientsString.replace(/\s+/g, ''); //remove spaces from the string
      var tempArray = tempString.split(','); 
      setIngredients(tempArray)      
      setIngredients("");
      //console.log(categoryArray)
      // if(categoryArray.length>0){
      //   getRecipes();
      // }
    }
  }

  function handleSubmitOwnerName(e){
    if(e.keyCode == 13){
      setOwnerName("")
    }

  }


  

//     async function getRecipes(){
//       const response = await fetch("http://localhost:3000/api/v1/search/category",{
//         method: "POST",
//         headers: {
//           'Content-type': 'application/json', 'Accept': 'application/json'
//         },
//         body: JSON.stringify({"categories":categoryArray})
//       })

//       console.log(response)


//     }



    return(
      <Grid align="center">
        <Typography component="h1" variant="h5">
          Search for recipes
        </Typography>
        <br></br>
        <FormControl>
          <FormLabel id="radio-buttons-group-label">Search by:</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {searchOptions.map(option => (
              <FormControlLabel 
                value={option.value} 
                control={<Radio />} 
                label={option.label}
                onChange={(event)=> {setValue(event.target.value); setText(option.text)}}/>

            ))}
          </RadioGroup>
        </FormControl>
        <Container>
        {value &&         
          value=="title"? <TextField 
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            onKeyDown={handleSubmitOwnerName}
            placeholder={text}
          />:value=="ingredients"?             
            <TextField 
            value={ingredients}
            onChange={(e)=> setIngredientsString(e.target.value)}
            onKeyDown={handleSubmitIngredients}
            placeholder={text}
            />: value=="ownerName"?
            <TextField 
            //label={searchOptions.value===value}
            value={ownerName}
            onChange={(e)=> setOwnerName(e.target.value)}
            onKeyDown={handleSubmitOwnerName}
            placeholder={text}
          />:""}
          <IconButton>
            <SearchIcon></SearchIcon>
          </IconButton>
        </Container>


      </Grid>

    )

}