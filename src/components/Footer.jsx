import React from "react";
import styled from "styled-components";
import Textfield from "./Textfield";
import Button from "./Button";
import Typography from "./Typography";
const StyledFooter = styled.footer`
  width: 100%;
  background-color: #daa588;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-around;
  padding: 20px;
  margin-top: auto; /* Pushes footer to bottom */

  #subscribe {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .sec {
    display: flex;
    align-items: start;
    gap: 10px;
    flex-direction: column;
  }
  @media only screen and (max-width: 767px) {
    grid-template-columns: auto;
    gap: 10px;
  }
  a {
    cursor: pointer;
    &:hover {
      color: #c72c41;
      border-bottom: 2px solid #ffdb58;
    }
  }
`;
function Footer() {
  return (
    <StyledFooter>
      <div className="sec">
        <Typography fontface="goth" fontWeight="bold" underline>
          Yummyano
        </Typography>
        <div id="subscribe">
          <Textfield placeholder={"Enter your email"} />
          <Button>Send</Button>
        </div>
      </div>
      <div className="sec">
        <a>
          <Typography variant="card" fontWeight={700}>
            Trending Recipes
          </Typography>
        </a>
        <a>
          <Typography variant="card" fontWeight={700}>
            Tips and Tricks
          </Typography>
        </a>
        <a>
          <Typography variant="card" fontWeight={700}>
            Contact us
          </Typography>
        </a>
      </div>
      <div className="sec">
        <a>
          <Typography variant="card" fontWeight={700}>
            Submit your recipes
          </Typography>
        </a>
        <a>
          <Typography variant="card" fontWeight={700}>
            About us
          </Typography>
        </a>
      </div>
    </StyledFooter>
  );
}

export default Footer;
