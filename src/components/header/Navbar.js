import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
function Navbar() {
  const logmeout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("profileImage");
    window.location = "/";
  };
  const [isOpen, setIsOpen] = useState(false);
  const navCenter = useRef(null);
  const handleBars = () => {
    if (!isOpen) {
      navCenter.current.style.transform = `translateX(0%)`;
      setIsOpen(true);
    } else {
      setIsOpen(false);
      navCenter.current.style.transform = `translateX(100%)`;
    }
  };
  return (
    <nav className="nav">
      <div className="nav-left">
        <i>
          <span>c</span>reateive<span>B</span>logs
        </i>
      </div>
      <div className="nav-center" ref={navCenter}>
        <li className="nav-center__icon">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-center__icon">
          <Link to="/about-us">About us</Link>
        </li>
      </div>

      <div className="nav-right">
        {!localStorage.getItem("name") && (
          <li>
            <Link to="/login" className="nav-right__icon">
              Login
            </Link>
          </li>
        )}
        {!localStorage.getItem("name") && (
          <li>
            <Link to="/signup" className="nav-right__icon">
              Sign up
            </Link>
          </li>
        )}
        {localStorage.getItem("profileImage") && (
          <img
            src={localStorage.getItem("profileImage")}
            alt="user"
            className="profile__image"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "1px solid blue",
            }}
          />
        )}
        {localStorage.getItem("name") && (
          <li>
            <Link to={`/user/${localStorage.getItem("name")}`}>
              {localStorage.getItem("name")}
            </Link>
          </li>
        )}
        {localStorage.getItem("name") && (
          <button className="nav-right__logout-btn" onClick={logmeout}>
            Logout
          </button>
        )}

        <button className="bars" onClick={handleBars}>
          |||
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
