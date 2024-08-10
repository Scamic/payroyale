import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Spinner from "./Spinner"
const avatars = [
  '/avatars/avatar.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
  '/avatars/avatar5.png',
  '/avatars/avatar6.png',
];

const getRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

const ClashRoyaleTable = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/clan-members");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
    
    // Set a 4-second loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, []);

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="bg-gradient-to-br from-yellow-100 via-pink-200 to-purple-300 py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Player Payment Information
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg bg-white shadow-lg">
            <thead className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-t-lg">
              <tr>
                <th className="w-10">
                  <label>
                    <input type="checkbox" className="checkbox rounded-full" />
                  </label>
                </th>
                <th className="text-left">Avatar</th>
                <th className="text-left">Name</th>
                <th className="text-left">🥇Trophies</th>
                <th className="text-left">💵Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-gradient-to-br from-indigo-100 via-purple-200 to-gray-300">
              {players.map((player, index) => (
                <tr key={index} className="hover:bg-indigo-200 transition-colors duration-300 ease-in-out">
                  <td className="w-10 text-center">
                    <label>
                      <input type="checkbox" className="checkbox rounded-full" />
                    </label>
                  </td>
                  <td className="py-4 px-6 flex items-center gap-4">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={getRandomAvatar()} // Display random avatar
                        alt="Player Avatar" 
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-bold">{player.name}</div>
                      <div className="text-sm opacity-50">{player.country}</div>
                    </div>
                  </td>
                  <td className="py-4 ">
                    {player.role}
                    <br />
                    <span className="badge badge-ghost badge-sm">{player.jobTitle}</span>
                  </td>
                  <td className="py-4 px-6">{player.trophies}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${player.paymentStatus === 'Pending' ? 'bg-gray-200 text-gray-800' : 'bg-green-200 text-green-800'}`}>
                      {player.paymentStatus === 'Pending' ? (
                        <>
                          <FaTimesCircle className="mr-1" /> Payment Pending
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="mr-1" /> Payment Completed
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
           
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClashRoyaleTable;
