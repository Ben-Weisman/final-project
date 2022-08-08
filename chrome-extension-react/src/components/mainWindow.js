/*global chrome*/

import React, { useState, useEffect, useRef } from "react";
import { Tabs, useChromeTabs } from "@sinm/react-chrome-tabs";
import ChromeTabs from "@sinm/react-chrome-tabs/dist/chrome-tabs";
import ShowRecipe from './showRecipe';
import image from "./images/icon.png"


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
      const recipe_data = await response.json(); 
      setData(recipe_data);
  };



    return (
        <div className="main-window">
         <h1>Recipe Helper</h1>
         <img src={image} id="cookingGirl" width="100" height="120"/>
         <br></br>
         <div className='list'>
           <button className='button' onClick={() =>{setOpen(true); getUrl();}}>Add This Recipe</button>
           {Object.keys(data).length !== 0 && open && <ShowRecipe recipe={data}></ShowRecipe> }                    
           <button className='button'>My Coockbook</button>
         </div>
       </div>
  );    
}