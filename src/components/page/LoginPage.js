import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../../styles/LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginPage({ isLoggedIn,setIsLoggedIn, setUserId, setisAdmin,isAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  


  const login = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios.post(
        `https://true-crime-story-back.onrender.com/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );


      if (response.data.errors) {
        setErrorMessage("Erreur lors de la connexion");
      } else {

        localStorage.setItem("jwtToken", token); // Vous pouvez également utiliser sessionStorage
        localStorage.setItem('_id', response.data._id);
        localStorage.setItem('Admin', response.data.Admin);
        setIsLoggedIn(true);
        setRedirect(true); // Définir la redirection
        // Enregistrer le token dans localStorage ou sessionStorage
        

        const response2 = await axios.get(
          `https://true-crime-story-back.onrender.com/users/mail/${email}`,
          {
            withCredentials: true,
          }
        );
        setUserId(response2.data._id);
        setisAdmin(response2.data.Admin);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Informations incorrectes");
    }
  };
  
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
          <form onSubmit={login}>
            <h1 className="login-title">Login</h1>
            <input
              type="email"
        placeholder="Email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="my-button" type="submit">
        Connexion
      </button>
      <Link to="/register">
        <button className="my-button">Pas de compte ?</button>
      </Link>
    </form>
  );
}

export default LoginPage;
