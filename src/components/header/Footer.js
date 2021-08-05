import React from "react";
import "./footer.css";
function Footer() {
  return (
    <div className="footer">
      <h3 className="footer_title">
        <i>
          <span>c</span>reateive<span>B</span>logs
        </i>
      </h3>
      <div className="footer__contact-us">
        <h3>Contact US</h3>
        <p className="email">tejendradhanani@gmail.com</p>
        <p className="num">+91 910 650 3622</p>
      </div>
      <div className="footer__copyright">
        <p> Copyright &#169; 2021 </p>
        <p> Allright Reserved &#174; </p>
      </div>
    </div>
  );
}

export default Footer;
