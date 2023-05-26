import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import "../../styles/ProfilePage.css";
import "../../styles/IndexPage.css";

function ProfilePage({ isLoggedIn, setIsLoggedIn, userId, setUserId,isAdmin,setisAdmin }) {
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);
  const [amIOwner, setAmIOwner] = useState(false);
  const { id } = useParams();
  const [changeBio, setChangeBio] = useState(false);
  const [bouton1,setbouton1] = useState(true)
  const [bio, setBio] = useState("");
  const [changePicture, setChangePicture] = useState(false);
  const [bouton2,setbouton2] = useState(true)
  const [picture, setPicture] = useState("");

  useEffect(() => {
    // Récupérer les détails de l'utilisateur depuis l'API en utilisant l'ID
    fetch(`http://localhost:8000/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Mettre à jour le state avec les détails de l'utilisateur récupéré
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  useEffect(() => {
    const fetchLikedArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/like/${userId}`);
        setLikes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikedArticles();
  }, [userId]);

  useEffect(() => {
    setAmIOwner(userId === id);
    console.log(amIOwner);
  }, [userId, id]);

  if (!user) {
    return <div>Loading...</div>; // Afficher un message de chargement pendant la récupération des données
  }

  function handleBio1(){
    setChangeBio(true);
    setbouton1(false)
  };

  function handlePicture1(){
    setChangePicture(true);
    setbouton2(false)
  };



const handleBio = async (ev) => {
  ev.preventDefault();
  try {
    const response = await axios.put(
      `http://localhost:8000/users/bio/${userId}`,
      {
        bio: bio
      },
      {
        withCredentials: true,
      }
    );
    const updatedUser = { ...user, bio: bio }; // Mettre à jour la bio dans l'objet utilisateur
    setUser(updatedUser); // Mettre à jour l'état de l'utilisateur avec la bio mise à jour
    setBio(""); // Réinitialiser la valeur de bio après l'envoi
    setChangeBio(false); // Désactiver le mode de modification de la bio
    setbouton1(true); // Réactiver le bouton de modification de la bio
  } catch (error) {
    console.log(error);
    Navigate(`/users/${userId}`);
  }
};

const handlePicture = async (ev) => {
  ev.preventDefault();
  try {
    const response = await axios.put(
      `http://localhost:8000/users/picture/${userId}`,
      {
        picture: picture
      },
      {
        withCredentials: true,
      }
    );
    const updatedUser = { ...user, picture: picture }; // Mettre à jour la bio dans l'objet utilisateur
    setUser(updatedUser); // Mettre à jour l'état de l'utilisateur avec la bio mise à jour
    setPicture(""); // Réinitialiser la valeur de bio après l'envoi
    setChangePicture(false); // Désactiver le mode de modification de la bio
    setbouton2(true); // Réactiver le bouton de modification de la bio
  } catch (error) {
    console.log(error);
    Navigate(`/users/${userId}`);
  }
};


  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div className="profile">
        <h1 className="username">{user.username}</h1>
        <div className="profile-content">
        <div className="profile-container">
          <img className="profile-pic" src={user.picture} alt={user.username} />
          {amIOwner && bouton2 ? <button className="my-button" onClick={handlePicture1}>Modifier la photo</button> : null}
            {changePicture ? (
              <form onSubmit={handlePicture}>
                <input
                  type="text"
                  placeholder="lien de l'image"
                  value={picture}
                  onChange={(ev) => setPicture(ev.target.value)}
                />
                <button className="my-button" type="submit" onClick={handlePicture}>
                  Enregistrer
                </button>
              </form>
    ) : null}
    </div>
          <div className="profile-container">
            <p className="article-description">{user.bio}</p>
            {amIOwner && bouton1 ? <button className="my-button" onClick={handleBio1}>Modifier la bio</button> : null}
            {changeBio ? (
              <form onSubmit={handleBio}>
                <input
                  type="text"
                  placeholder="bio ..."
                  value={bio}
                  onChange={(ev) => setBio(ev.target.value)}
                />
                <button className="my-button" type="submit" onClick={handleBio}>
                  Enregistrer
                </button>
              </form>
    ) : null}
            <p className="date">Compte créé le : {formatDate(user.createdAt)}</p>
          </div>
        </div>
      </div>
      {likes.length === 0 ? (
        <p className="latest">Pas d'articles aimés</p>
      ) : (
        <div className="index">
          <p className="latest">Articles likés :</p>
          <div className="container">
            {likes.map((like) => (
              <ArticleCard key={like} id={like} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ArticleCard({ id }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Récupérer les détails de l'article depuis l'API en utilisant l'ID
    fetch(`http://localhost:8000/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Mettre à jour le state avec les détails de l'article récupéré
        setArticle(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  if (!article) {
    return <p>Loading article...</p>;
  }

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div className="article">
        <Link to={`/articles/${article._id}`}>
          <img className="article-image" src={article.picture} alt={article.titre} />
        </Link>
        <Link to={`/articles/${article._id}`}>
          <h2 className="title">{article.titre}</h2>
        </Link>
        <p className="date">Published on: {formatDate(article.createdAt)}</p>
        <p className="description">{article.description}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
