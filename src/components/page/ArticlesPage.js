import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import '../../styles/IndexPage.css';
import ChargemementPage from "./ChargementPage"
import axios from "axios";

function ArticlesPage({ IsLoggedIn,setIsLoggedIn,userId, setUserId,isAdmin,setisAdmin }) {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer tous les articles depuis l'API
    fetch('https://true-crime-story-back.onrender.com

/articles/all')
      .then(response => response.json())
      .then(data => {
        // Mettre à jour le state avec les articles récupérés
        setArticles(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleDeleteArticle = async (articleid, index) => {
    try {
      // Envoyer une requête de suppression de l'utilisateur avec l'ID de l'utilisateur
      await axios.delete(`https://true-crime-story-back.onrender.com

/articles/${articleid}`, { withCredentials: true });

      // Mettre à jour la liste des utilisateurs en supprimant l'utilisateur supprimé
      const updatedArticles = [...articles];
      updatedArticles.splice(index, 1);
      setArticles(updatedArticles);
      navigate(`/articles`);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

   if (!articles) {
    return <div>
      <ChargemementPage/>
    </div>; // Afficher un message de chargement pendant la récupération des données
  }


  return (
    <div className="index">
      <h3 className="latest">Tous les articles :</h3>
      <div className="container">
        {articles.map((article,index) => (
          <div className="article" key={article._id}>
            <Link to={`/articles/${article._id}`}>
              <img className="article-image" src={article.picture} alt={article.titre} />
            </Link>
            <Link to={`/articles/${article._id}`}>
              <h2 className="title">{article.titre}</h2>
            </Link>
            <p className="date">Published on: {formatDate(article.createdAt)}</p>
            <p className="description">{article.description}</p>
            <button
                    className="tooltip"
                    onClick={() => handleDeleteArticle(article._id, index)}
                  >
                    <svg viewBox="0 0 448 512" className="svgIcon">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
                  </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesPage;
