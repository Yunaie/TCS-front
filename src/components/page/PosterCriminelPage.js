import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ArticleposterPage.css";
import axios from "axios";

function PosterVictimePage() {
  const [name, setName] = useState("");
  const [nationalite, setNationalite] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [peine_de_prison, setPeine_de_prison] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [ID, setID] = useState("");
  const [fait, setFait] = useState(false);
  const navigate = useNavigate();

  const criminel = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios.post(
        `https://true-crime-story-back.onrender.com/criminels`,
        {
          name,
          nationalite,
          date_of_birth,
          peine_de_prison
        },
        {
          withCredentials: true,
        }
      );

      setID(response.data._id);
      setFait(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = () => {
    setFait(false);
    setRedirect(true);
  };

  if (redirect) {
    navigate('/poster');
  }

  return (
    <div className="all">
      {fait ?  (
        <div>
          <p className="latest">Voici l'id du criminel créé : {ID}</p>
          <button className="my-button" onClick={handleClick}>
            Retour
          </button>
        </div>
      ) : (
        <form onSubmit={criminel} className="crime-form">
          <h1 className="article-titre"></h1>
          <input
            type="text"
            placeholder="nom"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />

          <h1 className="article-titre"></h1>
          <input
            type="text"
            placeholder="nationalité"
            value={nationalite}
            onChange={(ev) => setNationalite(ev.target.value)}
          />
          <h1 className="article-titre"></h1>
          <input
            type="text"
            placeholder=" date de naissance JJ-MM-AA"
            value={date_of_birth}
            onChange={(ev) => setDate_of_birth(ev.target.value)}
          />
          <h1 className="article-titre"></h1>
          <input
            type="text"
            placeholder="peine de prison JJ-MM-AA"
            value={peine_de_prison}
            onChange={(ev) => setPeine_de_prison(ev.target.value)}
          />
          <button className="my-button" type="submit">
            Poster
          </button>
        </form>
      )}
    </div>
  );
}

export default PosterVictimePage;
