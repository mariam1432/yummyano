import React from "react";
import {
  Textfield,
  Button,
  Typography,
  DashedCard,
  Loader,
} from "../components";
import hero from "../assets/heroImg.png";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecipesQuery } from "../services/recipesApi";
import { useCategoriesQuery } from "../services/categoriesApi";
const Container = styled.div`

  #hero {
    height: 100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:10px;
    img {
        height: 60vh;
      }
      #hero-content{
        display: flex;
        align-items: center;
        justify-content:center;
        flex-direction:column;
        text-align:center;
        gap:8px;
      }
      #search-sec {
        display: flex;
        align-items: center;
        gap: 5px;
        
      }
    }
  }
  #featured{
    display:grid;
    grid-template-columns:auto auto auto;
    gap:10px;
    margin-bottom:20px;
  }
  #categories{
    display:flex;
    overflow-x:auto;
    gap:10px;
    margin-bottom:20px;

  }
  #categories::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}
@media only screen and (max-width: 950px) {
  #hero{
    
    img {
        height: 300px!important;
      }
}
}
  @media only screen and (max-width: 767px) {
    
    #hero{
        flex-direction:column;
        img {
            height: 250px!important;
          }
    }
    #featured{
        grid-template-columns:auto auto;
      }
  }
  @media only screen and (max-width: 500px) {
    #featured{
        grid-template-columns:auto;
      }
  }
`;
function LandingPage() {
  let params = {
    sort: "title",
    order: "asc",
    limit: 20, // Make dynamic based on pagination
  };
  const navigate = useNavigate();
  const { data = { recipes: [], pagination: {} }, isLoading } =
    useRecipesQuery(params);
  const {
    data: categoryData = { categories: [], pagination: {} },
    isLoading: isCategoryLoading,
  } = useCategoriesQuery(params);
  return (
    <Container className="padding-container">
      {(isLoading || isCategoryLoading) && <Loader isDisabled />}
      <div id="hero">
        <img src={hero} />
        <div id="hero-content">
          <Typography variant="h1" fontface="cursive" color="#555">
            Explore the Art of Vintage Cooking
          </Typography>
          <Typography>
            Discover timeless recipes, nostalgic kitchen
            <br /> tips, and the charm of cooking from the past.
          </Typography>
          <div id="search-sec">
            <Textfield placeholder={"Search here"} withicon size="md" />
            <Button variant={"outlined"} size="md">
              Search
            </Button>
          </div>
          <Button variant="filled" size={"lg"}>
            Explore Recipes
          </Button>
        </div>
      </div>
      <Typography variant="h3" fontface="goth" underline gutterbottom>
        Featured Recipes
      </Typography>

      <div id="featured">
        {data && data.recipes && data.recipes.length > 0 ? (
          data.recipes.map((recipe) => (
            <DashedCard
              size="sm"
              onClick={() => navigate(`/recipe/${recipe._id}`)}
              bodySize="sm"
              imgUrl={recipe.imgUrl}
              title={recipe.title}
              body={recipe.description}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <Typography variant="h3" fontface="goth" underline gutterbottom>
        Categories
      </Typography>

      <div id="categories">
        {categoryData && categoryData?.categories ? (
          categoryData.categories.map((category) => (
            <div style={{ maxWidth: "170px" }}>
              <DashedCard
                onClick={() => navigate("/recipe")}
                bodySize="sm"
                size={"sm"}
                fixedImgSize={true}
                imgUrl={category.imgUrl}
                title={category.title}
                body={
                  category?.recipeCount && category.recipeCount > 0
                    ? `${category.recipeCount} recipes`
                    : "No recipes yet"
                }
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <Typography variant="h3" fontface="goth" underline gutterbottom>
        You may also like{" "}
      </Typography>
      <div id="featured">
        {data && data.recipes && data.recipes.length > 0 ? (
          data.recipes.map((recipe) => (
            <DashedCard
              size="sm"
              onClick={() => navigate(`/recipe/${recipe._id}`)}
              bodySize="sm"
              imgUrl={recipe.imgUrl}
              title={recipe.title}
              body={recipe.description}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
}

export default LandingPage;
