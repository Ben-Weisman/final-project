import styled from 'styled-components';

export const RecipeWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    background-color: rgb(250, 250, 250);
`;

export const EditButton = styled.button`
    display: inline-block;
    outline: 0;
    border: none;
    cursor: pointer;
    height: 40px;
    padding: 12px 17px;
    border-radius: 50px;
    background-color: #2222220d;
    color: #222;
    font-size: 16px;
    font-weight: 500;
    :hover {
        background-color: #2222221a;
    }
`

export const SaveButton = styled.button`
    display: inline-block;
    outline: 0;
    border: none;
    cursor: pointer;
    height: 40px;
    padding: 12px 17px;
    border-radius: 50px;
    background-color: IndianRed ;
    color: #222;
    font-size: 16px;
    font-weight: 500;
    :hover {
        background-color: LightCoral ;
    }
`

export const RecipeHeader = styled.div`
    font-family: Lora, Georgia, serif;
    font-size: 1.25rem;
    color: rgb(151, 117, 53);
    font-style: italic;
    border-bottom: 1px solid rgb(214, 209, 194);
    border-top: 1px solid rgb(214, 209, 194);
    padding: 0.25em 1.25em;
    margin-bottom: 2em;
    justify-content: center;
    align-items: center;
`;

export const RecipeItemText = styled.p`
font-size: 1rem;
`;

// export const RecipeTitle = styled.h2`
// font-size: clamp(2rem, 8vw, 5rem);
// text-align: center;
// margin-bottom: 3rem;
// font-weight: bold;
// @media only screen and (max-width:700px){
//     margin-bottom: 0;
// }
// `;

export const Wrapper = styled.section`
  /* padding: 4em;
  background: papayawhip; */

    margin: 2rem;
    background-color: rgb(250, 250, 250);
`;

export const RecipeTitle = styled.h1`
  
  font-family: Lora, Georgia, serif;
    text-transform: uppercase;
    padding-bottom: 0.25em;
    margin-bottom: 0px;
    border-bottom: 1px solid rgb(221, 227, 227);
    text-align: left;
    margin: 1.414em 0px 0.5em;
    font-weight: inherit;
    line-height: 1.2;

  
`;

export const Title = styled.h1`
  font-size: 1rem;
  color: darkgrey;
  
`;

export const Icon = styled.svg`
  flex: none;
  transition: fill 0.25s;
  width: 48px;
  height: 48px;


`;


export const Description = styled.p`
  font-family: Lora, Georgia, serif;
  font-size: 1.2rem;
  font-style: italic;
  margin: 1px auto;
  margin-bottom: 1px;
  //padding: 0.25em 1em 8px 0px;
  text-align: left;
`


export const RecipeFeature = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 650px;
height: 320px;
background-color: #fff;
box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.18);
border-radius: 40px;
transition: all .4s ease;
margin-bottom: 5rem;
cursor: pointer;
@media only screen and (min-width: 1800px){
    margin-right: 10rem;
    padding: 0;
}
&:hover{
    box-shadow: 0px 10px 80px rgba(0, 0, 0, 0.12);
    transform: scale(1.05);
    background-color: #333;
    color: #fff;
}
@media only screen and (min-width:1000px) {
    flex-direction: row;
}
@media only screen and (max-width:900px){
    margin-bottom: 10rem;
}
@media only screen and (max-width:700px){
    width: 550px;
    margin-bottom: 3rem;
    &:hover{
        transform: scale(1.02);
    }
}
@media only screen and (max-width:600px){
    width: 500px;
}
@media only screen and (max-width:500px){
    width: 380px;
    height: 300px;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.10);
}
@media only screen and (max-width:400px){
    width: 330px;
}
`;

export const RecipeCard = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 500px;
height: 130px;
background: #FFFFFF;
box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
border-radius: 20px;
transition: all .5s ease;
margin-bottom: 4rem;
cursor: pointer;
&:hover {
    background-color: #333;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.2);
}
@media only screen and (max-width:1200px) {
    width: 397px;
    margin-right: 5rem;
}
@media only screen and (max-width:1000px) {
    width: 420px;
    margin-right: 2.5rem;
}
 
@media only screen and (max-width:700px){
    width: 380px;
    &:hover {
    transform: scale(1.1);
    }
}
@media only screen and (max-width:500px){
    margin-right: 0;
    &:hover {
    transform: scale(1);
    }
}
@media only screen and (max-width:400px){
    flex-direction: column;
    width: 280px;
}
`;

export const RecipeCardImg = styled.div`
height: 10.3rem;
margin-left: -10rem;
`;

export const RecipeCardContent = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0 2rem;
`;

export const RecipeCardHeading = styled.h3`
font-size: 2.4rem;
font-weight: 400;
@media only screen and (max-width:700px){
    font-size: 2rem;
}
`;

export const RecipeCardDetails = styled.div`
display: flex;
align-items: center;
margin-top: 1.5rem;
`;

export const RecipeCardItems = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
text-align: center;
&:not(:last-child){
    margin-right: 2.5rem;
}
`;

export const RecipeCardTitle = styled.h4`
font-size: 1.4rem;
@media only screen and (max-width:700px){
    font-size: 1.2rem;
}
`;

export const RecipeCardItem = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-right: 2.5rem;
`;



export const RecipeCardText = styled.p`
font-size: 1.4rem;
@media only screen and (max-width:700px){
    font-size: 1.2rem;
}
`;