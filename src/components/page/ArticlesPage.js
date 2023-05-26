import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../styles/IndexPage.css';
import ChargemementPage from "./ChargementPage"


function ArticlesPage({ IsLoggedIn,setIsLoggedIn,userId, setUserId,isAdmin,setisAdmin }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Récupérer tous les articles depuis l'API
    fetch('http://localhost:8000/articles/all')
      .then(response => response.json())
      .then(data => {
        // Mettre à jour le state avec les articles récupérés
        setArticles(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

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
        {articles.map(article => (
          <div className="article" key={article._id}>
            <Link to={`/articles/${article._id}`}>
              <img className="article-image" src={article.picture} alt={article.titre} />
            </Link>
            <Link to={`/articles/${article._id}`}>
              <h2 className="title">{article.titre}</h2>
            </Link>
            <p className="date">Published on: {formatDate(article.createdAt)}</p>
            <p className="description">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesPage;
