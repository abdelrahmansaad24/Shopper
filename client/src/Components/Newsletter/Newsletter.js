import React from "react";
import "./Newsletter.css";
export const Newsletter = () => {
  return (
    <div className="newsletter">
      <div className="container">
        <h2>Get Exclusive on your email</h2>
        <p>Subscribe to our newsletter and stay updated</p>
        <div className="subscrible">
          <input type="email" placeholder="Your email is" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};
