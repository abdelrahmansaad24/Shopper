import React, { useContext, useEffect, useState } from "react";
import "./DescriptionReviews.css";
import ProductReviews from "../ProductReviews/ProductReviews";
import reviews from "../../Assets/reviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import { productContext } from "../../Context/Context";

export const DescriptionReviews = ({ product }) => {
  const [showDesc, setShowDesc] = useState(true);
  const { setshowReviewCard } = useContext(productContext);

  return (
    <div className="description-reviews">
      <div className="review-des-header">
        <div className="toggle-review-desc">
          <div
            className={showDesc ? "desc-toggle active" : "desc-toggle"}
            onClick={() => setShowDesc(true)}>
            Description
          </div>
          <div
            className={!showDesc ? "reviews-toggle active" : "reviews-toggle"}
            onClick={() => setShowDesc(false)}>
            Reviews ({reviews.length})
          </div>
        </div>
        <button
          className="add-review-button"
          onClick={() => setshowReviewCard(true)}>
          Add Review
        </button>
      </div>
      {showDesc ? (
        <div className="desc-reviews-content">{product.description}</div>
      ) : (
        <ProductReviews productId={product._id} />
      )}
      <ReviewCard productId={product._id} />
    </div>
  );
};
