import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   BrowserRouter,
// } from "react-router-dom";
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router';
import MainWindow from './components/mainWindow';

// import TeachScreen from './component/TeachScreen';


function App() {
  useEffect(() => {
    const { component, props } = getCurrent();
    console.log(
      component
        ? `There is a component on the stack! ${component} with ${props}`
        : `The current stack is empty so Router's direct children will be rendered`
    );
    const components = getComponentStack();
    console.log(`The stack has ${components.length} components on the stack`);
});
  return (
   
    <Router>
      <MainWindow></MainWindow>
    </Router>
    

  );
}



export default App;
