import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useLazyLogoutQuery } from "../services/authApi";
const StyledNav = styled.nav`
  padding: 0px 64px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid #222;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    #close {
      font-size: 28px;
      display: none;
      align-self: flex-end;
    }
  }

  li img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 1px solid #f2f2f2;
  }
  li {
    a {
      font-size: 14px;
      color: #555555;
      word-spacing: -3.5px;
      font-weight: 600;
      &:hover {
        border-bottom: 2px solid #ffdb58;
        color: #c72c41;
      }
    }
  }

  #avatar_sec {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
  }
  #logo {
    color: #000;
    font-family: "Grenze Gotisch", serif;
    font-weight: 700;
    font-size: 16px;
  }
  i {
    display: none;
    cursor: pointer;
  }
  #logout {
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid #000;
    padding: 10px 20px;
    border-radius: 12px;
    color: #000;
    i {
      display: block;
    }
    &:hover {
      color: #fefe;
    }
  }
  /* Mobile (Small Screens) */
  @media only screen and (max-width: 780px) {
    padding: 0px 12px;

    ul {
      display: ${(props) => (props.openMenu ? "flex" : "none")};
      flex-direction: column;
      align-items: center;
      justify-content: start;
      position: fixed;
      overflow-y: scroll;
      top: -20px;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #c72c41;
      padding: 30px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      z-index: 9;
      overflow: hidden;
      #close {
        display: block;
      }
      li {
        a {
          font-size: 18px;
          color: #000;

          &:hover {
            color: #000;
          }
        }
      }
    }

    li {
      margin-top: 10px;
    }

    i {
      display: block;
    }
  }
`;

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const handleOverlay = () => {
    setOpenMenu(!openMenu);
  };
  let token = Cookie.get("token");
  const [logout] = useLazyLogoutQuery();

  const handleLogout = () => {
    logout().then((res) => {
      if (res) {
        localStorage.clear();
        navigate("/login");
        setOpenMenu(false);
      }
    });
  };
  return (
    <StyledNav openMenu={openMenu}>
      <Link to="/" id="logo">
        Yummyano
      </Link>

      <ul>
        <i
          id="close"
          className="ri-close-circle-line"
          onClick={handleOverlay}
        ></i>
        <li>
          <Link to="/admin" onClick={() => setOpenMenu(false)}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/recipes" onClick={() => setOpenMenu(false)}>
            Discover Recipes
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setOpenMenu(false)}>
            Meet Team
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setOpenMenu(false)}>
            Contact us
          </Link>
        </li>

        {token ? (
          <Link id="logout" onClick={handleLogout}>
            Logout <i className="ri-logout-circle-r-line"></i>
          </Link>
        ) : (
          <></>
        )}
      </ul>

      <i className="menu ri-menu-3-line" onClick={handleOverlay}></i>
    </StyledNav>
  );
}

export default Navbar;
