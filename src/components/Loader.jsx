import React from "react";
import styled from "styled-components";
const StyledLoader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
  cursor: not-allowed;

  .spinner {
    width: 32px;
    height: 32px;
    border: 4px solid;
    border-color: #C2185B transparent #E0568F transparent;
    border-radius: 50%;
    animation: spin-anim 1.2s linear infinite;
  }

  @keyframes spin-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Loader({ size, isDisabled }) {
  return (
    <StyledLoader
      className="loader-container"
      size={size}
      disabled={isDisabled}
    >
      <div className="spinner" />
    </StyledLoader>
  );
}

export default Loader;
