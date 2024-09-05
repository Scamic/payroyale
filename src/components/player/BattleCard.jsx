import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCrown } from 'react-icons/fa';
import './clashRoyaleTheme.css';

const ClashRoyaleCard = ({ playerTag }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:8080'
  : 'https://payroyale-production.up.railway.app';

  useEffect(() => {
    if (!playerTag) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/battle-data?tag=${playerTag}`);
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
        const userDeck = team[0]?.cards;
        const opponentDeck = opponent[0]?.cards;

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
                  {userDeck ? (
                    userDeck.map((card) => (
                      <div key={card.id} className="card-slot">
                        {card.iconUrls?.medium ? (
                          <img src={card.iconUrls.medium} alt={card.name} className="card-image" />
                        ) : (
                          <div>No card image available</div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div>No data found</div>
                  )}
                </div>

                {/* Opponent Deck */}
                <div className="deck opponent-deck">
                  {opponentDeck ? (
                    opponentDeck.map((card) => (
                      <div key={card.id} className="card-slot">
                        {card.iconUrls?.medium ? (
                          <img src={card.iconUrls.medium} alt={card.name} className="card-image" />
                        ) : (
                          <div>No card image available</div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div>No data found</div>
                  )}
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
