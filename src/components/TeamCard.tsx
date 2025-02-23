import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
const StyledCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  .cardImg {
    box-shadow: 10px 5px 5px #ffdb58;
    width: 200px;
    height: auto;
    object-fit: cover;
  }
  #info {
    display: flex;
    gap: 5px;
    flex-direction: column;
  }
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    .cardImg {
      width: 100%;
      height: 300px;
    }
  }
`;
function TeamCard({ imgUrl, name, designation, description }) {
  return (
    <StyledCard>
      <img className="cardImg" src={imgUrl} />
      <div id="info">
        <Typography fontweight="bold">{name}</Typography>
        <Typography color="#C72C41" variant="body">
          {designation}
        </Typography>
        <Typography variant="body">{description}</Typography>
      </div>
    </StyledCard>
  );
}

export default TeamCard;
