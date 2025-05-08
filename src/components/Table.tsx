import React, { useState } from "react";
import styled from "styled-components";
import { Button, Textfield } from "../components";
import { useSearchParams } from "react-router-dom";

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  overflow-x: auto;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #daa588;
  border: 1px solid #555;
`;

const TableRow = styled.tr`
  text-align: ${(props) => props.align};
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  a {
    cursor: pointer;
    &:hover {
      color: #555;
    }
  }
`;

const TableCell = styled.td`
  padding: 5px;
  border: 1px solid #555;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Table = ({
  columns,
  data,
  handleAction,
  pagination,
  isSearchable = true,
  isPaginated = true,
}) => {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const { currentPage = 1, totalPages = 1, limit = 10 } = pagination || {}; // Ensure pagination exists
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [rowLimit, setRowLimit] = useState(limit);
  const handlePagination = (newPage) => {
    handleAction("paginate", { page: newPage, limit: rowLimit });
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    setRowLimit(newLimit);
    handleAction("paginate", { page: 1, limit: newLimit }); // Ensure first page reset
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAction("search", localSearch);
    }
  };

  return (
    <>
      {isSearchable ? (
        <>
          {" "}
          <SearchField>
            <Textfield
              placeholder={"Search"}
              type={"text"}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              handleKeyDown={handleKeyDown}
            />
            <Button onClick={() => handleAction("search", localSearch)}>
              Search
            </Button>
          </SearchField>
          <br />
        </>
      ) : (
        <></>
      )}

      <TableWrapper>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <TableHeader key={index}>{column.title}</TableHeader>
            ))}
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column.value]}</TableCell>
              ))}
              <TableCell align="center">
                <a onClick={() => handleAction("edit", row)}>
                  <i className="ri-edit-fill"></i>
                </a>
                <a onClick={() => handleAction("delete", row)}>
                  <i className="ri-delete-bin-6-fill"></i>
                </a>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableWrapper>

      {/* Pagination */}
      {isPaginated ? (
        <PaginationControls>
          <div>
            <label>Rows per page: </label>
            <select value={rowLimit} onChange={handleLimitChange}>
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
            </select>
          </div>
          <Button
            onClick={() => handlePagination(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePagination(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </PaginationControls>
      ) : (
        <></>
      )}
    </>
  );
};

export default Table;
