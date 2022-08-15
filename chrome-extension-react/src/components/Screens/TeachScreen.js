/*global chrome*/
import React, { useEffect } from 'react'
import Grid, { Button } from '@mui/material'
import Title from '../RecipeElements/Title'
import Description from '../RecipeElements/Description'
import ChromeTabs from "@sinm/react-chrome-tabs/dist/chrome-tabs"
import { Tabs, useChromeTabs } from "@sinm/react-chrome-tabs";
import { TextField } from '@mui/material';
import BigTitle from '../RecipeElements/BigTitle'

// async function addDomAsListener() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return window.addDomAsListener(tab);
// }

const TeachScreen = (props) => {

  function getSelectedTextHandler(){  
    console.log("Log: here")
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        let activeTabId = tabs[0].id
        chrome.scripting.executeScript({
          target: {tabId: activeTabId},
          func: () => {
            let text = document.getSelection();
            let name = document.getSelection().getRangeAt(0).startContainer.parentNode;
            console.log(text.getRangeAt(0).startContainer.parentNode.childNodes);
            console.log(name)
            alert(text)
          } ,
        })
        // () => {document.body.innerHTML = "hello"}
      })
    }


  const elemnts =[title, ingredients, method, image];
  
  return (
    <div>
      {elemnts.map(element => (
        <BigTitle props={element}>
          
        </BigTitle>
      ))}
        <Button onClick={getSelectedTextHandler}> Test</Button>
    </div>
  )
}

export default TeachScreen