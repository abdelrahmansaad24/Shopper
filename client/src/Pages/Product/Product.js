import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { productContext } from "../../Context/Context";
import arrow_icon from "../../Assets/breadcrum_arrow.png";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import { DescriptionReviews } from "../../Components/DescriptionReviews/DescriptionReviews";
import { RelatedProducts } from "../../Components/RelatedProducts/RelatedProducts";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";

export const Product = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const { productId } = useParams();

  const [product, setProduct] = useState();

  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    axios
      .get(`http://localhost:8900/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data.data.product);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error while Loading product, try again");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // eslint-disable-next-line eqeqeq
  return (
    <div className="product">
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          product && (
            <>
              <div className="product-path">
                <p>
                  HOME <img src={arrow_icon} alt=">" /> SHOP{" "}
                  <img src={arrow_icon} alt=">" /> {product.category}{" "}
                  <img src={arrow_icon} alt=">" /> {product.name}
                </p>
              </div>
              <ProductDetails product={product} />
              <DescriptionReviews product={product} />
              <RelatedProducts product={product} />
            </>
          )
        )}
      </div>
    </div>
  );
};
