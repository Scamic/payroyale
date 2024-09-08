import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaTrophy, FaBolt, FaShieldAlt } from 'react-icons/fa';
import { SiElixir } from 'react-icons/si';
import './playerinfo.css';
import BattleCard from "./BattleCard";
import env from "react-dotenv";


export default function PlayerInfo() {
  const [playerInfo, setPlayerInfo] = useState(null);
  const { playerLink } = useParams();

  const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:8080'
  : 'https://payroyale-production.up.railway.app';

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const response = await axios.get(`${baseURL}/clan-members-with-logs-playerinfo?playerLink=${playerLink}`);
        setPlayerInfo(response.data);
      } catch (error) {
        console.error('Error fetching player info:', error);
      }
    };

    fetchPlayerInfo();
  }, [playerLink]);

  if (!playerInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="clash-royale-bg p-8 rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <img src="/avatars/avatar.png" alt="Player Avatar" className="h-16 w-16 rounded-full" />
        <div>
          <h3 className="text-3xl font-bold text-yellow-500">{playerInfo.playerName || 'Unknown Player'}</h3>
          <p className="text-lg text-gray-300">Clan Role: {playerInfo.role || 'Unknown Role'}</p>
          <p className="text-lg text-gray-300">Level: {playerInfo.level || 'N/A'}</p>
          <p className="text-lg text-gray-300">Last Seen: {playerInfo.lastseen || 'Unknown'}</p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 text-white">
        {playerInfo.trophies && (
          <div className="clash-royale-card">
            <FaTrophy size={30} className="text-yellow-400" />
            <div className="mt-2">
              <p className="text-2xl font-semibold">{playerInfo.trophies}</p>
              <p>Trophies</p>
            </div>
          </div>
        )}
        {!playerInfo.trophies && (
          <div className="clash-royale-card  bg-gray-400">
            <FaTrophy size={30} className="text-gray-400" />
            <div className="mt-2">
              <p className="text-2xl font-semibold">{playerInfo.trophies}</p>
              <p>❌Trophies</p><b className='text-red-500'>Player Might Have LEFT The Clan</b>
            </div>
          </div>
        )}
        {playerInfo.avgElixir && (
          <div className="clash-royale-card">
            <SiElixir size={30} className="text-purple-400" />
            <div className="mt-2">
              <p className="text-2xl font-semibold">{playerInfo.avgElixir}</p>
              <p>Avg Elixir</p>
            </div>
          </div>
        )}
        {playerInfo.decksUsed && (
          <div className="clash-royale-card">
            <FaShieldAlt size={30} className="text-blue-400" />
            <div className="mt-2">
              <p className="text-2xl font-semibold">{playerInfo.decksUsed}</p>
              <p>Decks Used</p>
            </div>
          </div>
        )}
        {playerInfo.fame && (
          <div className="clash-royale-card">
            <FaBolt size={30} className="text-red-400" />
            <div className="mt-2">
              <p className="text-2xl font-semibold">{playerInfo.fame}</p>
              <p>Fame</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8">
        <h4 className="text-2xl font-bold text-yellow-400">Player Bio</h4>
        <p className="text-lg text-gray-200 mt-4">
          {playerInfo.bio ? playerInfo.bio : "This player hasn't added a bio yet."}
        </p>
      </div>
      <BattleCard playerTag={playerInfo.playertag || playerLink} />
    </div>
  );
}
