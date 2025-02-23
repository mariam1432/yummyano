import React from "react";
import { Loader, RecipeCard } from "../components";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useRecipeQuery } from "../services/recipesApi";
const Container = styled.div`
  padding: 40px 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
  img {
    width: 450px;
    height: 200px;
    object-fit: cover;
  }
  .content {
  }
  @media only screen and (max-width: 767px) {
    padding: 20px 0px;
  }
  @media only screen and (max-width: 500px) {
    padding: 20px 0px;
    img {
      width: 100%;
    }
  }
`;
function RecipePage() {
  const { id } = useParams();
  const { data, isLoading } = useRecipeQuery(id);
  console.log(data);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <img
            src={
              data.imgUrl ||
              "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <div id="content">
            <RecipeCard recipe={data} />
          </div>
        </Container>
      )}
    </>
  );
}

export default RecipePage;
