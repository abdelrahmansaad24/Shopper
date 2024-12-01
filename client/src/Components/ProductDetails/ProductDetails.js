import React, { useContext, useState } from "react";
import "./ProductDetails.css";
import star_icon from "../../Assets/star_icon.png";
import star_dull_icon from "../../Assets/star_dull_icon.png";
import { productContext } from "../../Context/Context";

const ProductDetails = ({ product }) => {
  const { getCartItemCount } = useContext(productContext);
  const [productSize, setProductSize] = useState();
  const { addToCart } = useContext(productContext);

  const addProductToCart = () => {
    if (
      !productSize ||
      product[productSize] <= getCartItemCount(product._id, productSize)
    )
      return alert("please select product size first");
    addToCart(product, productSize);
  };

  return (
    <div className="product-details">
      <div className="product-images">
        <div className="first-column">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div className="second-column">
          <img src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="product-content">
        <p className="product-name">{product.name}</p>
        <div className="stars">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="star" />
          <p>(122)</p>
        </div>
        <div className="product-price">
          <p className="old_price">{product.old_price}$</p>
          <p className="new_price">{product.new_price}$</p>
        </div>
        <p className="desc">{product.description}</p>
        <div className="product-content-bottom">
          <p className="select-size">Select Size</p>
          <div className="sizes">
            {product.small_quantity >
              getCartItemCount(product._id, "small_quantity") && (
              <button
                onClick={() => setProductSize("small_quantity")}
                className={
                  productSize === "small_quantity" ? "active-size" : ""
                }>
                S
              </button>
            )}
            {product.medium_quantity >
              getCartItemCount(product._id, "medium_quantity") && (
              <button
                onClick={() => setProductSize("medium_quantity")}
                className={
                  productSize === "medium_quantity" ? "active-size" : ""
                }>
                M
              </button>
            )}
            {product.large_quantity >
              getCartItemCount(product._id, "large_quantity") && (
              <button
                onClick={() => setProductSize("large_quantity")}
                className={
                  productSize === "large_quantity" ? "active-size" : ""
                }>
                L
              </button>
            )}
            {product.x_large_quantity >
              getCartItemCount(product._id, "x_large_quantity") && (
              <button
                onClick={() => setProductSize("x_large_quantity")}
                className={
                  productSize === "x_large_quantity" ? "active-size" : ""
                }>
                XL
              </button>
            )}
            {product.xx_large_quantity >
              getCartItemCount(product._id, "xx_large_quantity") && (
              <button
                onClick={() => setProductSize("xx_large_quantity")}
                className={
                  productSize === "xx_large_quantity" ? "active-size" : ""
                }>
                XXL
              </button>
            )}
          </div>
          <button
            className="add-cart-button"
            onClick={() => addProductToCart()}>
            ADD TO CART
          </button>
          <div className="product-category">
            <p>
              <span>Category </span>: {product.category}
            </p>
            <p>
              <span>Tages</span>: Modern, Latest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
