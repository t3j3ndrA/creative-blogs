import React, { useEffect, useState } from "react";
import API from "../axios-instance/axios";
import { Link } from "react-router-dom";
import "./allpostview.css";
function Postview() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await API.get("/posts");
    setPosts(response.data.result);
  };

  useEffect(() => {
    getPosts();
  }, []);

  getPosts();
  return (
    <div className="all-posts">
      {posts.map((post) => {
        const { title, featuredImage, desc, _id, author } = post;
        return (
          <div className="a-post" key={_id}>
            <div className="a-post__image--container">
              <img src={featuredImage} alt="" className="a-post__image" />
            </div>
            <h2 className="a-post__title">{title}</h2>
            <p className="post__author">{`by ` + author}</p>
            <p className="">{desc}</p>
            <button className="a-post__btn">
              <Link to={`/posts/${_id}`}>read more</Link>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Postview;
