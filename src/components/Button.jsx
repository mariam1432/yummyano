import React from "react";
import styled from "styled-components";
const StyledButton = styled.button`
  border-radius: 12px;
  font-family: "Courier Prime", monospace;
  font-size: ${(props) =>
    props.size === "lg" ? "16px" : props.size === "md" ? "14px" : "12px"};
  cursor: pointer;
  padding: ${(props) =>
    props.size === "lg"
      ? "10px 20px"
      : props.size === "md"
      ? "8px 16px"
      : "6px 12px"};
  color: ${(props) => (props.variant === "outlined" ? "#c72c41" : "#F5F5F5")};
  border: ${(props) =>
    props.variant === "outlined" ? "1px solid #c72c41" : "none"};
  outline: none;
  background: ${(props) =>
    props.variant === "outlined" ? "#F5F5F5" : "#C72C41"};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  }
`;

function Button({ size, variant, children, type, onClick, isDisabled }) {
  return (
    <StyledButton
      size={size}
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
