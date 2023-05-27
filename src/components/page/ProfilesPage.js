import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import '../../styles/ProfilePage.css';

function ArticlesPage({ setIsLoggedIn, setUserId, isAdmin }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer tous les utilisateurs depuis l'API
    fetch('https://true-crime-story-back.onrender.com/users')
      .then(response => response.json())
      .then(data => {
        // Mettre à jour le state avec les utilisateurs récupérés
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

  const handleDeleteUser = async (userId, index) => {
    try {
      // Envoyer une requête de suppression de l'utilisateur avec l'ID de l'utilisateur
      await axios.delete(`https://true-crime-story-back.onrender.com/users/${userId}`, { withCredentials: true });

      // Mettre à jour la liste des utilisateurs en supprimant l'utilisateur supprimé
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
      navigate(`/users`);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="index">
      <h3 className="tous">Tous les utilisateurs :</h3>
      <div className="profile">
        {users.map((user, index) => (
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
                {isAdmin && (
                  <button
                    className="tooltip"
                    onClick={() => handleDeleteUser(user._id, index)}
                  >
                    <svg viewBox="0 0 448 512" className="svgIcon">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesPage;
