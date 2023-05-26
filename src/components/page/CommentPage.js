import React, {useState, useEffect} from "react";
import {useNavigate,Link} from "react-router-dom";
import "../../styles/CommentPage.css";
import axios from 'axios';

function CommentPage({id, isAdmin, setisAdmin}) {
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCommentaires = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/commentaires`, {});
                console.log(response.data);

                if (response.data.errors) { // Handle errors appropriately
                } else {
                    setComments(response.data);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchCommentaires();
    }, [id]);

    const handleDeleteComment = async (commentId, index) => {
      try {
        // Envoyer une requête de suppression du commentaire avec l'ID du commentaire
        await axios.delete(`http://localhost:8000/commentaires/${commentId}`, { withCredentials: true });
    
        // Mettre à jour la liste des commentaires en supprimant le commentaire supprimé
        const updatedComments = [...comments];
        updatedComments.splice(index, 1);
        setComments(updatedComments);
        navigate(`/comments`);
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

    return (
        <div className="comments">
          {comments.length === 0 ? (
            <p>Aucun commentaire disponible.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id}>
                <Link to={`http://localhost:3000/users/${comment.user}`}>
                  <h2 className="comment-user">{comment.user}</h2>
                </Link>
                <div className="comment-content">
                  <p className="comment-date">
                    Published on: {formatDate(comment.createdAt)}
                  </p>
                  <Link to={`http://localhost:3000/articles/${comment.article}`}>
                    <p className="comment-text">{comment.commentaire}</p>
                  </Link>
                </div>
                {isAdmin && (
                  <button
                    className="tooltip"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    <svg viewBox="0 0 448 512" class="svgIcon">
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      );
}

export default CommentPage;
