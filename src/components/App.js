import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import ArticlesPage from './page/ArticlesPage';
import ArticlePage from './page/ArticlePage';
import InfoPage from './page/InfoPage';
import ProfilePage from './page/ProfilePage';
import ProfilesPage from './page/ProfilesPage';
import '../styles/Reset.css';
import IndexPage from './page/IndexPage';
import Layout from './Layout';
import CommentPage from './page/CommentPage';
import PosterPage from './page/PosterPage';
import PosterArticlePage from './page/PosterArticlePage';
import PosterCrimePage from './page/PosterCrimePage';
import PosterVictimePage from './page/PosterVictimePage';
import PosterCriminelPage from './page/PosterCriminelPage';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState( (localStorage.getItem("jwtToken") != null ) )
  const [isAdmin,setisAdmin] = useState((localStorage.getItem("Admin") != null ) );
  const [userId, setUserId] = useState((localStorage.getItem("_id") != null ));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId}
              isAdmin = {isAdmin}
              setisAdmin = {setisAdmin}
            />
          }
        >
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/login"
            element={
              <LoginPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userId={userId}
              setUserId={setUserId}
              isAdmin = {isAdmin}
              setisAdmin = {setisAdmin}
              />
            }
          />
          <Route path="/register" element={<RegisterPage  
               isLoggedIn={isLoggedIn}
               setIsLoggedIn={setIsLoggedIn}
               userId={userId}
               setUserId={setUserId}
               isAdmin = {isAdmin}
               setisAdmin = {setisAdmin}
               />
            } 
              />
          <Route path="/articles" element={<ArticlesPage  
           isLoggedIn={isLoggedIn}
           setIsLoggedIn={setIsLoggedIn}
           userId={userId}
           setUserId={setUserId}
           isAdmin = {isAdmin}
           setisAdmin = {setisAdmin}
               />} />
          <Route path="/articles/:id" element={<ArticlePage 
               isLoggedIn={isLoggedIn}
               setIsLoggedIn={setIsLoggedIn}
               userId={userId}
               setUserId={setUserId}
               isAdmin = {isAdmin}
               setisAdmin = {setisAdmin}
              />} />
              <Route path="/poster" element={<PosterPage  
           isLoggedIn={isLoggedIn}
           setIsLoggedIn={setIsLoggedIn}
           userId={userId}
           setUserId={setUserId}
           isAdmin = {isAdmin}
           setisAdmin = {setisAdmin}
               />} />
               <Route path="/poster/article" element={<PosterArticlePage  
           isLoggedIn={isLoggedIn}
           setIsLoggedIn={setIsLoggedIn}
           userId={userId}
           setUserId={setUserId}
           isAdmin = {isAdmin}
           setisAdmin = {setisAdmin}
               />} />
               <Route path="/poster/crime" element={<PosterCrimePage  
           isLoggedIn={isLoggedIn}
           setIsLoggedIn={setIsLoggedIn}
           userId={userId}
           setUserId={setUserId}
           isAdmin = {isAdmin}
           setisAdmin = {setisAdmin}
               />} />
               <Route path="/poster/victime" element={<PosterVictimePage  
           isLoggedIn={isLoggedIn}
           setIsLoggedIn={setIsLoggedIn}
           userId={userId}
           setUserId={setUserId}
           isAdmin = {isAdmin}
           setisAdmin = {setisAdmin}
               />} />
               <Route path="/poster/criminel" element={<PosterCriminelPage  
           isLoggedIn={isLoggedIn}
           setIsLoggedIn={setIsLoggedIn}
           userId={userId}
           setUserId={setUserId}
           isAdmin = {isAdmin}
           setisAdmin = {setisAdmin}
               />} />
          <Route path="/infos" element={<InfoPage  
           isLoggedIn={isLoggedIn}
           setIsLoggedIn={setIsLoggedIn}
           userId={userId}
           setUserId={setUserId}
           isAdmin = {isAdmin}
           setisAdmin = {setisAdmin}
               />} />
          <Route path="/users/:id" element={<ProfilePage 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userId={userId}
            setUserId={setUserId}
            isAdmin = {isAdmin}
            setisAdmin = {setisAdmin}
               />} />
          <Route path="/users" element={<ProfilesPage  
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userId={userId}
          setUserId={setUserId}
          isAdmin = {isAdmin}
          setisAdmin = {setisAdmin}
               />} />
          <Route path="/comments" element={<CommentPage  
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userId={userId}
          setUserId={setUserId}
          isAdmin = {isAdmin}
          setisAdmin = {setisAdmin}
               />} />     
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
