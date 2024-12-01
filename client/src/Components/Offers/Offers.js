import React from "react";
import "./Offers.css";
import exclusive_image from "../../Assets/exclusive_image.png";

export const Offers = () => {
  return (
    <div className="offers">
      <div className="container">
        <div className="left">
          <p className="first">Exclusive</p>
          <p className="first">Offers For You</p>
          <p className="second">Only On Best Sellers Products</p>
          <div className="check-now">
            <p>Check now</p>
          </div>
        </div>
        <div className="right">
          <img
            src={exclusive_image}
            alt="exclusive_image"
            className="exclusive_image"
          />
        </div>
      </div>
    </div>
  );
};
