import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ArticleposterPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function PosterArticlePage({ setIsLoggedIn, setUserId, setisAdmin,isAdmin }) {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [crime, setCrime] = useState("");
    const [picture, setPciture] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  

  const article = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios.post(
        `https://true-crime-story-back.onrender.com/articles`,
        {
          titre,
          description,
          markdown,
          crime,
          picture
        },
        {
          withCredentials: true,
        }
        
      );
      setRedirect(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  if (redirect) {
    navigate('/poster');
  }


  return (
          <form onSubmit={article}>
            <h1 className="article-titre">titre</h1>
            <input
              type="text"
        placeholder="titre"
        value={titre}
        onChange={(ev) => setTitre(ev.target.value)}
      />

      <h1 className="article-titre">description</h1>
            <input
              type="text-area"
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />

         <h1 className="article-titre">markdown</h1>
            <input
              type="text-area"
        placeholder="markdown"
        value={markdown}
        onChange={(ev) => setMarkdown(ev.target.value)}
      /> 
      <h1 className="article-titre">crime</h1>
            <input
              type="text"
        placeholder="id du crime"
        value={crime}
        onChange={(ev) => setCrime(ev.target.value)}
      />
      <h1 className="article-titre">pic</h1>
          <input
            type="text"
      placeholder="lien de l'image"
      value={picture}
      onChange={(ev) => setPciture(ev.target.value)}
    />
      <button className="my-button" type="submit">
        Poster
      </button>
    </form>
  );
}

export default PosterArticlePage;
