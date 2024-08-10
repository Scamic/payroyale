import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCrown } from 'react-icons/fa';
import './clashRoyaleTheme.css';

const ClashRoyaleCard = ({ playerTag }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { playerTag } = useParams();

  useEffect(() => {
    if (!playerTag) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/battle-data?tag=${playerTag}`);
        const parsedData = JSON.parse(response.data.match(/1:(\{.*\})/)[1]);
        setData(parsedData.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playerTag]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cards-container">
      {data.map((battle, index) => {
        const { team, opponent, gameMode, arena } = battle;
        const userDeck = team[0].cards;
        const opponentDeck = opponent[0].cards;

        return (
          <div key={index} className="clash-royale-card">
            <div className="card-content">
              {/* Card Header */}
              <div className="card-info">
                <h3>{gameMode.name}</h3>
                <p>{arena.name}</p>
                <div className="score-container">
                  <div className="score">
                    <FaCrown /> {team[0].crowns}
                  </div>
                  <div className="score">
                    <FaCrown /> {opponent[0].crowns}
                  </div>
                </div>
              </div>

              {/* Decks Section */}
              <div className="decks-container">
                {/* User Deck */}
                <div className="deck user-deck">
                  {userDeck.map((card) => (
                    <div key={card.id} className="card-slot">
                      <img src={card.iconUrls.medium} alt={card.name} className="card-image" />
                    </div>
                  ))}
                </div>

                {/* Opponent Deck */}
                <div className="deck opponent-deck">
                  {opponentDeck.map((card) => (
                    <div key={card.id} className="card-slot">
                      <img src={card.iconUrls.medium} alt={card.name} className="card-image" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClashRoyaleCard;
