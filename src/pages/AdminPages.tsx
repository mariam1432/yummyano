import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";

import AddRecipe from "./AdminPages/AddRecipe";
import ManageUsers from "./AdminPages/ManageUsers";
import AddUser from "./AdminPages/AddUser";
import ManageRecipes from "./AdminPages/ManageRecipes";
import Page404 from "./Page404";
import ManageCategories from "./AdminPages/ManageCategories";
import AddCategory from "./AdminPages/AddCategory";
import Profile from "./AdminPages/Profile";
import { Sidebar } from "../components";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  position: relative;
  .sidebar__toggle {
    display: none;
  }
  #table-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
  }
  @media screen and (max-width: 700px) {
    #table-container {
      display: flex;
      flex-direction: column;
      width: ${(props) => (props.isOpen ? `calc(100% - 80px)` : "100%")};
    }
    .sidebar__toggle {
      color: #fff;
      background: #555;
      display: inline-block;

      position: fixed;
      right: 0;
      z-index: 1;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50% 0 0 50%;
      bottom: 4rem;
      font-size: 1.3rem;
      cursor: pointer;
      box-shadow: 1rem 0 2rem rgba(0, 0, 0, 0.4);
      @media screen and (max-width: 700px) {
        display: block;
      }
    }
  }
`;

const Admin = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    // Only send the verification request when the component mounts
    axios.defaults.withCredentials = true;

    axios.get("http://localhost:3000/auth/verify").then((res) => {
      if (!res.data.status) {
        // Redirect to login page if user is not authenticated
        navigate("/login");
      }
    });
  }, [navigate]); // Ensure useEffect runs only once on component mount

  return (
    <Wrapper isOpen={isOpen}>
      <Sidebar isOpen={isOpen} />
      <button className="sidebar__toggle" onClick={toggleSidebar}>
        <i className={`ri-arrow-${isOpen ? "left" : "right"}-s-line`} />
      </button>
      <div id="table-container">
        <Routes>
          <Route path="/" element={<ManageUsers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-categories" element={<ManageCategories />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/edit-recipe/:id" element={<AddRecipe />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/edit-category/:id" element={<AddCategory />} />

          <Route path="/manage-recipes" element={<ManageRecipes />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<AddUser />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </Wrapper>
  );
};

export default Admin;
