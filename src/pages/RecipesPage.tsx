import React, { useState } from "react";
import styled from "styled-components";
import { Textfield, Button, DashedCard, Typography, Tag } from "../components";
import { categories } from "../data/Categories";
import { useNavigate } from "react-router-dom";
import { useRecipesQuery } from "../services/recipesApi";
import defaultImg from "../assets/defaultFoodImage.jpg";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  .center-column {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-items: center;
    #view-more {
      cursor: pointer !important;
      &:hover {
        color: #000;
      }
    }
  }
  #search-sec {
    width: 50%;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
  }
  #recipes {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 10px;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 767px) {
    #recipes {
      grid-template-columns: auto auto;
    }
    #search-sec {
      width: 100%;
    }
  }
  @media only screen and (max-width: 500px) {
    #recipes {
      width: 100%;
      grid-template-columns: auto;
    }
    #search-sec {
      width: 100%;
    }
  }
`;
function RecipesPage() {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(true);
  const { data = [], isLoading, isFetching } = useRecipesQuery();
  const newData = data.map((recipe) => ({
    ...recipe,
    authorName: recipe?.author?.name || "Unknown",
    createdAt: new Date(recipe.createdAt).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }),
  }));
  return (
    <Container className="padding-container">
      <div className="center-column">
        <Typography variant="h1" fontface="goth">
          Recipes
        </Typography>
        <Typography>
          Explore a world of culinary inspiration at Yummyano! Immerse yourself
          in a delightful journey of discovering daily recipes, talented chefs,
          engaging videos, and step-by-step how-tos tailored to your taste and
          influenced by the food preferences of your friends. Join us and
          elevate your everyday cooking experience!
        </Typography>
      </div>
      <div className="categories">
        {categories
          .slice(0, showMore ? 10 : categories.length)
          .map(({ id, text }) => (
            <Tag id={id} tag={text} onClick={() => console.log(text)} />
          ))}
        <Typography
          id="view-more"
          color="#556B2F"
          fontweight="bold"
          variant="card"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "View More" : "Show Less"}
        </Typography>
      </div>
      <div id="search-sec">
        <Textfield
          placeholder={"Search Recipes, categories or ingredients"}
          withicon
          size="md"
        />
        <Button size="md">Enter</Button>
      </div>
      <div id="recipes">
        {data.map((recipe) => (
          <DashedCard
            bodySize="sm"
            imgUrl={recipe?.imgUrl || defaultImg}
            title={recipe?.title}
            onClick={() => navigate(`/recipe/${recipe?._id}`)}
            body={recipe?.description}
          />
        ))}
      </div>
    </Container>
  );
}

export default RecipesPage;
