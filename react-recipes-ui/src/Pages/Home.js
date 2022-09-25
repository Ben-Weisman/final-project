import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import RecipesArray from "../components/Recipes/RecipesArray";


const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MDAnIGhlaWdodD0nNDAwJyB2aWV3Qm94PScwIDAgNDAwIDQwMCc+CjxkZWZzPgoJPHBhdHRlcm4gaWQ9J2JsdWVzdHJpcGUnIHBhdHRlcm5Vbml0cz0ndXNlclNwYWNlT25Vc2UnIHg9JzAnIHk9JzAnIHdpZHRoPSc4JyBoZWlnaHQ9JzE2JyB2aWV3Qm94PScwIDAgNSAxMCcgPgoJCTxyZWN0IHg9Jy01JyB5PSctNScgd2lkdGg9JzE1JyBoZWlnaHQ9JzIwJyBmaWxsPScjRUZGN0YxJy8+CgkJPGxpbmUgeDE9Jy0yJyB5MT0nMScgeDI9JzcnIHkyPScxMCcgc3Ryb2tlPScjZmFmYWZhJyBzdHJva2Utd2lkdGg9JzInLz4KCQk8bGluZSB4MT0nLTInIHkxPSc2JyB4Mj0nNycgeTI9JzE1JyBzdHJva2U9JyNmYWZhZmEnIHN0cm9rZS13aWR0aD0nMicvPgoJCTxsaW5lIHgxPSctMicgeTE9Jy00JyB4Mj0nNycgeTI9JzUnIHN0cm9rZT0nI2ZhZmFmYScgc3Ryb2tlLXdpZHRoPScyJy8+CgkJPGxpbmUgeDE9JzcnIHkxPScxJyB4Mj0nLTInIHkyPScxMCcgc3Ryb2tlPScjZjVmNWY1JyBzdHJva2Utd2lkdGg9JzInLz4KCQk8bGluZSB4MT0nNycgeTE9JzYnIHgyPSctMicgeTI9JzE1JyBzdHJva2U9JyNmNWY1ZjUnIHN0cm9rZS13aWR0aD0nMicvPgoJCTxsaW5lIHgxPSc3JyB5MT0nLTQnIHgyPSctMicgeTI9JzUnIHN0cm9rZT0nI2Y1ZjVmNScgc3Ryb2tlLXdpZHRoPScyJy8+Cgk8L3BhdHRlcm4+IAoJPGZpbHRlciBpZD0nZnV6eicgeD0nMCcgeT0nMCc+CgkJPGZlVHVyYnVsZW5jZSB0eXBlPSd0dXJidWxlbmNlJyByZXN1bHQ9J3QnIGJhc2VGcmVxdWVuY3k9Jy4yIC4xJyBudW1PY3RhdmVzPScyJyBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+CgkJPGZlQ29sb3JNYXRyaXggdHlwZT0nc2F0dXJhdGUnIGluPSd0JyB2YWx1ZXM9JzAuNCcvPgoJCTxmZUNvbnZvbHZlTWF0cml4IG9yZGVyPSczLDMnIGtlcm5lbE1hdHJpeD0nMCwtLjI1LDAsLS4yNSwyLC0uMjUsMCwtLjI1LDAnLz4KCTwvZmlsdGVyPgo8L2RlZnM+CjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J3VybCgjYmx1ZXN0cmlwZSknLz4KPHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsdGVyPSd1cmwoI2Z1enopJyBvcGFjaXR5PScwLjA2Jy8+Cjwvc3ZnPg==")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
}));

const Home = props => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(props.ServerURL + "recipes/get-all")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRecipes(data);
        console.log(recipes);
      });
  }, [setRecipes]);

  const classes = useStyles();
  const page = "Home";
  return (
    <div className={classes.root}>
      <RecipesArray
        ServerURL={props.ServerURL}
        recipes={recipes}
        page={page}
        displayLike={false}
        displayDelete={false}
      />
    </div>
  );
};

export default Home;
