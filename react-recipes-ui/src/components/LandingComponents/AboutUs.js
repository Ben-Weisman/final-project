import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardHeader, Collapse } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    background: "rgba(0,0,0,0.5)",
    margin: "20px"
  },
  media: {
    height: 440
  },
  title: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#C64A2F"
  },
  desc: {
    fontFamily: "Nunito",
    fontSize: "4.5rem",
    color: "#ddd"
  }
});

const AboutUs = ({ checked }) => {
  const classes = useStyles();
  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Card className={classes.root}>
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          className={classes.title}
        >
          The home for all your recipes
        </Typography>

        <CardMedia className={classes.media} />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            Save your favorite recipes in one place. Import just the recipe from
            any website without the distractions or clutter
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
};
export default AboutUs;
