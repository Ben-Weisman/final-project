import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import MainWindow from './components/mainWindow';
import ChromeTabs from '@sinm/react-chrome-tabs/dist/chrome-tabs';



function App() {

  return (
    <div className="App">
      <MainWindow />
    </div>
  );
}



export default App;
