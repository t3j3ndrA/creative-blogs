import React, { useState } from "react";
import API from "../axios-instance/axios";
import loginLL from "../../assests/login.svg";
import { Link } from "react-router-dom";
import "./auth.css";
function Signup() {
  const [name, setName] = useState("");
  const [pass1, setpass1] = useState("");
  const [pass2, setpass2] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [msg, setmsg] = useState("");
  const [isSignedUp, setisSignedUp] = useState(false);
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePass1 = (e) => {
    setpass1(e.target.value);
  };
  const handlePass2 = (e) => {
    setpass2(e.target.value);
  };
  const handleFile = (e) => {
    setProfileImage(e.target.files[0]);
  };
  const handleSignUp = async () => {
    if (pass1 !== pass2 || !pass1 || !pass2) {
      setmsg("Password doesn't matches");
      return;
    }
    if (!name) {
      setmsg("Name cannot be empty");
      return;
    }
    if (!profileImage) {
      setmsg("Don't shy, please choose profile image");
      return;
    }
    setmsg("Creating you credentials...");
    setisSignedUp(true);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("password", pass2);
    formData.append("profileImage", profileImage);
    const response = await API.post("/user/", formData);
    if (response.data.success) {
      setmsg("Your account created successfuly! Please log in");
    } else {
      setmsg("Username already taken");
      setisSignedUp(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login__svg--container">
        <img src={loginLL} alt="login" className="login__svg" />
      </div>
      <div className="auth-form log-in">
        <p className="auth__title">Sign Up</p>
        <input
          type="text"
          className="auth__username"
          placeholder="username"
          value={name}
          onChange={handleName}
        />
        <input
          type="password"
          className="auth__password"
          placeholder="type password"
          value={pass1}
          onChange={handlePass1}
        />
        <input
          type="password"
          className="auth__password"
          placeholder="re-type password"
          value={pass2}
          onChange={handlePass2}
        />
        <p className="auth__label--choose-profile-image">
          Choose profile image
        </p>
        <input
          type="file"
          className="auth__choose-file"
          onChange={handleFile}
        />
        <button
          type="submit"
          className="auth__button btn"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        {msg && (
          <p className={isSignedUp ? "success-msg" : "error-msg"}>{msg}</p>
        )}

        <Link
          to="/login"
          style={{
            textDecoration: "rgba(38, 50, 207, 0.8)",
            fontSize: "1rem",
            fontStyle: "italic",
            color: "blue",
          }}
        >
          already have an account ? Login here
        </Link>
      </div>
    </div>
  );
}

export default Signup;
