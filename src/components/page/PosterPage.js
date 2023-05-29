import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PosterPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function PosterPage({ setIsLoggedIn, setUserId, setisAdmin, isAdmin }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/poster/article');
  };
  const handleClick2 = () => {
    navigate('/poster/crime');
  };
  const handleClick3 = () => {
    navigate('/poster/victime');
  };
  const handleClick4 = () => {
    navigate('/poster/criminel');
  };

  return (
   <div className="ensemble-bouton">
     <button className="my-button" onClick={handleClick}>
      Article
    </button>
     <button className="my-button" onClick={handleClick2}>
     Crime
   </button>
   <button className="my-button" onClick={handleClick3}>
     Victime
   </button>
   <button className="my-button" onClick={handleClick4}>
     Criminel
   </button>
   </div>
  );
}

export default PosterPage;
