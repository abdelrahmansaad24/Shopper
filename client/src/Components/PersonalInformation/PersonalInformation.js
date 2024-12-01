import React, { useEffect, useState } from "react";
import "./PersonalInformation.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const PersonalInformation = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { ...user } });

  const onSubmit2 = (data) => {
    axios
      .post(
        `http://localhost:8900/api/users/myProfile`,
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
        if (response.status === 201) {
          toast("Profile Updated Successfully");
        }
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error while Loading user info, try again");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="personal-info">
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <p>Personal Information</p>
          <form
            className="personal-info-form"
            onSubmit={handleSubmit(onSubmit2)}>
            <p>Name</p>
            <input
              type="text"
              placeholder="Your name"
              {...register("name", {
                required: "Your name is required",
              })}
            />
            {errors.name && <p className="errorMsg">{errors.name.message}</p>}

            <p>Email</p>
            <input
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid",
                },
              })}
            />
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
            <p>Phone Number</p>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", {
                required: "Phone Number is required",
                pattern: {
                  value: /(^01[0-2,5]{1}[0-9]{8}$)/,
                  message: "Phone Number is not valid ",
                },
              })}
            />
            {errors.phone && <p className="errorMsg">{errors.phone.message}</p>}
            <p>Address</p>
            <input
              type="text"
              placeholder="Address"
              {...register("address", {
                required: "Address is required",
              })}
            />
            {errors.address && (
              <p className="errorMsg">{errors.address.message}</p>
            )}
            <button className="update-myInfo">Update Account</button>
          </form>
        </>
      )}
    </div>
  );
};

export default PersonalInformation;
