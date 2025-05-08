import React, { useRef, useEffect, useContext, useState } from "react";
import { Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

//image import
import free from "../../assets/images/free.png";
import avatar from "../../assets/images/avatar.jpg";
import account from "../../assets/images/account.png";
import arrow from "../../assets/images/arrows.png";
import logoutImg from "../../assets/images/logout.png";
import dashboardImg from "../../assets/images/dashboard.png";
import downArrowImg from "../../assets/images/down-arrow.png";
import "./header.css";

//auth
import { AuthContext } from "./../../context/AuthContext";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/rents",
    display: "Rents",
  },
];


// for click outside to close
let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};


const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = async () => {
    try {
      // Clear cookie from the server
      await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST", // Or "GET", depending on your backend
        credentials: "include", // Important: include cookies
      });

      // Remove token from localStorage
    localStorage.removeItem("token");
  
      // Clear context and navigate
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  //for outside click to disable
  let domNode = useClickOutside(() => {
    setShowMenu(false);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header" ref={headerRef}>
      <div ref={domNode} >
        <div className="nav__wrapper d-flex align-items-center justify-content-center">
          {/* ------------ logo ----------- */}
          <div className="nav__logo">
            {/* <img src={logo} alt="" /> */}
            <h2 className="logo-name logo-f-color align-items-center">Rent</h2>
            <h2 className="logo-name logo-b-color align-items-center">
              Dhundo
            </h2>
          </div>
          {/* XXXXXXXXX logo end XXXXXXXXX */}

          {/* ------------ menu ----------- */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "active__link" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* XXXXXXXXX menu end XXXXXXXXX */}

          <div className="nav__right d-flex align-items-center gap-4">
            <div className="nav__btns d-flex align-items-center">
              <div className="rent-property__container">
                <Button className="rent-property__btn d-flex">
                  <Link to="/rent-property">Rent Property</Link>
                  <img src={free} alt="" />
                </Button>
              </div>
              {user ? (
                <>

                  <div className="dropdown">
                    <div className="drop-down-btn" onClick={handleMenu}>
                      <img
                        src={avatar}
                        alt="profile-img"
                        className="user-pic"
                      />
                      <h5>{user.username}</h5>
                      <img
                        src={downArrowImg}
                        alt="profile-img"
                        className="down-arrow"
                      />
                    </div>
                    <div
                      className="sub-menu-wrap"
                      style={{ display: showMenu ? "block" : "none" }}
                    >
                      <div className="sub-menu">
                        <div className="user-info">
                          <h4>{user.username}</h4>
                        </div>
                        <hr />

                        <Link to="/profile" className="sub-menu-link">
                          <img src={account} alt="acc-img" />
                          <p>Profile</p>
                          <img className="arrow" src={arrow} alt="go-img" />
                        </Link>
                        <Link to="/dashboard" className="sub-menu-link">
                          <img src={dashboardImg} alt="db-img" />
                          <p>DashBoard</p>
                          <img className="arrow" src={arrow} alt="go-img" />
                        </Link>
                        <Link className="sub-menu-link" onClick={logout}>
                          <img src={logoutImg} alt="logout-img" />
                          <p>Logout</p>
                          <img className="arrow" src={arrow} alt="go-img" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Button className="btn secondary__btn">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="btn primary__btn">
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
