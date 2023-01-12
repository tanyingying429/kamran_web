import React, { useState, useEffect } from "react";
import openCloseNav from "../helper/openclosenav";

const Navigation = (props) => {

  return (
    <div className="header">
      <div className="header-container">
        <div className="header-black">
          <div className="nav-area">
            <div className="nav-mob">
              <div className="nav-mob-nav">
                <div className="nav-mob-ham">
                  <div className="container" onClick={() => openCloseNav()}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                  </div>
                </div>
              </div>
            </div>
            <nav>
              <ul className="nav-list">
                <li className="nav-item gren">
                  <a href="/">CONTACT</a>
                </li>
                <li className="nav-item gren">
                  <a href="/statistics">STATISTICS</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="navbar-mob">
        <div className="nav-mob-con">
          <div className="nav-mob-black">
            <nav className="nav-mob">
              <ul className="mob-nav-list">
                <li className="nav-item-mob">
                  <a href="/">CONTACT US</a>
                </li>
                <li className="nav-item-mob">
                  <a href="/statistics">STATISTICS</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
