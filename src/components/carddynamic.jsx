import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./badge.css";
import { useNavigate } from 'react-router-dom';
import { FaTrophy } from 'react-icons/fa';
import { MdAdd } from "react-icons/md";
import { IoArrowForwardOutline } from "react-icons/io5";
import badgeImage from '/clanpic.jpeg';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [fameFilter, setFameFilter] = useState(0);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/test/admin",
          { withCredentials: true }
        );

        if (response.data === "Admin Content.") {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    verifyToken();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/clan-members-with-logs");
        const sortedPosts = response.data.sort((a, b) => b.fame - a.fame); // Sorting posts by Fame in decreasing order
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const currentDate = new Date().toLocaleDateString();

  const navigate = useNavigate();

  const handleAddPlayerinfo = () => {
    navigate('/addpaymentinfo');
  };

  const handleViewPlayerinfo = (playerLink) => {
      // This should log the playerLink, not an event object
      // console.log('Player link:', playerLink);
    
    navigate(`/playerinfo${playerLink}`);
  };
  

  const handleFameFilterChange = (e) => {
    setFameFilter(e.target.value);
  };

  return (
    <div className="bg-slate-100 py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-56 h-56 bg-violet-400 rounded-full mix-blend-screen filter blur-2xl opacity-60 top-1/4 left-1/3 transform -translate-x-1/2 animate-horizontal-blob"></div>
        <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-screen filter blur-2xl opacity-60 bottom-0 mb-26 right-1/2 transform translate-x-1/2 animate-horizontal-blob"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            className="text-gray-900 text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 underline-animation p-4"
            data-aos="fade-up"
          >
            Player Information
          </h2>
          <p
            className="mt-2 text-lg leading-8 text-gray-700"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Highest scoring Clan in Clash Royale
          </p>
          <div className="mt-4">
            <label htmlFor="fameFilter" className="block text-lg font-medium text-gray-700">
              Filter by Fame:
            </label>
            <input
              type="number"
              id="fameFilter"
              value={fameFilter}
              onChange={handleFameFilterChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter minimum Fame value"
            />
          </div>
        </div>
        <div className="mx-auto mt-4 sm:mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 relative z-10">
          {posts
            .filter((post) => post.fame >= fameFilter)
            .map((post, index) => (
              <article
                key={index}
                className="flex max-w-xl flex-col items-start justify-between"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg border border-gray-700 p-8 w-full">
                  <img src="/image.png" style={{ width: 90 }} alt="Badge" className="badge-image" />
                  <img src={badgeImage} style={{ marginRight: 100 }} alt="Badge" className="badge-image" />
                  <div className="flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={new Date().toISOString()}
                      className="text-yellow-500"
                    >
                      {currentDate}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-700 px-3 py-1.5 font-medium text-gray-200">
                      Payment
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-sky-100 bg-purple-400/10 group-hover:bg-violet-400/10">
                      <span className="absolute inset-0" />
                      {post.playerName.toUpperCase()} #{post.playerLink.replace("/player/","")}
                    </h3>
                    <div className="mt-5 flex items-center gap-x-2 text-yellow-300">
                      <FaTrophy size={20} />
                      <span className="text-sm">{post.trophies}</span>
                    </div>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-red-200 bg-red-400/10 group-hover:bg-violet-400/10">
                      Decks Used: {post.decksUsed}
                    </p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-emerald-300 bg-emerald-400/10 group-hover:bg-violet-400/10">
                      Avg Elixir: {post.avgElixir}
                    </p>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-yellow-300 bg-yellow-400/10 group-hover:bg-violet-400/10">
                      Fame: {post.fame}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img
                      alt=""
                      src="/avatars/avatar.png"
                      className="h-10 w-15 rounded-full bg-gray-800"
                    />
                    <div className="text-sm leading-6">
                      {isAuthorized ? (
                        <div>
                          <button onClick={handleAddPlayerinfo} className="font-semibold text-white bg-emerald-500 hover:bg-indigo-600 px-3 py-2 rounded-md flex items-center gap-2">
                            Add/Update Payment Info <MdAdd size={20} />
                          </button>
                          <button style={{marginTop:3}} onClick={() => handleViewPlayerinfo(post.playerLink)} className="font-semibold text-white bg-yellow-500 px-3 py-2 rounded-md flex items-center gap-2">
                            View Player Info <IoArrowForwardOutline size={20} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => handleViewPlayerinfo(post.playerLink)} className="font-semibold text-white bg-yellow-500 px-3 py-2 rounded-md">
                          View Player Info 
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </div>
  );
}
