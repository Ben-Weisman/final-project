//import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignupForm from "./components/Forms/SignupForm";
import Layout from "./components/Layout";
import MainNavbar from "./components/Navbars/MainNavbar";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import InsertRecipeManualForm from "./components/Forms/InsertRecipeManualForm";
import Landing from "./Pages/Landing";

const theme = createTheme({
  palette: {
    secondary: purple
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignupForm />
          </Route>
          <Layout>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/create">
              <InsertRecipeManualForm />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
