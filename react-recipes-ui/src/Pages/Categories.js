import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import RecipesArray from "../components/Recipes/RecipesArray";
import {server} from "./../constants"




const images = [
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/vegetarian_shepherds_pie_18177_16x9.jpg',
    title: 'Vegetarian',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/lentil_and_chickpea_31510_16x9.jpg',
    title: 'Vegan',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/banana_pancakes_62919_16x9.jpg',
    title: 'Breakfast',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/salmon_curry_and_chips_43767_16x9.jpg',
    title: 'Lunch',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/lighter_chicken_pasta_23131_16x9.jpg',
    title: 'Dinner',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/christmas_martini_77981_16x9.jpg',
    title: 'Beverages',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/puff_pastry_pizza_bites_98325_16x9.jpg',
    title: 'Appetizers',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/mulligatawny_soup_68949_16x9.jpg',
    title: 'Soups',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/mixed_bean_salad_89055_16x9.jpg',
    title: 'Salads',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/cheese_and_garlic_92965_16x9.jpg',
    title: 'Breads',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/tiramisu_cake_13686_16x9.jpg',
    title: 'Sweet',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/onigiri_39079_16x9.jpg',
    title: 'Assian',
    width: '33%',
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/microwave_arrabiata_76939_16x9.jpg',
    title: 'Italian',
    width: '33%',  
  },
  {
    url: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/pan-roast_lime_feta_and_27230_16x9.jpg',
    title: 'Mexican',
    width: '33%',
  },
  {
    url: 'https://www.familyfoodonthetable.com/wp-content/uploads/2018/03/Quick-chicken-recipes-category-collage.png',
    title: 'Other',
    width: '33%',
  }
  
  
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '90% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 2,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));



export default function Categories() {
    const[recipes, setRecipes] = useState([]);
    const[showAll, setShowAll] = useState(true);
    const[showCategory, setShowCategory] = useState(false);

    async function openCategory(category){
        var categoryArr=[category];
        const response = await fetch("http://"+server+":3000/api/v1/search/category",{
            method: "POST",
            headers: {
              'Content-type': 'application/json', 'Accept': 'application/json'
            },
            body: JSON.stringify({"categories":categoryArr})
          })
          .then(res => res.json())
          .then(data => {
             setRecipes(data);  
          });
          setShowAll(false);
          setShowCategory(true);
    
    }
  return (
    <Grid>
    {showAll && <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%'}}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          onClick={()=>openCategory(image.title)}
          style={{
            width: image.width,
            mx:2
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}

    </Box>}
    {!showAll &&
    <Container alignItems="center">
         <Button variant="contained" color="secondary" onClick={()=> {setShowAll(true); setShowCategory(false)}}>Back to categories page</Button>
    </Container>}
    {showCategory && <RecipesArray recipes={recipes} ServerURL={"http://"+server+":3000/api/v1/"}/>}

    </Grid>
  );
}
