import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../axios-instance/axios";
import "./userprofile.css";
const Userprofile = () => {
  const [user, setUser] = useState({});

  const [name, setName] = useState("");
  const [pass1, setpass1] = useState("");
  const [pass2, setpass2] = useState("");
  const [msg, setmsg] = useState("");
  const [isError, setIsError] = useState(true);
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePass1 = (e) => {
    setpass1(e.target.value);
  };
  const handlePass2 = (e) => {
    setpass2(e.target.value);
  };

  const getProfile = async () => {
    const id = localStorage.getItem("id");
    const response = await API.get(`/user/${id}`);
    console.log(response.data);
    if (response.data.success) setUser(response.data.result);
  };

  const handleChanges = async () => {
    if (name) {
      const response = await API.patch(`user/${localStorage.getItem("id")}`, {
        name: name,
      });
      if (response.data.success) {
        setmsg("Information Upadated");
        localStorage.setItem("name", name);
        setIsError(false);
      } else {
        setmsg("Could not update informations :(");
        setIsError(true);
      }
    } else {
      setIsError(true);
      setmsg("Username can't be empty");
    }
    if (pass2 && pass2 && pass1 === pass2) {
      const response = await API.patch(`user/${localStorage.getItem("id")}`, {
        password: pass2,
      });

      if (response.data.success) {
        setmsg("Information Upadated");
        setIsError(false);
      } else {
        setmsg("Could not update informations :(");
        setIsError(true);
      }
    } else if (pass1 === "" && pass2 === "") {
      return;
    } else {
      setIsError(true);
      setmsg("Password doesn't matches");
    }
  };

  useEffect(() => {
    getProfile();
    setIsError(false);
  }, []);
  return (
    <>
      <div className="user-pforile__container">
        <div className="profile__content">
          <div className="profile__image--container">
            <img
              src={user.profileImage}
              alt="profile"
              className="profile__image"
            />
          </div>
          <div className="profile__greetings">
            <p className="profile__username">{`Welcome ${user.name}`}</p>

            <Link
              to="user/logout"
              style={{
                textDecoration: "rgba(38, 50, 207, 0.8)",
                fontSize: "1rem",
                fontStyle: "italic",
                color: "blue",
              }}
            >
              Logout
            </Link>
            {/* </div> */}
          </div>
          <div className="edit-profile">
            <p className="edit-profile__title">Edit Your Profile</p>
            <p className="edit-profile__label">New uername</p>
            <input
              type="text"
              value={name}
              onChange={handleName}
              placeholder="username"
            />

            <p className="edit-profile__label">New password</p>
            <input
              type="password"
              value={pass1}
              onChange={handlePass1}
              placeholder="enter password"
            />
            <input
              type="password"
              value={pass2}
              onChange={handlePass2}
              placeholder="enter new password"
            />

            <button className="edit-profile__btn" onClick={handleChanges}>
              Apply Changes
            </button>

            {msg && (
              <p className={isError ? "error-msg" : "success-msg"}>{msg}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Userprofile;
