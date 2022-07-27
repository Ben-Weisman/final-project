/*global chrome*/

import React, { useState, useEffect } from "react";
// import ChromeTabs from "@sinm/react-chrome-tabs/dist/chrome-tabs";
// import { Tabs, useChromeTabs } from "@sinm/react-chrome-tabs";





export default function MainScreen()  {
  const [data, setData] = useState(0);

  
    // useEffect(() => {
    //   chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    //     let url = tabs[0].url;
    
    //     return fetch("http://localhost:5000/getUrl?url="+url, "POST")
    //       .then(data => data.json())
    //       .then(data => {
    //         console.log(data);
    //         return data;
    //       });
       
      
     
        
    // });

    // }, [])
        
    return (
        <nav className="navbar">
         <h1>Recipe Helper</h1>
         <div className='list'>
           <button className='button' onClick={setData}>Add This Recipe</button>
           <button className='button'>My Coockbook</button>
         </div>
       </nav>
    );    
}