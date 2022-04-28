import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import RecipesArray from "../components/Recipes/RecipesArray";
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#FAEBD7",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
}));
function getUserName() {
  const user = localStorage.getItem("user");
  const userJson = JSON.parse(user);
  console.log(userJson.userID);
  return userJson["userID"];
}

const CookBook = () => {
  const [recipes, setRecipes] = useState([]);
  const [userID, setUserID] = useState("");
  const classes = useStyles();
  useEffect(() => {
    setUserID(JSON.stringify(getUserName()));
    fetch("http://localhost:3000/api/v1/recipes/cookbook/", {
      user_id: userID
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRecipes(data.recipes);
      });
  }, []);

  const page = "cookbook";

  return (
    <div className={classes.root}>
      <RecipesArray page={page} recipes={recipes} />
      {/* <Button className='btn' /> */}
    </div>
  );
};

export default CookBook;
