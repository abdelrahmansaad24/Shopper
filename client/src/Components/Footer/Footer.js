import React from "react";
import logo from "../../Assets/logo.png";
import whatsapp_icon from "../../Assets/whatsapp_icon.png";
import pintester_icon from "../../Assets/pintester_icon.png";
import instagram_icon from "../../Assets/instagram_icon.png";

import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top-footer">
          <img src={logo} alt="shopper" />
          <p>Shopper</p>
        </div>
        <ul className="footer-links">
          <li>Company</li>
          <li>Products</li>
          <li>Offices</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className="bottom-footer">
          <img src={instagram_icon} alt="instagram" />
          <img src={pintester_icon} alt="pintester" />
          <img src={whatsapp_icon} alt="whatsapp_icon" />
        </div>
        <hr />
        <p className="copyright">Copyright @ 2023 - All Right Reserved</p>
      </div>
    </div>
  );
};
