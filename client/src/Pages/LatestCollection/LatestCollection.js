import React, { useContext, useState, useEffect } from "react";
import "./LatestCollection.css";
import { productContext } from "../../Context/Context";
import { Item } from "../../Components/Item/Item";
import axios from "axios";

export const LatestCollection = () => {
  const { all_products } = useContext(productContext);
  const [latest_products, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [sortValue, setSortValue] = useState("");
  const [categories, serCategories] = useState({
    men: false,
    women: false,
    kid: false,
  });
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    let newArray = Object.keys(categories).filter(
      (categ) => categories[categ] === true
    );
    setLoading(true);
    setErrorMessage("");
    axios
      .get(
        `http://localhost:8900/api/products/latestCollection?sort=${sortValue}&category=${newArray.join(
          ","
        )}&limit=${limit}`
      )
      .then((response) => {
        setLatestProducts(response.data.data.products);
        console.log(response.data.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error while Loading products, try again");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categories, sortValue]);

  const handleCategories = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      serCategories({ ...categories, [value]: true });
    } else {
      serCategories({ ...categories, [value]: false });
    }
  };

  const handleSortValue = (e) => {
    console.log(e.target.value);
    setSortValue(e.target.value);
  };

  return (
    <div className="latestCollection">
      <div className="container">
        <div className="sidebar">
          <div className="product-categories">
            <p>Product Categories</p>
            <div className="product-categories-boxes">
              <div>
                <input
                  type="checkbox"
                  value="men"
                  id="men-checkbox"
                  onChange={handleCategories}
                  checked={categories.men}
                />
                <label for="men-checkbox">Men</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="women"
                  id="women-checkbox"
                  onChange={handleCategories}
                  checked={categories.women}
                />
                <label for="women-checkbox">Women</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="kid"
                  id="kid-checkbox"
                  onChange={handleCategories}
                  checked={categories.kid}
                />
                <label for="kid-checkbox">Kid</label>
              </div>
            </div>
          </div>
          <div className="product-sort">
            <p>Sort By</p>
            <div className="product-sort-boxes">
              <div>
                <input
                  type="radio"
                  id="huey1"
                  name="drone"
                  value=""
                  onChange={handleSortValue}
                />
                <label for="huey1">All</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  value="new_price"
                  onChange={handleSortValue}
                />
                <label for="huey">Lowest price</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="dewey"
                  name="drone"
                  value="-new_price"
                  onChange={handleSortValue}
                />
                <label for="dewey">Highest Price</label>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          latest_products && (
            <div className="latestCollection-content">
              <div className="latestCollection-products">
                {latest_products.map((product, index) => {
                  return <Item product={product} key={index} />;
                })}
              </div>
              <div className="catgory-bottom">
                <button>Explore More</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
