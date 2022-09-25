import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignupForm from "./components/Forms/SignupForm";
import Layout from "./components/Layout";
import MainNavbar from "./components/Navbars/MainNavbar";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";
import Landing from "./Pages/Landing";
import CookBook from "./Pages/CookBook";
import SignUp from "./components/Forms/SignUp/SignUp";
import ForgotPassword from "./components/Forms/ForgetPassword/ForgotPassword";
import AddRecipePage from "./Pages/AddRecipePage";
import MyRecipesPage from "./Pages/MyRecipesPage";
import Search from "./Pages/Search";
import Categories from "./Pages/Categories";
import {server} from "./constants"

const ServerURL = "http://"+server+":3000/api/v1/";

const theme = createTheme({
  palette: {
    secondary: deepPurple
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
            <Route exact path="/categories">
              <Categories />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
