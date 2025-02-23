import React from "react";
import styled from "styled-components";
import Typography from "./Typography";

const SidebarContainer = styled.aside`
  display: flex;
  background: #c72c4157;
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
  transition: width 0.3s;
  .sidebar_content {
    a {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      gap: 2px;
      color: #fff;
      margin-bottom: 5px;

      &:hover {
        background: #ffffff12;
        color: #000;
        border-radius: 0 10px 10px 0;
        div {
          color: #000;
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
    .sidebar_content {
      padding: 10px;
      a div {
        display: none;
      }
    }
  }
  @media screen and (max-width: 700px) {
    width: ${(props) => (props?.isOpen ? "fit-content" : "0")};
    min-width: ${(props) => (props?.isOpen ? "80px" : "0")};
  }
`;

const ResponsiveSidebar = ({ isOpen = true }) => {
  const menuOptions = [
    {
      id: 1,
      label: "Profile",
      path: "/admin/profile",
      icon: "ri-profile-fill", // Replace with the appropriate icon class or URL
    },
    {
      id: 2,
      label: "Add User",
      path: "/admin/add-user",
      icon: "ri-user-add-line", // Replace with the appropriate icon class or URL
    },
    {
      id: 3,
      label: "Manage Users",
      path: "/admin/manage-users",
      icon: "ri-user-line", // Replace with the appropriate icon class or URL
    },
    {
      id: 4,
      label: "Add Recipe",
      path: "/admin/add-recipe",
      icon: "ri-file-paper-2-fill", // Replace with the appropriate icon class or URL
    },
    {
      id: 5,
      label: "Manage Recipes",
      path: "/admin/manage-recipes",
      icon: "ri-list-check", // Replace with the appropriate icon class or URL
    },

    {
      id: 6,
      label: "Add Category",
      path: "/admin/add-category",
      icon: "ri-folder-add-fill", // Replace with the appropriate icon class or URL
    },
    {
      id: 7,
      label: "Manage Categories",
      path: "/admin/manage-categories",
      icon: "ri-folder-fill", // Replace with the appropriate icon class or URL
    },
  ];

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <div className="sidebar_content">
          {menuOptions.map((menu) => (
            <a key={menu.id} href={menu.path}>
              <i className={menu.icon}></i>
              <Typography variant="smbody" color="#fff">
                {menu.label}
              </Typography>
            </a>
          ))}
        </div>
      </SidebarContainer>
    </>
  );
};

export default ResponsiveSidebar;
