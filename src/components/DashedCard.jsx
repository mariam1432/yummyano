import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
const StyledCard = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  height: auto;
  max-height: 40vh;
  // height: ${(props) => (props.size === "sm" ? "180px" : "250px")};
  background: #fdf5e6;
  text-align: center;
  padding: 10px;
  border-radius: 20px;

  #card-content {
    overflow: hidden;

    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 14px;
    height: 100%;
    width: 100%;
    padding: 16px 20px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='14' ry='14' stroke='black' stroke-width='6' stroke-dasharray='23%2c 14' stroke-dashoffset='2' stroke-linecap='square'/%3e%3c/svg%3e");
    img {
      border-radius: 10px;

      height: 60%;
      width: 100%;
      object-fit: cover;
    }
    .truncate {
      display: -webkit-box;
      -webkit-line-clamp: 2; /* Number of lines to show before adding ellipsis */
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 0;
    }
  }
`;
const DashedCard = ({
  imgUrl,
  title,
  body,
  size,
  truncate,
  bodySize,
  onClick,
}) => {
  return (
    <StyledCard size={size} onClick={onClick}>
      <div id="card-content">
        <img src={imgUrl} />
        <Typography
          variant={bodySize === "lg" ? "h2" : "h3"}
          fontface="goth"
          gutterbottom={size !== "sm"}
        >
          {title}
        </Typography>
        <Typography
          className={truncate && "truncate"}
          variant={bodySize === "lg" ? "body" : "card"}
        >
          {body}
        </Typography>
      </div>
    </StyledCard>
  );
};
export default DashedCard;
