import React from "react";
import "./styles.scss";

const Footer = ({ selectedCount, totalCount }) => (
  <div className="footer-container">
    <div className="selected-count-div">
      {`${selectedCount} Resources`}
    </div>
    <div className="count-div">
      <span className="count-number">{totalCount}</span>ROWS
    </div>
  </div>
)

export default Footer;
