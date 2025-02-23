import React from "react";
import styled from "styled-components";
import { Button, Typography } from "../components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .page-content {
    width: 100%;
    height: 50vh;
    max-width: 600px;
    padding: 20px 40px;
    background-color: #fdf5e6;
    border-radius: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    flex-direction: column;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='14' ry='14' stroke='black' stroke-width='6' stroke-dasharray='23%2c 14' stroke-dashoffset='2' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;
function Page404() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="page-content">
        <Typography variant="h1" fontface="goth" fontweight="bold">
          404
        </Typography>
        <Typography variant="h3" fontface="goth" fontweight="bold">
          Oops! The page you are trying find doesn't exist.
        </Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </Container>
  );
}

export default Page404;
