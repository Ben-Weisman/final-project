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
import CookBook from "./Pages/CookBook";
import SignUp from "./components/Forms/SignUp/SignUp";
import ForgotPassword from "./components/Forms/ForgetPassword/ForgotPassword";
import AddRecipePage from "./Pages/AddRecipePage";
import MyRecipesPage from "./Pages/MyRecipesPage";

const ServerURL = "http://localhost:3000/api/v1/";

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
            <Login ServerURL={ServerURL} />
          </Route>
          <Route exact path="/signup">
            <SignUp ServerURL={ServerURL} />
          </Route>
          <Route exact path="/reset-password">
            <ForgotPassword />
          </Route>
          <Layout>
            <Route exact path="/home">
              <Home ServerURL={ServerURL} />
            </Route>
            <Route exact path="/create">
              <AddRecipePage />
            </Route>
            <Route exact path="/cookbook">
              <MyRecipesPage />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
