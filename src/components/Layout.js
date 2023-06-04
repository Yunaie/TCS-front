import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import '../styles/Layout.css';
import skull from '../assets/bg3.gif';

function Layout({ isLoggedIn, setIsLoggedIn, userId, setUserId, isAdmin, setisAdmin }) {
  const title_header = "True Crime Story";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      setisAdmin(false);
      window.location.reload();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  console.log(userId)

  return (
    <div>
      <header>
        <div className="main-title">
          <h1>{title_header}</h1>
        </div>
        <nav>
          <ul className="side-bar">
            {isLoggedIn && !isAdmin && (
              <>
                <li>
                  <Link to="/">Accueil</Link>
                </li>
                <li>
                  <Link to={`/users/${userId}`}>Profil</Link>
                </li>
                <li>
                  <Link to="/articles">Articles</Link>
                </li>
                <li>
                  <Link to="/infos">Infos</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Déconnexion</button>
                </li>
              </>
            )}
            {!isLoggedIn && !isAdmin && (
              <>
                <li>
                  <Link to="/">Accueil</Link>
                </li>
                <li>
                  <Link to="/login">Connexion</Link>
                </li>
                <li>
                  <Link to="/articles">Articles</Link>
                </li>
                <li>
                  <Link to="/infos">Infos</Link>
                </li>
              </>
            )}
            </ul>
            <ul className="admin" >
            {isAdmin && (
              <>
                <li>
                  <Link to="/">Accueil</Link>
                </li>
                <li>
                  <Link to="/articles">Articles</Link>
                </li>
                <li>
                  <Link to="/infos">Infos</Link>
                </li>
                <li>
                  <Link to={`/users/${userId}`}>Profil</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <li>
                  <Link to="/comments">Comments</Link>
                </li>
                <li>
                  <Link to="/poster">Poster</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Déconnexion</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <div className='content'>
        <Outlet />
      </div>
      <img src={skull} className="image-skull" alt="skull-gif" />
    </div>
  );
}

export default Layout;
