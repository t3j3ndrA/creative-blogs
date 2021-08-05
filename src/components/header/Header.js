import React from "react";
import background from "../../assests/header-background.png";
import "./header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header" style={{ backgroundImage: `url(${background})` }}>
      Create creative blogs and present you ideas
      <button className="new-post__create-post--btn">
        <Link
          to={
            localStorage.getItem("name") ? "/posts/create-new-post/" : "/login"
          }
        >
          Create Post
        </Link>
      </button>
    </div>
  );
}

export default Header;
