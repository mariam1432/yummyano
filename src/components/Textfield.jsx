import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
const StyledInput = styled.div`
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  label {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 3px;

    display: ${(props) => (props.label ? "block" : "none")};
  }

  textarea {
    font-family: "Courier Prime", monospace;
    // height: 100%;
    width: 100%;
    outline: none;
    border: none;
    padding: 0 5px;
    background: none;
    border: 1px solid #555;
    border-radius: 12px;
    padding: 0 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background: #efefef;
    padding: 10px;
    margin-bottom: ${(props) => (props.errorMessage ? "5px" : 0)};
  }
  #input_container {
    margin-bottom: ${(props) => (props.errorMessage ? "5px" : 0)};
    background: #efefef;
    height: ${(props) =>
      props.size === "lg" ? "40px" : props.size === "md" ? "34px" : "28px"};

    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #555;
    border-radius: 12px;
    padding: 0 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    input {
      font-family: "Courier Prime", monospace;
      height: 100%;
      width: 100%;
      outline: none;
      border: none;
      padding: 0 5px;
      background: none;
    }
    #icon_content {
      display: ${(props) => (props.withicon ? "block" : "none")};
    }
  }
`;

function Textfield({
  label = undefined,
  withicon = false,
  placeholder,
  size = "md",
  multiline = false,
  name,
  id,
  type,
  onChange,
  errorMessage,
  value,
  onBlur,
  handleKeyDown,
}) {
  return (
    <StyledInput
      label={label}
      withicon={withicon}
      size={size}
      errorMessage={errorMessage}
    >
      <label id={name}>{label}</label>
      {multiline ? (
        <textarea
          name={name}
          id={id}
          onChange={onChange}
          rows={multiline}
          placeholder={placeholder}
          value={value}
        >
          {value}
        </textarea>
      ) : (
        <div id="input_container">
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
          />
          <div id="icon_content">
            <i className="ri-search-line" />
          </div>
        </div>
      )}
      {errorMessage ? (
        <Typography color="red" variant="smbody">
          {errorMessage}
        </Typography>
      ) : (
        <></>
      )}
    </StyledInput>
  );
}

export default Textfield;
