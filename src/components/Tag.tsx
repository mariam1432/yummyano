import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
const StyledTag = styled.a`
  width: fit-content;
  padding: 4px 8px;
  background-color: #fdf5e6;
  border-radius: 14px;
  cursor: pointer !important;
  transition: ease in 300ms;
  &:hover {
    // border: 2px solid yellow;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
function Tags({ id, tag }) {
  return (
    <StyledTag id={id}>
      <Typography fontWeight="bold" variant="card">
        {tag}
      </Typography>
    </StyledTag>
  );
}

export default Tags;
