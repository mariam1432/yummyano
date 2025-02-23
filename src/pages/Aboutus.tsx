import React from "react";
import styled from "styled-components";
import { TeamCard, Typography } from "../components";
import about from "../assets/aboutusImg.png";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  #content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 700px;
    gap: 10px;
    .about {
      width: 200px;
      height: 200px;
      object-fit: contain;
    }
  }
  @media only screen and (max-width: 600px) {
    #content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 10px;
      .about {
        width: 100%;
        max-height: 200px;
      }
    }
  }
`;
function Aboutus() {
  return (
    <Container className="padding-container">
      <div id="content">
        <img src={about} className="about" />
        <Typography variant="h1" fontface="goth">
          About Yummyano
        </Typography>
        <div className="para">
          <Typography
            variant="h3"
            fontWeight="bold"
            fontface="cursive"
            gutterbottom
          >
            Who are we
          </Typography>
          <Typography>
            Welcome to Yummyano, where culinary passion meets digital delight!
            We are a team of food enthusiasts dedicated to bringing you the most
            delectable recipes from around the world. Our mission is to inspire
            your inner chef and make every meal an unforgettable experience.
            Whether you're a seasoned cook or just starting in the kitchen,
            Yummyano is your go-to source for all things delicious.
          </Typography>
        </div>
        <div className="para">
          <Typography
            variant="h3"
            fontWeight="bold"
            fontface="cursive"
            gutterbottom
          >
            Our History
          </Typography>
          <Typography>
            Embark on a journey through the flavorful chapters of Yummyano's
            history. Founded with a love for sharing culinary wonders, our story
            is a blend of creativity, innovation, and a deep appreciation for
            the art of cooking. From humble beginnings to a thriving online
            community, Yummyano has evolved into a culinary haven where food
            lovers unite to explore, learn, and savor the joy of cooking.
          </Typography>
        </div>
        <div className="para">
          <Typography
            variant="h3"
            fontWeight="bold"
            fontface="cursive"
            gutterbottom
          >
            Work With Us
          </Typography>
          <Typography>
            Are you as passionate about food as we are? Yummyano invites
            like-minded individuals and partners to join us on this culinary
            adventure. Whether you're a talented chef, a skilled photographer,
            or a food blogger looking for collaboration, we welcome you to
            explore exciting opportunities with Yummyano. Let's create,
            innovate, and share the love of food together!
          </Typography>
        </div>
        <div className="para">
          <Typography
            variant="h3"
            fontWeight="bold"
            fontface="cursive"
            gutterbottom
          >
            Meet the Team
          </Typography>
          <Typography>
            Get to know the faces behind the flavors! Our diverse team at
            Yummyano is a passionate blend of culinary experts, food
            photographers, writers, and digital wizards. Each member brings
            their unique expertise and love for food to the table. Meet the
            individuals who make Yummyano a vibrant community dedicated to
            celebrating the joy of cooking and sharing culinary inspirations.
          </Typography>
        </div>
        {[...Array(7)].map(() => (
          <TeamCard
            name="Emma George"
            imgUrl={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww`}
            designation={"Editor"}
            description={`Emma has over 10 years of experience creating food and cooking content for both web and print and another 5 years within the print publishing industry. She joined the Simply Recipes team in 2016 as Managing Editor and is the former Recipe Editor for Kitchn. In her career, she has been an editor, a writer, a recipe developer, a photographer, and a video producer`}
          />
        ))}
      </div>
    </Container>
  );
}

export default Aboutus;
