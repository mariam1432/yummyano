import React from "react";
import styled from "styled-components";

const StyledLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "wait")};

  .spinner {
    width: ${({ size }) => size || "32px"};
    height: ${({ size }) => size || "32px"};
    border: 4px solid;
    border-color: #c2185b transparent #e0568f transparent;
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

function Loader({ size, disabled = false }) {
  return (
    <StyledLoader className="loader-container" size={size} disabled={disabled}>
      <div className="spinner" />
    </StyledLoader>
  );
}

export default Loader;
