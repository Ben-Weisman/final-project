import { ConstructionOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import RecipesArray from "./RecipesArray";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#FAEBD7",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
}));
function getUserEmail() {
  const user = localStorage.getItem("user");
  const userJson = JSON.parse(user);
  console.log(userJson.email);
  return userJson.email;
}

const LogedInUserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [userID, setUserID] = useState("");
  const classes = useStyles();

  // const requestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ user_id: userID })
  // };

  useEffect(() => {
    // setUserID(JSON.stringify(getUserName()));
    // setUserID(localStorage.getItem("user").userID);
    let userEmail = getUserEmail();
    console.log(userEmail);
    fetch("http://localhost:3000/api/v1/recipes/get-by-owner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRecipes(data);
      });
  }, [setRecipes]);

  const page = "my-recipes";
  return (
    <div className={classes.root}>
      <RecipesArray page={page} recipes={recipes} />
      {/* <Button className='btn' /> */}
    </div>
  );
};

export default LogedInUserRecipes;
