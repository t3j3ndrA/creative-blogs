import React from "react";
import "./aboutus.css";
import myPic from "../../assests/passpic.jpg";
function Aboutus() {
  return (
    <div className="about-us__container">
      <div className="myPic">
        <img src={myPic} alt="It's me!" />
      </div>
      <div className="about-us">
        <h2>About-Us</h2>
        <p>This section should be about-me instead of about-us XD, anywas.</p>
        <p>
          Lemme Introduce my-self in more formal way, I am Dhanani Tejendra
          pursuing my B. Tech in Information and Tech. ('24) at Dharamsinh Desai
          University. I am now MERN Full stack web developer. If you wanna build
          a site please contact me. I am lazy coder and it tooks 4 days to build
          this site. I wrote 1600+ line of code to build this site and this is
          probably the first time I wrote this much lines in a single project.
        </p>
        <p>That's it! I'll soon be here with a new project :)</p>
      </div>
    </div>
  );
}

export default Aboutus;
