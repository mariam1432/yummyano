import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import styled from "styled-components";
import { components } from "react-select";

// Styled Components
const StyledSelect = styled(AsyncPaginate)`
  .react-select__control {
    min-height: 44px;
    margin-bottom: 5px;
    background: #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #555;
    border-radius: 12px;
    padding: 0 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  .react-select__menu {
    z-index: 1000;
  }
`;

const TagPill = styled.div`
  display: inline-flex;
  align-items: center;
  background: #c72c4157;
  color: #c72c5a;
  border-radius: 9999px;
  padding: 4px 12px;
  margin: 4px;
  font-size: 14px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #c72c5a;
  cursor: pointer;
  margin-left: 8px;
  padding: 0;
`;

const LoadMoreButton = styled.div`
  padding: 8px;
  text-align: center;
  cursor: pointer;
  background: #f5f5f5;
  &:hover {
    background: #e0e0e0;
  }
`;

const MenuList = (props) => {
  const { children, selectProps } = props;
  const { isLoading, hasMore, loadMore } = selectProps;

  return (
    <components.MenuList {...props}>
      {children}
      {hasMore && (
        <LoadMoreButton onClick={() => !isLoading && loadMore()}>
          {isLoading ? "Loading..." : "Load More..."}
        </LoadMoreButton>
      )}
    </components.MenuList>
  );
};

const AsyncSelectWithLoadMore = ({
  selectedOptions,
  onChange,
  loadOptions,
  placeholder = "Select...",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [additional, setAdditional] = useState({ page: 1 });
  const [allOptions, setAllOptions] = useState([]);

  const handleLoadMore = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const result = await loadOptions("", allOptions, additional);
      setHasMore(result.hasMore);
      setAdditional({ page: additional.page + 1 });

      // Update all options
      const newOptions = [...allOptions, ...result.options];
      setAllOptions(newOptions);

      // Return ALL options, not just the new ones
      return {
        options: newOptions,
        hasMore: result.hasMore,
        additional: { page: additional.page + 1 },
      };
    } finally {
      setIsLoading(false);
    }
  };

  const wrappedLoadOptions = async (search, prevOptions, { page }) => {
    setIsLoading(true);
    try {
      console.log("wrapped");
      const result = await loadOptions(search, prevOptions, { page });
      setHasMore(result.hasMore);
      setAdditional({ page: page + 1 });

      // For initial load, set all options
      if (page === 1) {
        setAllOptions(result.options);
      }

      // Return ALL options for initial load
      return page === 1
        ? {
            options: result.options,
            hasMore: result.hasMore,
            additional: { page: page + 1 },
          }
        : result;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = (value) => {
    onChange(selectedOptions.filter((opt) => opt.value !== value));
  };

  return (
    <div>
      <StyledSelect
        isMulti
        classNamePrefix="react-select"
        value={selectedOptions}
        onChange={onChange}
        loadOptions={wrappedLoadOptions}
        additional={additional}
        debounceTimeout={500}
        components={{
          MenuList: (props) => (
            <MenuList
              {...props}
              selectProps={{
                ...props.selectProps,
                isLoading,
                hasMore,
                loadMore: handleLoadMore,
              }}
            />
          ),
          LoadingIndicator: () => null,
        }}
        placeholder={placeholder}
        hideSelectedOptions={true}
      />

      {/* Selected tags display */}
      <div style={{ marginTop: "8px" }}>
        {selectedOptions.map((option) => (
          <TagPill key={option.value}>
            {option.label}
            <DeleteButton onClick={() => handleRemove(option.value)}>
              ×
            </DeleteButton>
          </TagPill>
        ))}
      </div>
    </div>
  );
};

export default AsyncSelectWithLoadMore;
