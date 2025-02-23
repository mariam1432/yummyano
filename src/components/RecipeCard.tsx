import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
import { convertTimeString } from "../commonUtils";
const StyledCard = styled.div`
  background: #f5cc94;
  padding: 10px 0px;
  //   height: 80vh;
  #head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 2px solid #bf4040;
  }
  #body {
    // max-height:90%;

    padding: 15px 20px;
    display: flex;
    gap: 10px;
    // align-items: center;
    // justify-content: space-between;
    #ingredients-container,
    #directions {
      //    max-height:90%;
      overflow-y: auto; /* Add this to enable vertical scrolling */
    }
    #ingredients-sec {
        width:30%;
      #ingredients-container {
        border: 2px solid #555;
        padding: 5px 10px;
      }
    }
    #directions-container {
      width:70%;
      #directions {
        margin-left: 10px;
        padding: 2px 4px;
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
    }
  }
  @media only screen and (max-width: 767px) {
   
    #body {
      flex-direction: column;
      #ingredients-sec {
        width: 100%;
   
            #ingredients-container {
                width:100%;
              border: none;
              padding: 0;
            
          }
      }
      #directions-container {
        width:100%;
    }
  
 
`;
function RecipeCard({ recipe }) {
  return (
    <StyledCard>
      <div id="head">
        <Typography variant="h2" fontface="goth">
          Recipe by {recipe?.author?.name}
        </Typography>
        <Typography variant="h3" fontface="cursive">
          {recipe?.title}
        </Typography>
      </div>
      <div id="body">
        <div id="ingredients-sec">
          <Typography variant="smbody" gutterbottom>
            Serves <span>{recipe.servingPortions}</span>
          </Typography>
          <Typography variant="body" fontWeight="bold" gutterbottom>
            Ingredients
          </Typography>
          <div id="ingredients-container">
            {recipe.ingredients.map(({ ingredient, quantity, unit }) => (
              <Typography variant="sm">
                {`${quantity} ${unit} ${ingredient}`}
              </Typography>
            ))}
          </div>
        </div>
        <div id="directions-container">
          <Typography variant="sm" fontWeight="bold" gutterbottom>
            Prep time {convertTimeString(recipe?.prepTime)}
          </Typography>
          <Typography variant="body" fontWeight="bold" gutterbottom>
            Directions
          </Typography>
          <div id="directions">
            {recipe.directions.map((direction, i) => (
              <Typography variant="sm">
                {i + 1}. {direction?.step}
              </Typography>
            ))}
          </div>
        </div>
      </div>
    </StyledCard>
  );
}

export default RecipeCard;
