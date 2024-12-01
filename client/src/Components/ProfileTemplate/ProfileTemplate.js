import React, { useContext, useEffect, useState } from "react";
import "./ProfileTemplate.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCircleUser,
  faSignOut,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { productContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

export const ProfileTemplate = () => {
  const { activeTap, setActiveTap } = useContext(productContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [personalInfo, setPersonalInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    axios
      .get(`http://localhost:8900/api/users/myProfile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
        },
      })
      .then((response) => {
        setPersonalInfo(response.data.data.user);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error while Loading user info, try again");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="profile-left side-bar-profile">
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        personalInfo && (
          <>
            <div className="user-info">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="cricle-user"
                size="2xl"
              />
              <div
                className="user-text"
                onClick={() => {
                  setActiveTap("personalInfo");
                  navigate("/profile");
                }}>
                <p className="name">{personalInfo.name}</p>
                <p className="emai">{personalInfo.email}</p>
              </div>
            </div>
            <div className="profile-buttons">
              <div
                className={activeTap === "personalInfo" ? "active" : ""}
                onClick={() => setActiveTap("personalInfo")}>
                <FontAwesomeIcon icon={faUser} />
                <p>Personal Information</p>
              </div>
              <div
                className={activeTap === "myOrders" ? "active" : ""}
                onClick={() => setActiveTap("myOrders")}>
                <FontAwesomeIcon icon={faStore} />
                <p>My Orders</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faSignOut} />
                <p>Logout</p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};
