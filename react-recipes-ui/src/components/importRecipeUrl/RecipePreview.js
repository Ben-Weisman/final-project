import { useState, useEffect } from "react";
import * as React from 'react';
import NewWindow from 'rc-new-window';
import EditIngredients from './EditRecipe/editIngredients'
import EditInstructions from './EditRecipe/editInstructions'
import EditDescription from './EditRecipe/editDescription'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import{
    RecipeWrapper,
    RecipeTitle,
    SaveButton,
    EditButton,
    ParentDiv,
    ChildDiv,
    RecipeHeader,
    Title,
    Description,

} from "./recipes.styles";
import Swal from "sweetalert2";
import { Checkbox, FormGroup, FormLabel,FormControlLabel, FormControl } from "@mui/material";


const foodTipes = [
    'Vegetarian',
    "Vegan",
    "Sweet",
    "Assian",
    "Italian",
    "Mexican",
    'Breakfast',
    'Lunch',
    'Dinner',
    'Beverages',
    'Appetizers',
    'Soups',
    'Salads',
    'Breads',
    'Other'
  ];




export default function RecipePreview({recipe, closeWindow}) {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const [recipe_name, setRecipeName] = useState(recipe.recipe_name);
    const [description, setDescription] = useState(recipe.recipe_description);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.recipe_instructions);
    const image = recipe.image;
    const email = getUserEmail();
    const [foodType, setFoodType] = React.useState({
        Vegetarian: false,
        Vegan: false,
        Sweet: false,
        Assian: false,
        Italian: false,
        Mexican: false,
        Breakfast: false,
        Lunch: false,
        Dinner: false,
        Beverages: false,
        Appetizers: false,
        Soups: false,
        Salads: false,
        Breads: false,
        Other: false
    });

    const [editIng, setEditIng] = useState(false);
    const [editIns, setEditIns] = useState(false);
    const [editDes, setEditDes] = useState(false);

    const openEditDes = () => {
        setEditDes(!editDes)
    }

    const openEditIng = () => {
        setEditIng(!editIng)
    }

    const openEditIns = () => {
        setEditIns(!editIns)
    }

    const changeTitle = ({ value}) => {
        setRecipeName(value)
    };

    function getUserEmail() {
        const user = localStorage.getItem("user");
        const userJson = JSON.parse(user);
        return userJson["email"];
    }

    const handleChange = event => {
        setFoodType({
          ...foodType,
          [event.target.name]: event.target.checked
        });
      };

      


    async function setPrivacy() {
        await Swal.fire({
            
            title: 'Would you like to make this recipe public?',
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        })
        .then((result) => {   
            if(result.isConfirmed){
                sendJson(true)
            }
            else{
                sendJson(false)
            }            
        })
        
    }

        

  
    //send the updated json to the scraper
    const sendJson = async(privacy) => {

        var categories = [];

        Object.entries(foodType).forEach(function(key) {
            if (key[1]){                
                categories.push(key[0]);
            }            
          });
       
        const newJson = {
            "ownerEmail": email,
            "name": recipe_name,
            "description": description,
            "category": categories,
            "instructions": instructions,
            "ingredients": ingredients,
            "image": image,
            "public": privacy
            
        }

   

        const response =  await fetch("http://localhost:5000/receiveJson", {
            method: "POST",
            body: JSON.stringify(newJson)
        })

        if (response.status===200){
            Swal.fire("Added!", "Your recipe was Added.", "success")            
        }


        else {
            Swal.fire("something went wrong")
        }

        
    }



    return (  
        <NewWindow title="Recipe Preview" center="screen">   
            <RecipeWrapper> 
                <RecipeHeader>Recipe Preview</RecipeHeader>         
                <RecipeTitle>
                     <EditText 
                        defaultValue={recipe_name}
                        onSave = {changeTitle}/>
                </RecipeTitle>
                <Description>
                    {description}
                </Description>               
                <EditButton onClick={openEditDes}>Edit Description</EditButton>
                {wait(1 * 1000) && editDes && 
                <EditDescription description={description}  changeDes={description=>setDescription(description)} closeWindow={()=> setEditDes(false)}>
                    </EditDescription>} 
                <br></br>
                <img src={image} alt="recpie img" width="300" style={{marginTop:'2rm'}} />               
                <ParentDiv>
                    <ChildDiv>
                        <Title>Ingredients:</Title>
                        <EditButton onClick={openEditIng}>Edit Ingredients</EditButton>
                        {wait(1 * 1000) && editIng && 
                        <EditIngredients ingredients={ingredients}  changeIng={ingredients=>setIngredients(ingredients)} closeWindow={()=>setEditIng(false)}>
                            </EditIngredients>} 
                        {ingredients.map(item => (
                            <li>{item}</li>
                        ))}                 
                    </ChildDiv>
                    <ChildDiv>
                        <Title>Instructions:</Title>  
                        <EditButton onClick={openEditIns}>Edit Instructions</EditButton>
                        {wait(1 * 1000) && editIns && 
                        <EditInstructions instructions={instructions} changeIns={instructions=>setInstructions(instructions)} closeWindow={()=> setEditIns(false)}>
                            </EditInstructions>}                     
                        {instructions.map(item => (
                                <li>{item}</li>
                            ))}
                    </ChildDiv>
                </ParentDiv>
                <FormControl>
                    <FormLabel>Choose categories</FormLabel>
                    <FormGroup row>
                    {foodTipes.map(item => (
                        <FormControlLabel
                        control={<Checkbox onChange={handleChange} name={item} />}
                        label={item}
                        ></FormControlLabel>
                    ))}
                    </FormGroup>
                </FormControl>
                <br></br>                       
                <SaveButton onClick={()=> {setPrivacy(); closeWindow()}}>Save Recipe</SaveButton>
            </RecipeWrapper>            
        </NewWindow>
    );

}

