/*global chrome*/

import React, { useState, useEffect, useRef } from "react";
import { Tabs, useChromeTabs } from "@sinm/react-chrome-tabs";
import ChromeTabs from "@sinm/react-chrome-tabs/dist/chrome-tabs";
import ShowRecipe from './showRecipe';
import image from "../images/icon.png"
import{
    ExtensionWrapper,
    RecipeCardTitle,
    ExtensionButton,
    Wrapper,
    RecipeTitle,
    SaveButton,
    EditButton,
    ParentDiv,
    ChildDiv,
    RecipeHeader,
    Title,
    Description
} from "./recpies.style";
import {
  goBack,
  goTo,} from 'react-chrome-extension-router';
import TeachScreen from "./TeachingExtension/Screens/TeachScreen";
import { SwipeableDrawer } from "@mui/material";
import Swal from "sweetalert2"
import { useHistory, useLocation } from "react-router-dom";

//import { getTextFieldUtilityClass } from "@mui/material";


export default function MainWindow() {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
 

  //get the url of the recipe
  function getUrl() {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      let url = tabs[0].url; 
      addRecipeHandler(url);
     });
  }
  
  //send the url of the recipe to the scraper and get the json of the recipe
  async function addRecipeHandler(url) {
    const response = await fetch("http://localhost:5000/getUrl?url="+url);
    if (response.status===200){
      const recipe_data = await response.json(); 
      setData(recipe_data);
  }
  else {
    console.log('LOG: An error occurred')
    Swal.fire({
      title: 'An error occurred',
      text: "Do you want to teach us?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#84fa84',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Lets Start!',
          'success'
        ).than(goTo(TeachScreen(url)))
      }
    })
  }

};
  // function logingHandler() {
  //   if (!localStorage.getItem("user")) {
  //     window.open("http://localhost:8000/login")
  //   }


  // }

  // useEffect(() => {
  //   logingHandler()
  // }, []);


  function goToCookBook() {
    window.open("http://localhost:8000/cookbook")
  }
  
    return (
      <ExtensionWrapper>
         <RecipeCardTitle>Recipe Helper</RecipeCardTitle>
         <img src={image} id="cookingGirl" width="120" height="140"/>
         <Wrapper>
           <ExtensionButton onClick={() =>{setOpen(true); getUrl();}}>Add This Recipe</ExtensionButton>
           {Object.keys(data).length !== 0 && open && <ShowRecipe recipe={data}></ShowRecipe> }                    
           <ExtensionButton onClick={goToCookBook}>My Coockbook</ExtensionButton>
           </Wrapper>
        </ExtensionWrapper>
  );    
}
