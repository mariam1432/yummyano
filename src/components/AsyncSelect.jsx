import React, { useState } from "react";
import styled from "styled-components";
import Textfield from "./Textfield";
import { dummyData as options } from "../data/tableData";
import Typography from "./Typography";
const StyledSelect = styled.div`
  ul {
    padding: 0px;
    border: 1px solid grey;
    border-radius: 5px;
    background-color: #fff;
    margin-bottom: 16px;
    margin-top: 2px;
    max-height: 100px;
    overflow-y: auto;
  }
  li {
    padding: 4px;
    cursor: pointer;
    &:hover {
      background-color: #f3f3f3;
    }
  }
  .selected-options {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  .tab {
    display: flex;
    justify-content: start-between;
    align-items: center;
    padding: 2px 6px;
    border-radius: 5px;
    background: #c72c4157;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    cursor: pointer;
    &:hover {
      color: #eaeaea;
      background-color: rgba(253, 1, 35, 0.47);
    }
  }
  .tab button {
    cursor: pointer;
    border: none;
    background: none;
    font-weight: bold;
  }
`;

const AsyncSelect = ({ selectedOptions, list, handleSelect }) => {
  //   const handleSelect = (option) => {
  //     console.log(option);
  //   };
  //   const [selectedOptions, setSelectedOptions] = useState(options);
  return (
    <StyledSelect>
      <Textfield placeholder={"Search"} label={"Categories"} />
      {list && list.length > 0 ? (
        <ul>
          {list.map((option) => (
            <li onClick={() => handleSelect(option)}>{option.title}</li>
          ))}
        </ul>
      ) : (
        <Typography>No options available</Typography>
      )}
      {selectedOptions && selectedOptions.length > 0 && (
        <div className="selected-options">
          {selectedOptions.map((option) => (
            <div className="tab">
              <span>{option.title}</span>
              <button>
                <i className="ri-close-line"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </StyledSelect>
  );
};

export default AsyncSelect;
