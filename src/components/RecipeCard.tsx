import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
import { convertTimeString } from "../commonUtils";
const StyledCard = styled.div`
  background: #f5cc94;
  padding: 20px;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  #head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #bf4040;
    padding-bottom: 10px;
  }

  #body {
    display: flex;
    gap: 20px;
    flex: 1;
    margin-top: 20px;

    #ingredients-sec {
      flex: 1;
      display: flex;
      flex-direction: column;

      #ingredients-container {
        border: 2px solid #555;
        padding: 10px;
        border-radius: 4px;
        flex-grow: 1;
        min-height: 100px;
        background: #fff4e1;
      }
    }

    #directions-container {
      flex: 2;
      display: flex;
      flex-direction: column;

      #directions {
        margin-top: 10px;
        padding: 10px;
        background: #fff4e1;
        border-radius: 4px;
        flex-grow: 1;
        min-height: 100px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    #head {
      flex-direction: column;
      text-align: center;
    }

    #body {
      flex-direction: column;
      gap: 10px;

      #ingredients-sec,
      #directions-container {
        width: 100%;
      }

      #ingredients-container,
      #directions {
        width: 100%;
      }
    }
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
