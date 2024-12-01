import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../Assets/logo.png";
import cart_icon from "../../Assets/cart_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { productContext } from "../../Context/Context";
import { ProfileTemplate } from "../ProfileTemplate/ProfileTemplate";

export const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("shop");
  const [navSide, setNavSide] = useState(false);
  const { cartItemsCount, isLoggedIn } = useContext(productContext);
  const [infoCard, setInfoCard] = useState(false);

  useEffect(() => {
    if (navSide) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [navSide]);

  return (
    <div className="navbar">
      {navSide ? (
        <div className="overlay" onClick={() => setNavSide(false)}></div>
      ) : null}
      <div className="container">
        <div
          className="logo"
          onClick={() => {
            navigate("/");
            setMenu("shop");
          }}>
          <img src={logo} alt="shopper" />
          <p>shopper</p>
        </div>
        <ul
          className={
            navSide ? "links navbar-links-side" : "links navbar-links"
          }>
          <li
            onClick={() => {
              setMenu("shop");
              setNavSide(false);
            }}
            className={menu === "shop" ? "active" : ""}>
            <Link to={"/"}>Shop</Link>
            {menu === "shop" ? <hr /> : null}
          </li>
          <li
            onClick={() => {
              setMenu("men");
              setNavSide(false);
            }}
            className={menu === "men" ? "active" : ""}>
            <Link to={"/men"}>Men</Link>
            {menu === "men" ? <hr /> : null}
          </li>
          <li
            onClick={() => {
              setMenu("women");
              setNavSide(false);
            }}
            className={menu === "women" ? "active" : ""}>
            <Link to={"/women"}>Women</Link>
            {menu === "women" ? <hr /> : null}
          </li>
          <li
            onClick={() => {
              setMenu("kids");
              setNavSide(false);
            }}
            className={menu === "kids" ? "active" : ""}>
            <Link to={"/kids"}>Kids</Link>
            {menu === "kids" ? <hr /> : null}
          </li>
        </ul>
        <div className="navbar-right">
          <FontAwesomeIcon
            icon={faBars}
            className={navSide ? "toggle bar-side" : "toggle bar"}
            onClick={() => setNavSide(!navSide)}
          />
          {isLoggedIn ? (
            <div className="person-avatar">
              <FontAwesomeIcon
                icon={faCircleUser}
                onClick={() => {
                  setInfoCard(!infoCard);
                }}
                size="2xl"
                className="faCircleUser"
              />
              {infoCard && (
                <div className="profile-template">
                  <ProfileTemplate />
                </div>
              )}
            </div>
          ) : (
            <Link to={"/login"}>
              <button>LogIn</button>
            </Link>
          )}
          <Link to={"/cart"}>
            <img src={cart_icon} alt="cart-icon" />
          </Link>
          <div className="products-count">{cartItemsCount}</div>
        </div>
      </div>
    </div>
  );
};
