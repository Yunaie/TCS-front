import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "../../styles/ArticlePage.css";
import ChargementPage from "./ChargementPage";
import axios from 'axios';


function ArticlePage({isLoggedIn, setIsLoggedIn, userId, setUserId,isAdmin,setisAdmin}) {
    const {id} = useParams();
    const [article, setArticle] = useState(null);
    const [articleLiked, setArticleLiked] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/articles/${id}`);
                setArticle(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchArticle();
    }, [id]);

    useEffect(() => {
        const fetchLikedArticles = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/users/like/${userId}`);
                if (response.status === 200) {
                    const likedArticles = response.data;
                    setArticleLiked(likedArticles.includes(id));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchLikedArticles();
    }, [userId, id]);

    const handleLike = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/users/like/${userId}`, {articleId: article._id});

            if (response.status === 200) {
                setArticleLiked(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnlike = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/users/unlike/${userId}`, {articleId: article._id});

            if (response.status === 200) {
                setArticleLiked(false);
            }
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

    if (!article) {
        return (
            <div>
                <ChargementPage/>
            </div>
        );
    }
    console.log(userId)
    return (
        <div className="container2">
            <img className="article-img"
                src={
                    article.picture
                }
                alt={
                    article.titre
                }/>
            <h2 className="article-title">
                {
                article.titre
            }</h2>
            <p className="article-description">
                {
                article.description
            }</p>
            <p className="date">Published on: {
                formatDate(article.createdAt)
            }</p>
            <p className="markdown">
                {
                article.markdown
            }</p>
            <div className="like">{
            isLoggedIn && (
                <button className={
                        articleLiked ? "btn-like filled" : "btn-like"
                    }
                    onClick={
                        articleLiked ? handleUnlike : handleLike
                }>
                    <svg className="icon" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
                    </svg>
                     </button>
            )
        }</div>
            <div>
                <CommentPag id={
                        article._id
                    }
                    userId={userId}
                    isLoggedIn={isLoggedIn}/>
            </div>
        </div>
    );
}
function CommentPag({id, userId, isLoggedIn}) {
    const [comments, setComments] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [comment, setComment] = useState("");
    const [username, setUsername] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCommentaires = async () => {
            try {
                const response = await axios.post(`http://localhost:8000/commentaires/article`, {article: id});
                console.log(response.data);

                if (response.data.errors) { // Handle errors appropriately
                } else {
                    setComments(response.data);
                    const userIds = response.data.map((comment) => comment.user);
                    fetchUserDetails(userIds);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchCommentaires();
    }, [id]);

    const formatDate = (createdAt) => {
        const date = new Date(createdAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const fetchUserDetails = async (userIds) => {
        try {
            const requests = userIds.map((userId) => axios.get(`http://localhost:8000/users/${userId}`));
            const responses = await Promise.all(requests);

            const users = responses.map((response) => {
                if (response.data.errors) { // Handle errors appropriately
                } else {
                    return response.data;
                }
            });

            setUserDetails(users);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => { // Récupérer les détails de l'utilisateur depuis l'API en utilisant l'ID
        fetch(`http://localhost:8000/users/${userId}`).then((response) => response.json()).then((data) => { // Mettre à jour le state avec les détails de l'utilisateur récupéré
            setUsername(data.username);
        }).catch((error) => {
            console.error("Error:", error);
        });
    }, [userId]);

    const handleComment = async (ev) => {
        ev.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/commentaires`, {
                user: userId,
                commentaire: comment,
                article: id
            }, {withCredentials: true});
            const newComment = response.data;
            setComments([
                ...comments,
                newComment
            ]); // Ajoute le nouveau commentaire à la liste existante
            setComment(""); // Réinitialise le champ de commentaire

            console.log(response.data);
            navigate(`/articles/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async (commentId, index) => {
        try { // Envoyer une requête de suppression du commentaire avec l'ID du commentaire
            await axios.delete(`http://localhost:8000/commentaires/${commentId}`, {withCredentials: true});

            // Mettre à jour la liste des commentaires en supprimant le commentaire supprimé
            const updatedComments = [...comments];
            updatedComments.splice(index, 1);
            setComments(updatedComments);
            //navigate(`/articles/${id}`);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="comments">
            <form className="write-comment">
                <h2 className="comment-user">
                    {username}</h2>
                {
                isLoggedIn ? (
                    <div>
                        <input type="text" placeholder="Ecrire un commentaire"
                            value={comment}
                            onChange={
                                (ev) => setComment(ev.target.value)
                            }/>
                        <button className="my-button" type="submit"
                            onClick={handleComment}>
                            Publier
                        </button>
                    </div>
                ) : null
            }

                {
                comments.map((comment, index) => (
                    <div key={
                        comment._id
                    }>
                        <h2 className="comment-user">
                            {
                            userDetails[index] ?. username
                        }</h2>
                        <div className="comment-content">
                            <img className="comment-pic"
                                src={
                                    userDetails[index] ?. picture
                                }
                                alt="User"/>
                            <p className="comment-date">Published on: {
                                formatDate(comment.createdAt)
                            }</p>
                            <p className="comment-text">
                                {
                                comment.commentaire
                            }</p>
                            {
                            comment.user === userId ? (
                                <button className="tooltip"
                                    onClick={
                                        () => handleDeleteComment(comment._id, index)
                                }>
                                    <svg viewBox="0 0 448 512" class="svgIcon">
                                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                    </svg>
                                </button>
                            ) : null
                        } </div>
                    </div>
                ))
            } </form>
        </div>
    );
}
export default ArticlePage
