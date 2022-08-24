/*global chrome*/
import React, { useEffect, useState } from 'react'
import Grid, { Button } from '@mui/material'
import Title from '../../RecipeElements/Title'
import ChromeTabs from "@sinm/react-chrome-tabs/dist/chrome-tabs"
import { Tabs, useChromeTabs } from "@sinm/react-chrome-tabs";
import { TextField } from '@mui/material';
import BigTitle from '../../RecipeElements/BigTitle'
import { ExtensionButton, ExtensionWrapper,  RecipeCardTitle,Wrapper } from '../../recpies.style';
import ShowRecipe from '../../showRecipe';
import InteractiveTeachingTab from './InteractiveTeachingTab';
import { render } from 'react-dom';
import ReactDOM from "react-dom";
// async function addDomAsListener() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return window.addDomAsListener(tab);
// }

const TeachScreen = (props) => {
  const [open, setOpen] = useState(false);
  function getSelectedTextHandler(){ 
    console.log("LOG: " + props.url) 
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
    function injectTeachingScreen(){
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        let activeTabId = tabs[0].id
        chrome.
        chrome.scripting.executeScript({
          target: {tabId: activeTabId},
          func: () =>{
            
            // ReactDOM.createPortal(this.props.childNodes,<InteractiveTeachingTab></InteractiveTeachingTab>)
            // need to find how to render an elemnt to the dom.

            // console.log(document.body);
            // console.log(document.body.DOCUMENT_TYPE_NODE);
            // React.render( <InteractiveTeachingTab/>,
            // document.body)
            // {<RenderInBody>{<InteractiveTeachingTab></InteractiveTeachingTab>}</RenderInBody>}
            // const title = React.createElement('h1', {}, 'My First React Code');
            // document.body.appendChild(title);
            // document.body.innerHTML = "hello";
            // document.body.append()
            
           
          } ,
        })
      })
    }

  // const elemnts =[title, ingredients, method, image];
  
  return (
    <ExtensionWrapper>
     {/* {elemnts.map(element => (
       //     <BigTitle props={element}>
       
       
       //     </BigTitle>
      //   ))} */}
       <RecipeCardTitle>Recipe Helper</RecipeCardTitle>
       <Wrapper>
      
        <ExtensionButton onClick={()=>{setOpen(true); injectTeachingScreen();} }> Start teaching!</ExtensionButton>
        {/* {open && <InteractiveTeachingTab></InteractiveTeachingTab>} */}
       </Wrapper>
      </ExtensionWrapper>
  )
}

export default TeachScreen