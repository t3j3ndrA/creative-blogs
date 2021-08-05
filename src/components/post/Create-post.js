import React, { useState } from "react";
import "./create-post.css";

import writeSVG from "../../assests/create-post.svg";
import API from "../axios-instance/axios";

function Createpost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(true);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };
  const handleFeaturedImage = (e) => {
    setFeaturedImage(e.target.files[0]);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const onCreate = async () => {
    if (!title) {
      setMsg("Title cannot be empty!");
      return;
    }
    if (!desc) {
      setMsg("please provide description of your blog");
      return;
    }
    if (!content) {
      setMsg("content cannot be empty!");
      return;
    }
    if (!featuredImage) {
      setMsg("Please provide Featured image");
      return;
    }
    setMsg("Creating post...");
    setIsError(false);
    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("featuredImage", featuredImage);
    formData.append("author", localStorage.getItem("name"));
    formData.append("content", content);

    const response = await API.post("/posts/create-new-post", formData);
    if (response.data.success) {
      setMsg("Post added successfuly!");
      setIsError(false);
    } else {
      setMsg(response.data.result);
      isError(true);
    }
  };

  return (
    <>
      <p
        style={{
          fontSize: "2.6rem",
          letterSpacing: "0.15rem",
          textAlign: "center",
          fontWeight: "700",
          marginTop: "2rem",
          textTransform: "capitalize",
        }}
      >
        Create a creative post
      </p>
      <div className="new-post__container">
        <div className="new-post__ill">
          <img src={writeSVG} alt="writting illustration" />
        </div>

        <div className="new-post">
          <p className="label">Title</p>
          <input
            type="text"
            className="new-post__title"
            value={title}
            onChange={handleTitle}
          />
          <p className="label">Description</p>
          <input
            type="text"
            className="new-post__desc"
            value={desc}
            onChange={handleDesc}
          />
          <p className="label">Add a featured image </p>
          <input
            className="file_input new-post__featuredImage"
            type="file"
            onChange={handleFeaturedImage}
            style={{
              border: "0px",
              height: "auto",
              margin: "0px",
              padding: "0px",
            }}
          />
          <p className="label">Content </p>
          <textarea
            onChange={handleContent}
            value={content}
            className="new-post__content"
            // cols="50"
            rows="12"
          />

          <button className="new-post__create-post--btn" onClick={onCreate}>
            Create Post
          </button>

          {msg && (
            <p className={isError ? "error-msg" : "success-msg"}> {msg}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Createpost;
