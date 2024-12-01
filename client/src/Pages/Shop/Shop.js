import React from "react";
import "./shop.css";
import { Landing } from "../../Components/Landing/Landing";
import { Popular } from "../../Components/Popular/Popular";
import { Offers } from "../../Components/Offers/Offers";
import { NewCollections } from "../../Components/NewCollections/NewCollections";
import { Newsletter } from "../../Components/Newsletter/Newsletter";
export const Shop = () => {
  return (
    <div>
      <Landing />
      <Popular />
      <Offers />
      <NewCollections />
      <Newsletter />
    </div>
  );
};
