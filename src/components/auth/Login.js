import React, { useState } from "react";
import API from "../axios-instance/axios";
import loginLL from "../../assests/login.svg";
import "./auth.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [msg, setMsg] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onLoggin = async (e) => {
    e.preventDefault();

    const response = await API.get(`user/${name}/${password}`);
    console.log(response.data);
    if (response.data.success) {
      setIsLoggedin(true);
      setMsg("Logged in successfuly");
      localStorage.setItem("name", name);
      localStorage.setItem("id", response.data.result[0]._id);
      localStorage.setItem(
        "profileImage",
        response.data.result[0].profileImage
      );

      window.location = "/";
    } else {
      setIsLoggedin(false);
      setMsg("Wrong credentials");
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="login__svg--container">
          <img src={loginLL} alt="login" className="login__svg" />
        </div>
        <div className="auth-form log-in">
          <p className="auth__title">LOGIN</p>
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
            placeholder="password"
            value={password}
            onChange={handlePassword}
          />
          <button type="submit" className="auth__button btn" onClick={onLoggin}>
            Login
          </button>
          {msg && (
            <p className={isLoggedin ? "success-msg" : "error-msg"}>{msg}</p>
          )}
          <Link
            to="/signup"
            style={{
              textDecoration: "rgba(38, 50, 207, 0.8)",
              fontSize: "1rem",
              fontStyle: "italic",
              color: "blue",
            }}
          >
            Don't have an account ? Signup here
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
