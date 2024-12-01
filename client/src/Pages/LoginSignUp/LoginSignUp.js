import React, { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./LoginSignUp.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { productContext } from "../../Context/Context";
import { toast } from "react-toastify";

export const LoginSignUp = () => {
  const { setLoggedIn } = useContext(productContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      role: "customer",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    let url, status;
    if (login) {
      url = "http://localhost:8900/api/auth/login";
      status = 200;
    } else {
      url = "http://localhost:8900/api/auth/register";
      status = 201;
    }

    axios
      .post(url, {
        ...data,
      })
      .then((response) => {
        // eslint-disable-next-line eqeqeq
        if (response.status == status && response.data.status === "success") {
          if (login) {
            toast("Signed In successfuly");
          } else {
            toast("Registered successfuly");
          }

          setLoggedIn(true);
          reset();
          navigate("/");
          localStorage.setItem("acess-token", response.data.token);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="loginSignp" onSubmit={handleSubmit(onSubmit)}>
      <form className="loginSignp-card">
        <h2>{login ? "Login" : "Sign Up"}</h2>
        {!login ? (
          <>
            <input
              type="text"
              placeholder="Your name"
              {...register("name", {
                required: "Your name is required",
              })}
            />
            {errors.name && <p className="errorMsg">{errors.name.message}</p>}
          </>
        ) : null}
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

        {!login ? (
          <>
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
          </>
        ) : null}
        <input
          type="text"
          placeholder="Password"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 6,
              message: "Password should be at-least 6 characters.",
            },
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
              message:
                "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol",
            },
          })}
        />
        {errors.password && (
          <p className="errorMsg">{errors.password.message}</p>
        )}

        {!login ? (
          <>
            <input
              type="text"
              placeholder="Confrim password"
              {...register("passwordConfirm", {
                required: "Password confrim is required",
                validate: (value) => {
                  if (value !== watch("password")) {
                    return "Not Match password";
                  }
                },
              })}
            />
            {errors.passwordConfirm && (
              <p className="errorMsg">{errors.passwordConfirm.message}</p>
            )}
          </>
        ) : null}
        <button type="submit">Continue</button>
        <div className="loginSignp-card-footer">
          <p>
            {login ? "Create an account? " : "Already have an account? "}
            <span className="click-here" onClick={() => setLogin(!login)}>
              {login ? "Click here" : "Login here"}
            </span>
          </p>
          <div className="condition">
            <input type="checkbox" required />
            <p>By Continuing, I agree to the terms of use & privacy policy</p>
          </div>
        </div>
      </form>
    </div>
  );
};
