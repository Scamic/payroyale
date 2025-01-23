import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './deck.css'; // Ensure you have a styles.css file for custom styling


const BattleData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:8080'
  : 'https://payroyale-backend.vercel.app';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/battle-data`);
        // console.log('Raw response data:', response.data);

        // Parsing the string into a JSON object
        const parsedData = JSON.parse(response.data.match(/1:(\{.*\})/)[1]);

        // Logging parsed data to ensure correct parsing
        // console.log('Parsed data:', parsedData);

        setData(parsedData);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="card-container">
      {data && Object.keys(data).map((key) => (
        <div key={key} className="card">
          <h2 className="card-title">{key}</h2>
          <div className="card-body">
            {/* Handle cases where data[key] might not be an array */}
            {Array.isArray(data[key]) ? (
              data[key].map((item, index) => (
                <div key={index} className="card-item">
                  <p className="item-key">Item {index + 1}:</p>
                  <pre className="item-value">{JSON.stringify(item, null, 2)}</pre>
                </div>
              ))
            ) : (
              <div className="card-item">
                <p className="item-key">Data:</p>
                <pre className="item-value">{JSON.stringify(data[key], null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BattleData;
