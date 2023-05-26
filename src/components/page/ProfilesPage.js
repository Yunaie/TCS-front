import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../styles/ProfilePage.css';

function ArticlesPage({ IsLoggedIn,setIsLoggedIn,userId, setUserId,isAdmin,setisAdmin }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Récupérer tous les articles depuis l'API
    fetch('http://localhost:8000/users')
      .then(response => response.json())
      .then(data => {
        // Mettre à jour le state avec les articles récupérés
        setUsers(data);
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


  return (
    <div className="index">
  <h3 className="tous">Tous les users :</h3>
  <div className="profile">
    {users.map(user => (
      <div className="user" key={user._id}>
        <Link to={`/users/${user._id}`}>
          <h1 className="username">{user.username}</h1>
        </Link>
        <div className="profile-content">
          <Link to={`/users/${user._id}`}>
            <img className="profile-pic" src={user.picture} alt={user.username} />
          </Link>
          <div className="profile-container ">
            <p className="date">created on: {formatDate(user.createdAt)}</p>
            <p className="bio">{user.bio}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default ArticlesPage;
