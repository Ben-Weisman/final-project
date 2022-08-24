/*global chrome*/
import React, { useEffect, useState } from 'react'
import Grid, { Button, Paper } from '@mui/material'

import NewWindow from 'react-new-window';



const InteractiveTeachingTab = (props) => {
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
   


  return (
 
    <NewWindow title="Teaching screen" center="screen">
        
            <Button onClick={getSelectedTextHandler}></Button>
    
    </NewWindow>
  )
}

export default InteractiveTeachingTab