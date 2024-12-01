import React, { useContext, useState } from "react";
import "./ReviewCard.css";
import { productContext } from "../../Context/Context";
import axios from "axios";

const ReviewCard = ({ productId }) => {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState();
  const { showReviewCard, setshowReviewCard } = useContext(productContext);

  const handleChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = () => {
    let data = {
      review: reviewText,
      rating: rating,
      productId: productId,
    };
    axios
      .post(
        "http://localhost:8900/api/reviews",
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status == 201 && response.data.status === "success") {
          // notify("Signed In successfuly");
          console.log(response.data);
          setReviewText("");
          setRating(1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!showReviewCard) return null;
  return (
    <div className="review-card-overlay">
      <div className="review-card">
        <div className="stars">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  value={ratingValue}
                  name="radio"
                  onChange={() => setRating(ratingValue)}
                />
                <span
                  style={{
                    color:
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                    transition: "0.4s",
                  }}
                  className="star"
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}>
                  &#9733;
                </span>
              </label>
            );
          })}
        </div>
        <div className="review-text">
          <textarea
            value={reviewText}
            onChange={handleChange}
            rows={4}
            cols={50}
            placeholder="Enter review here..."
          />
        </div>
        <div className="review-buttons">
          <button onClick={() => setshowReviewCard(false)}>Close</button>
          <button type="submit" onClick={() => handleSubmitReview()}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
