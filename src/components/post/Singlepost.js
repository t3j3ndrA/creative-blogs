import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../axios-instance/axios";
import "./singlepost.css";

export default function Singlepost() {
  console.log(useParams());
  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState({});

  const getPost = async () => {
    const response = await API.get(`/posts/${id}`);
    console.log(response.data);
    setPost(response.data.result);
  };

  useEffect(() => {
    getPost();
  }, []);

  const { title, featuredImage, desc, content, _id, author } = post;
  let d = post.createdAt;
  d = String(d).slice(0, 10);

  return (
    <div className="post" key={_id}>
      <div className="post__image--container">
        <img src={featuredImage} alt="" className="post__image" />
      </div>
      <h2 className="post__title">{title}</h2>
      <div className="post__info">
        <p className="post__date">{d}</p>
        <p className="post__author">{`by ` + author}</p>
      </div>
      <p className="post__description">{desc}</p>
      <p className="post__content">{content}</p>
    </div>
  );
}
