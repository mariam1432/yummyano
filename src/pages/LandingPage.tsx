import React from "react";
import { Textfield, Button, Typography, DashedCard } from "../components";
import hero from "../assets/heroImg.png";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <Container className="padding-container">
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
        {[...Array(10)].map(() => (
          <DashedCard
            onClick={() => navigate("/recipe")}
            bodySize="sm"
            imgUrl={
              "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            title="Raspberry Cupcakes"
            body={`A perfectly soft, classic vanilla cake recipe made entirely from scratch. It's so simple to make and tastes much better than a box mix!`}
          />
        ))}
      </div>
      <Typography variant="h3" fontface="goth" underline gutterbottom>
        Categories{" "}
      </Typography>

      <div id="categories">
        {[...Array(10)].map(() => (
          <div style={{ maxWidth: "170px" }}>
            <DashedCard
              onClick={() => navigate("/recipe")}
              bodySize="sm"
              size={"sm"}
              imgUrl={
                "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              title="Rice"
              body={`50 recipes`}
            />
          </div>
        ))}
      </div>
      <Typography variant="h3" fontface="goth" underline gutterbottom>
        You may also like{" "}
      </Typography>
      <div id="featured">
        {[...Array(6)].map(() => (
          <DashedCard
            bodySize="sm"
            imgUrl={
              "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            title="Raspberry Cupcakes"
            body={`A perfectly soft, classic vanilla cake recipe made entirely from scratch. It's so simple to make and tastes much better than a box mix!`}
          />
        ))}
      </div>
      {/* <Textfield
        label={"Name"}
        withicon
        placeholder="Enter your name"
        size="sm"
      />
      <Textfield label={"Name"} placeholder="Enter your name" size="md" />
      <Textfield
        label={"Name"}
        withicon
        placeholder="Enter your name"
        size="lg"
      />

      <Button variant="filled" size="sm">
        Explore More
      </Button>
      <Button variant="outlined" size="md">
        Explore More
      </Button>
      <Button variant="outlined" size="lg">
        Explore More
      </Button>
      <Typography variant="h1" fontface="goth" color="purple" underline>
        Featured Recipes
      </Typography>
      <Typography fontface="cursive" variant="h2">
        Featured Recipes
      </Typography>
      <Typography variant="h3" fontface="typewritter" fontweight={700}>
        Featured Recipes
      </Typography>
      <Typography variant="h4">Featured Recipes</Typography>
      <Typography variant="body">Featured Recipes</Typography>
      <div>
        <DashedCard
          bodySize="lg"
          imgUrl={
            "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          title="Raspberry Cupcakes"
          body={`A perfectly soft, classic vanilla cake recipe made entirely from scratch. It's so simple to make and tastes much better than a box mix!`}
        />
      </div>
      <DashedCard
        size="sm"
        imgUrl={
          "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        title="Rice"
        body={`500+ recipes`}
        bodySize={"lg"}
      /> */}
    </Container>
  );
}

export default LandingPage;
