
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ArticlePosterPage.css";
import axios from "axios";

function PosterCrimePage() {
  const [pays, setPays] = useState("");
  const [date, setDate] = useState("");
  const [niveau_gore, setNiveau_gore] = useState("");
  const [type, setType] = useState("");
  const [criminel, setCriminel] = useState("");
  const [victime, setVictime] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [ID, setID] = useState("");
  const [fait, setFait] = useState(false);
  const navigate = useNavigate();

  const crime = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios.post(
        `https://true-crime-story-back.onrender.com/crimes`,
        {
          pays,
          niveau_gore,
          type,
          date,
          criminel,
          victime
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
    <div>
      {fait ?  (
        <div>
          <p className="latest">Voici l'id du crime créé : {ID}</p>
          <button className="my-button" onClick={handleClick}>
            Retour
          </button>
        </div>
      ) : (
        <form onSubmit={crime}>
          <h1 className="article-titre">pays</h1>
          <input
            type="text"
            placeholder="pays"
            value={pays}
            onChange={(ev) => setPays(ev.target.value)}
          />

          <h1 className="article-titre">niveau_gore</h1>
          <input
            type="text"
            placeholder="niveau-gore"
            value={niveau_gore}
            onChange={(ev) => setNiveau_gore(ev.target.value)}
          />
          <h1 className="article-titre">type</h1>
          <input
            type="text"
            placeholder="type"
            value={type}
            onChange={(ev) => setType(ev.target.value)}
          />
          <h1 className="article-titre">date</h1>
          <input
            type="text"
            placeholder="JJ-MM-AA"
            value={date}
            onChange={(ev) => setDate(ev.target.value)}
          />
          <h1 className="article-titre">criminel</h1>
          <input
            type="text"
            placeholder="id du criminel"
            value={criminel}
            onChange={(ev) => setCriminel(ev.target.value)}
          />
          <h1 className="article-titre">victime</h1>
          <input
            type="text"
            placeholder="id de la victime"
            value={victime}
            onChange={(ev) => setVictime(ev.target.value)}
          />
          <button className="my-button" type="submit">
            Poster
          </button>
        </form>
      )}
    </div>
  );
}

export default PosterCrimePage;
