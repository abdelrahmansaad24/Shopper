import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCircleUser,
  faSignOut,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import Orders from "../../Components/Orders/Orders";
import PersonalInformation from "../../Components/PersonalInformation/PersonalInformation";
import { productContext } from "../../Context/Context";
import { ProfileTemplate } from "../../Components/ProfileTemplate/ProfileTemplate";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { activeTap, setActiveTap } = useContext(productContext);
  const [personalInfo, setPersonalInfo] = useState();

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
    <div className="profile">
      <div className="container">
        <h1>My Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          personalInfo && (
            <>
              <ProfileTemplate personalInfo={personalInfo} />
              <div className="profile-Right">
                {/* <Orders /> */}
                {/* <PersonalInformation /> */}
                {activeTap === "personalInfo" ? (
                  <PersonalInformation user={personalInfo} />
                ) : (
                  <Orders />
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
