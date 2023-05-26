import React from "react";
import "../../styles/InfoPage.css";
import gitLogo from "../../assets/logo_git.png";
import LinkedInLogo from "../../assets/logo_linkedin.png";

function InfoPage({ IsLoggedIn,setIsLoggedIn,userId, setUserId,isAdmin,setisAdmin }) {
  return (
    <div className="info">
      <p className="info-text">Un site fait par Sirine Yakhou</p>
      <ul className="info-bar">
        <li>
          <a href="https://github.com/Yunaie" target="_blank" rel="noopener noreferrer">
            <img src={gitLogo} alt="logo-git" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/sirine-yakhou-125070247/" target="_blank" rel="noopener noreferrer">
            <img src={LinkedInLogo} alt="logo-linkedin" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default InfoPage;
