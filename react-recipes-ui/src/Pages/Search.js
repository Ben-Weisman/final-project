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
import RecipesArray from "../components/Recipes/RecipesArray";


export default function Search(){

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsString, setIngredientsString] = useState("");
  const [categoryString, setCategoryString] = useState("");
  const [categories, setCategories] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [value, setValue] = useState();
  const [text, setText] = useState();
  const [massage, setMassage] = useState("");

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
      label: "Owner name",
      text: "owner name..."
    },
    {
      value: "categories",
      label: "Categories",
      text: "category1, category2..."
    }
  ]

  useEffect(()=> {
    if(ingredients.length > 0){
      getRecipesByIngredients()
      }
      if(categories.length > 0){
        getRecipesByCategory()
      }

  },[categories, ingredients]);


  function handleSubmitTitle(e){
    if(e.keyCode == 13){
      getRecipesByTitle()
    }

  }

  function handleSubmitIngredients(e){
      if(e.keyCode == 13){
        var tempString = ingredientsString.replace(/\s+/g, ''); //remove spaces from the string
        var tempArray = tempString.split(','); 
        setIngredients(tempArray)      
        setIngredientsString("");
      }
    }
    function handleSubmitCategories(e){
      if(e.keyCode == 13){
        var tempString = categoryString.replace(/\s+/g, ''); //remove spaces from the string
        var tempArray = tempString.split(','); 
        setCategories(tempArray)      
        setCategoryString("");
      }
    }

  function handleSubmitOwnerName(e){
    if(e.keyCode == 13){
      getRecipesByOwnerName()
    }

  }

  async function getRecipesByIngredients(){
    const response = await fetch("http://localhost:3000/api/v1/search/ingredients",{
      method: "POST",
      headers: {
        'Content-type': 'application/json', 'Accept': 'application/json'
      },
      body: JSON.stringify({"ingredients":ingredients})
    })
    .then(res => res.json())
    .then(data => {
      setRecipes(data);
      if(data.length<1){
       setMassage("No recipes to show")
      }
    });
  }

  async function getRecipesByCategory(){
    const response = await fetch("http://localhost:3000/api/v1/search/category",{
      method: "POST",
      headers: {
        'Content-type': 'application/json', 'Accept': 'application/json'
      },
      body: JSON.stringify({"categories":categories})
    })
    .then(res => res.json())
    .then(data => {
       setRecipes(data);
       if(data.length<1){
        setMassage("No recipes to show")
       }       
    });
  }

  async function getRecipesByTitle(){
    const response = await fetch("http://localhost:3000/api/v1/search/recipe",{
      method: "POST",
      headers: {
        'Content-type': 'application/json', 'Accept': 'application/json'
      },
      body: JSON.stringify({"fieldName": "name", "value":title})
    })
    .then(res => res.json())
    .then(data => {
      setRecipes(data);
      if(data.length<1){
       setMassage("No recipes to show")
      }
    });

    setTitle("")
  }

  async function getRecipesByOwnerName(){
    const response = await fetch("http://localhost:3000/api/v1/search/recipe",{
      method: "POST",
      headers: {
        'Content-type': 'application/json', 'Accept': 'application/json'
      },
      body: JSON.stringify({"fieldName": "ownerName", "value":ownerName})
    })
    .then(res => res.json())
    .then(data => {
      setRecipes(data);
      if(data.length < 1){
       setMassage("No recipes to show")
      }
    });

    setOwnerName("")
  }

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
                onChange={(event)=> {setValue(event.target.value); setText(option.text)}}
                />
                
            ))}
          </RadioGroup>
        </FormControl>
        <Container>
        {value &&         
          value=="title"? <TextField 
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            onKeyDown={handleSubmitTitle}
            placeholder={text}
          />:value=="ingredients"?             
            <TextField 
            value={ingredientsString}
            onChange={(e)=> setIngredientsString(e.target.value)}
            onKeyDown={handleSubmitIngredients}
            placeholder={text}
            />: value=="ownerName"?
            <TextField 
            value={ownerName}
            onChange={(e)=> setOwnerName(e.target.value)}
            onKeyDown={handleSubmitOwnerName}
            placeholder={text}
          />:value=="categories"?
          <TextField 
          value={categoryString}
          onChange={(e)=> setCategoryString(e.target.value)}
          onKeyDown={handleSubmitCategories}
          placeholder={text}
        />:""
        }
        </Container>
        {recipes.length>0? <RecipesArray recipes={recipes} ServerURL="http://localhost:3000/api/v1/"/>:
        <Container><h1>{massage}</h1></Container>
        }
      </Grid>

    )

}