import React, { useEffect, useRef, useState } from "react";
import "./ProductReviews.css";
import reviews from "../../Assets/reviews";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ProductReviews = ({ productId }) => {
  const scrollRef = useRef(null);
  const reviewRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [reviews, setReviews] = useState();

  const scrollHandler = (direc) => {
    let scrollWidth = reviewRef.current.offsetWidth + 14;
    if (direc === "left") scrollWidth *= -1;
    scrollRef.current.scrollBy({
      left: scrollWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    axios
      .get(`http://localhost:8900/api/reviews/productReviews/${productId}`)
      .then((response) => {
        setReviews(response.data.data.reviews);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error while Loading product, try again");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="product-reviews">
      <div className="arrow-icons">
        <FontAwesomeIcon
          icon={faArrowRight}
          className="arrow-right"
          onClick={() => scrollHandler("right")}
        />
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="arrow-left"
          onClick={() => scrollHandler("left")}
        />
      </div>
      <div className="slider" ref={scrollRef}>
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          reviews &&
          reviews.map((review, index) => {
            return (
              <div className="review" key={index} ref={reviewRef}>
                <div className="review-owner">
                  <FontAwesomeIcon icon={faUser} />
                  <div className="user-info">
                    <p className="name">{review.reviewee.name}</p>
                    {/* <p className="country">{review.user.country}</p> */}
                  </div>
                </div>
                <p>{review.review}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
