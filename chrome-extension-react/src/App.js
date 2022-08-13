import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import MainWindow from './components/mainWindow';
// import TeachScreen from './component/TeachScreen';


function App() {
  return (
    <div className="App">
      <MainWindow />
      {/* <TeachScreen></TeachScreen> */}
    </div>
  );
}



export default App;
