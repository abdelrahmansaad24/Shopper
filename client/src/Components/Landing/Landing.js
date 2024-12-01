import React from "react";
import "./Landing.css";
import hand_icon from "../../Assets/hand_icon.png";
import arrow from "../../Assets/arrow.png";
import hero from "../../Assets/hero_image.png";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="container">
        <div className="landing-left">
          <h1 className="landing-header">new arrivals only</h1>
          <div className="wave">
            <p>new</p>
            <img src={hand_icon} alt="wave" />
          </div>
          <p>
            Collections <br /> for everyone
          </p>
          <div
            className="latest-collection"
            onClick={() => navigate("/latestCollection")}>
            <p>Latest Collection</p>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="landing-right">
          <img src={hero} alt="hero" />
        </div>
      </div>
    </div>
  );
};
