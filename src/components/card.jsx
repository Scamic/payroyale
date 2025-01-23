import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./badge.css";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";

import { IoArrowForwardOutline } from "react-icons/io5";
import badgeImage from "/clanpic.jpeg";
import FilterComponent from "./rewardsfilter";
import Spline from "@splinetool/react-spline";

import HyperText from "./ui/hypertextutility";
import Meteors from "./ui/meteorutility";

export default function Blog() {
  const [paylink, setPaylink] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [fameFilter, setFameFilter] = useState(0);
  const [filterValues, setFilterValues] = useState({
    day: "4 days",
    fameRewards: [
      { score: 3500, reward: "$10" },
      { score: 3400, reward: "$8" },
      { score: 3200, reward: "$3" },
      { score: 3500, reward: "$10" },
      { score: 3400, reward: "$8" },
     
    ],
  });

  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : "https://payroyale-backend.vercel.app";

   const frontendURL = window.location.hostname === 'localhost'
  ? 'http://localhost:5173'
  : 'https://payroyale.vercel.app';

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/test/admin`, {
          withCredentials: true,
        });
        console.log(response.data);
        setIsAuthorized(response.data === "Admin Content.");
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
        // Fetching battle logs

        const response = await axios.get(`${baseURL}/battle-logs`);
        const sortedPosts = response.data.sort((a, b) => b.fame - a.fame);

        // Fetching paylinks for each player
        const updatedPosts = await Promise.all(
          sortedPosts.map(async (post) => {
            const playerTag = post.playerLink.split("/player/")[1];
            try {
              const response2 = await axios.get(
                `${baseURL}/admin/getplayerpaylink/${playerTag}`
              );

              // Check if the paylink exists in the response data
              const paylink = response2.data.paylink || null;
              return {
                ...post,
                paylink,
              };
            } catch (error) {
              // If the paylink is not found or any other error occurs, handle it here
              console.error(
                `Error fetching paylink for playerTag ${playerTag}:`,
                error
              );
              return { ...post, paylink: null }; // Set to null if there's an error
            }
          })
        );

        setPosts(updatedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const currentDate = "SampleDate";
  const navigate = useNavigate();

  const handleViewPlayerinfo = (playerLink) => {
    navigate(`/playerinfo${playerLink}`);
  };

  const copyToClipboard = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert(`${value} copied to clipboard!`);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const handleFameFilterChange = (e) => {
    setFameFilter(e.target.value);
  };

  const handleFilterValuesChange = (newValues) => {
    setFilterValues(newValues);
  };

  const handleDownloadCsv = () => {
    const csvHeaders = [
      "Rank",
      "Player Name",
      "Player Link",
      "Decks Used",
      "Boat Attacks",
      "Score",
      "Rewards",
    ];

    const csvRows = posts.map((post) => {
      const reward = filterValues.fameRewards.find(
        (reward) => post.fame >= reward.score
      )?.reward;

      return [
        post.rank,
        post.playerName,
        post.playerLink,
        post.decksUsed,
        post.boatAttacks,
        post.fame,
        reward || "No Reward",
      ];
    });

    let csvContent =
      "data:text/csv;charset=utf-8," +
      csvHeaders.join(",") +
      "\n" +
      csvRows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "player_info.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };
  // filter mobile view
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const closeFilter = () => {
    setIsFilterVisible(false);
  };

  return (
    <div className="bg-slate-100 py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-56 h-56 bg-violet-400 rounded-full mix-blend-screen filter blur-2xl opacity-60 top-1/4 left-1/3 transform -translate-x-1/2 animate-horizontal-blob"></div>
        <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-screen filter blur-2xl opacity-60 bottom-0 mb-26 right-1/2 transform translate-x-1/2 animate-horizontal-blob"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex justify-between">
          <div className="mx-auto max-w-2xl lg:mx-0">
            {/* text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 */}

            <HyperText
              className="
    text-3xl 
    sm:text-4xl 
    md:text-5xl 
    lg:text-6xl 
    font-bold 
    mb-4 
    text-slate-700
   
   
  "
              data-aos="fade-up"
              text="Player Information"
            />

            <sup
              className="mt-2 ml-1 text-lg leading-8 text-gray-700"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Highest Paying Clan in Clash Royale
            </sup>
            <div className="flex-1 h-80">
              <Spline scene="https://prod.spline.design/Tq3GXrdFsh0GS6WM/scene.splinecode" />
            </div>
          </div>
{/* // filter start */}


          <div>
      {/* For laptop/desktop screens */}
      <div className="hidden lg:block">
        <FilterComponent
          filterValues={filterValues}
          onFilterValuesChange={handleFilterValuesChange}
          isAuthorized={isAuthorized}
        />
        {/* CSV tools */}
        <button
          onClick={handleDownloadCsv}
          className="mt-4 relative inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2"
        >
          <FaDownload className="text-white mr-2" />
          Download All Players Data as Excel
        </button>
      </div>

      {/* For mobile/small screens */}
      <div className="block lg:hidden">
        {/* Button to toggle full-screen filter and CSV popup */}
        <button
          onClick={toggleFilterVisibility}
          className="mt-4 relative inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2"
        >
          {!isFilterVisible ?  <IoMdOptions /> :""}
        </button>

        {/* Full-screen popup */}
        {isFilterVisible && (
          <div className="fixed inset-0 z-50 bg-white bg-opacity-90 overflow-auto  p-6">
            {/* Close button */}
            <button
              onClick={closeFilter}
              className="absolute top-4  right-4 text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-full  p-2 focus:outline-none"
            >
              Close
            </button>

            {/* FilterComponent */}
            <div className="mt-8">
              <FilterComponent
                filterValues={filterValues}
                onFilterValuesChange={handleFilterValuesChange}
                isAuthorized={isAuthorized}
              />
            </div>

            {/* CSV tools */}
            <button
              onClick={handleDownloadCsv}
              className="mt-8 w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2"
            >
              <FaDownload className="text-white mr-2" />
              Download All Players Data as Excel
            </button>
          </div>
        )}
      </div>
    </div>

    {/* // filter end */}
        </div>

        <div className="mt-1">
          <label
            htmlFor="fameFilter"
            className="block text-lg font-medium text-gray-700"
          >
            Filter by Fame:
          </label>
          <input
            type="number"
            id="fameFilter"
            value={fameFilter}
            onChange={handleFameFilterChange}
            className="mt-1 block w-3/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter minimum Fame value - (This Will Show All Players above This Fame value)"
          />
        </div>

        <div className="mx-auto mt-4 sm:mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 relative z-10">
          {posts
            .filter((post) => Number(post.fame) >= Number(fameFilter))
            .map((post, index) => (
              <article
                key={index}
                className="flex max-w-xl flex-col items-start justify-between"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                  <Meteors number={30} />
                  <div className="bg-gray-900 focus:outline-none rounded-lg border border-gray-700 p-8 w-full">
                    <img
                      src="/image.png"
                      style={{ width: 90 }}
                      alt="Badge"
                      className="badge-image"
                    />
                    <img
                      src={badgeImage}
                      style={{ marginRight: 100 }}
                      alt="Badge"
                      className="badge-image"
                    />
                    <div className="flex items-center gap-x-4  text-xs">
                      <time
                        dateTime={currentDate}
                        className="text-gray-500 max-sm:hidden"
                      >
                        Name
                      </time>

                      <a
                        href={
                          post.paylink ? post.paylink : "http://localhost:5173/"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="relative z-10  rounded-full bg-gray-700 px-3 py-1.5 font-medium text-gray-200">
                          Payment Info
                        </span>
                      </a>
                    </div>
                    <div
                      onClick={() =>
                        copyToClipboard(
                          post.playerLink.replace("/player/", "").toUpperCase()
                        )
                      }
                      className="group relative"
                    >
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-sky-100 bg-purple-400/10 group-hover:bg-violet-400/10">
                        <span className="absolute inset-0" />
                        {post.playerName.toUpperCase()}
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-white bg-purple-400/10 group-hover:bg-violet-400/10">
                        Tag: #{post.playerLink.replace("/player/", "")}
                      </p>
                      <p className="mt-5 line-clamp-3 text-sm leading-6  text-red-200 bg-red-400/10 group-hover:bg-violet-400/10">
                        Score: {post.fame}
                      </p>
                      <p className="mt-5 line-clamp-3 text-sm leading-6  text-yellow-100 bg-yellow-400/10 group-hover:bg-violet-400/10">
                        Decks Used: {post.decksUsed}
                      </p>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-emerald-300 bg-emerald-400/10 group-hover:bg-violet-400/10">
                        Reward Earned:{" "}
                        {
                          filterValues.fameRewards.find(
                            (reward) => post.fame >= reward.score
                          )?.reward
                        }
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-8 ">
                      <img
                        alt=""
                        src="/avatars/avatar.png"
                        className="h-10 w-10 rounded-full bg-gray-800"
                      />
                      <div
                        className=" text-sm leading-6 rounded   hover:bg-gray-700 mr-12 p-2"
                        onClick={() => handleViewPlayerinfo(post.playerLink)}
                      >
                        <button className=" font-semibold text-purple-300 max-sm:hidden ">
                          Player Info
                        </button>
                      </div>

                      {/* // <span className="text-red-500">
                      //   You are not authorized to edit player info
                      // </span> */}
                      <button>
                        <a
                          style={{ marginTop: 3 }}
                          href={
                            post.paylink
                              ? post.paylink
                              : `${frontendURL}`
                          }
                          className="font-semibold  text-white hover:bg-green-400 bg-green-500 px-3 py-2 rounded-md flex items-center gap-2"
                        >
                          Pay Info
                          <IoArrowForwardOutline size={20} />
                        </a>
                      </button>
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
