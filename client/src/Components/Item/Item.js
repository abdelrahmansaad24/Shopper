import React from "react";
import "./Item.css";
import { useNavigate } from "react-router-dom";
export const Item = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="item">
      <img
        src={product.image}
        alt={product.name}
        className="item-image"
        onClick={() => {
          navigate(`/product/${product._id}`);
          window.scrollTo(0, 0);
        }}
      />
      <div className="item-content">
        <p>{product.name}</p>
        <div className="item-price">
          <p className="new_price">{product.new_price}$</p>
          <p className="old_price">{product.old_price}$</p>
        </div>
      </div>
    </div>
  );
};
