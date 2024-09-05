import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner"; // Import the Spinner component
import { IoIosArrowDropdownCircle } from "react-icons/io";


export default function AddUser() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);
  const [formData, setFormData] = useState({
    playerLink: "",
    linkedAccountsTags: [""], // Array to hold multiple linked account tags
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added for error handling
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [playersPerPage] = useState(10); // Number of players per page
  const [displayedPlayers, setDisplayedPlayers] = useState([]);
  const [playersintable, setPlayersintable] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  // Function to fetch data from both APIs
  const fetchData = async () => {
    try {
      const [linkedAccountsResponse, battleLogsResponse] = await Promise.all([
        fetch(`http://localhost:8080/getlinked-accounts`),
        fetch(`http://localhost:8080/battle-logs`),
      ]);

      const linkedAccountsData = await linkedAccountsResponse.json();
      const battleLogsData = await battleLogsResponse.json();

      const linkedPlayerTags = new Set(
        linkedAccountsData.map((player) => player.playerLink)
      );
      console.log("linkedPlayerTags", linkedPlayerTags);

      const filteredBattleLogsData = battleLogsData.filter(
        (player) =>
          !linkedPlayerTags.has(player.playerLink.replace("/player/", ""))
      );
      console.log("filteredBattleLogsData", filteredBattleLogsData);

      const combinedData = [...linkedAccountsData, ...filteredBattleLogsData];
      // Create a map to store unique players by their playerName
      const uniquePlayersMap = new Map();

      // Populate the map, using playerName as the key
      combinedData.forEach((player) => {
        if (!uniquePlayersMap.has(player.playerName)) {
          uniquePlayersMap.set(player.playerName, player);
        }
      });

      // Convert the map values back into an array
      const uniqueCombinedData = Array.from(uniquePlayersMap.values());

      console.log("combinedData", combinedData);
      setPlayersintable(uniqueCombinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleRow = (playerTag) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [playerTag]: !prevExpandedRows[playerTag],
    }));
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/battle-logs`);
        setPlayers(response.data);
        setTotalPages(Math.ceil(response.data.length / 10)); // Assuming 10 rows per page
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/test/admin`,
          { withCredentials: true }
        );

        if (response.data === "Admin Content.") {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "linkedAccountsTags") {
      const updatedTags = [...formData.linkedAccountsTags];
      updatedTags[index] = value;
      setFormData((prevData) => ({
        ...prevData,
        linkedAccountsTags: updatedTags,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleAddTagField = () => {
    setFormData((prevData) => ({
      ...prevData,
      linkedAccountsTags: [...prevData.linkedAccountsTags, ""],
    }));
  };

  const handleRemoveTagField = (index) => {
    const updatedTags = formData.linkedAccountsTags.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      linkedAccountsTags: updatedTags,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(
       `http://localhost:8080/addPlayerAccount`,
        formData,
        {
          withCredentials: true,
        }
      );

      // Display spinner for 3 seconds before showing success message
      setIsLoading(true);
      setTimeout(() => {
        setSuccessMessage("Player Accounts linked successfully!");
        setFormData({
          playerTag: "",
          linkedAccountsTags: [""], // Reset the form
        });
        setIsSubmitting(false);
        setIsLoading(false); // Hide spinner after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error linking Player Accounts:", error);
      setErrorMessage("Error linking Player Accounts. Please try again.");
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleUnlink = async () => {
    setIsUnlinking(true);

    try {
      await axios.delete(`http://localhost:8080/admin/unlinkPlayerAccount`, {
        data: formData,
        withCredentials: true,
      });

      setSuccessMessage("Player Accounts unlinked successfully!");
      setFormData({
        playerTag: "",
        linkedAccountsTags: [""], // Reset the form
      });
    } catch (error) {
      console.error("Error unlinking Player Accounts:", error);
      setErrorMessage("Error unlinking Player Accounts. Please try again.");
    } finally {
      setIsUnlinking(false);
    }
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "next" && prevPage < totalPages) {
        return prevPage + 1;
      }
      if (direction === "prev" && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  const copyToClipboard = (value) => {
    value = value.replace("/player/", "");
    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert(`${value} copied to clipboard!`);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
  // Filter players based on the search query
  const filteredPlayers = playersintable.filter((player) => {
    const playerTag = player.playerLink
      ? player.playerLink.replace("/player/", "")
      : "";
    return (
      player.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playerTag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Apply pagination
  const startIndex = (currentPage - 1) * playersPerPage;
  const endIndex = startIndex + playersPerPage;
  setDisplayedPlayers(filteredPlayers.slice(startIndex, endIndex));
}, [playersintable, searchQuery, currentPage]);

const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
  setCurrentPage(1); // Reset to the first page on search
};


  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthorized) {
    return (
      <div className="text-center text-white">
        You are not authorized to access this page.
      </div>
    );
  }

  // const displayedPlayers = players.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      <div className=" ml-10 h-full lg:w-2/4 p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Add New Player</h2>
        <p className="text-gray-400 mb-6">
          Enter player details to link accounts to a player profile.
        </p>

        {successMessage && (
          <div className="mb-6 p-4 text-green-800 bg-green-100 rounded-lg">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 text-red-800 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className=" space-y-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-1">
              <div className="sm:col-span-1">
                <label
                  htmlFor="playerLink"
                  className="block text-sm font-medium text-white"
                >
                  Player Tag
                </label>
                <input
                  id="playerLink"
                  name="playerLink"
                  type="text"
                  value={formData.playerLink}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {formData.linkedAccountsTags.map((tag, index) => (
                <div key={index} className="sm:col-span-1 flex items-center">
                  <div className="flex-grow">
                    <label
                      htmlFor={`linkedAccountTag-${index}`}
                      className="block text-sm font-medium text-white"
                    >
                      Linked Account Tag {index + 1}
                    </label>
                    <input
                      id={`linkedAccountTag-${index}`}
                      name="linkedAccountsTags"
                      type="text"
                      value={tag}
                      onChange={(e) => handleChange(e, index)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  {formData.linkedAccountsTags.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTagField(index)}
                      className="ml-2 mt-6 text-sm font-semibold text-red-600 hover:text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddTagField}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Another Linked Account Tag
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={handleUnlink}
              className="text-sm font-semibold text-gray-400 hover:text-purple-300"
              disabled={isUnlinking}
            >
              {isUnlinking ? "Unlinking..." && <Spinner /> : "Unlink Accounts"}
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Linking..." : "Link Accounts"}
            </button>
          </div>
        </form>
      </div>

      {/* Table Component */}
      <div className="lg:w-3/6 lg:mt-0 mt-6 lg:ml-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl  flex font-bold text-white p-6">
          Elite Directory
          <form className="ml-12  items-center space-x-2">
            <input
              type="search"
              id="default-search"
              className=" block w-64 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="🔎 Search by name or tag"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
        </h2>
        <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-600">
    <thead className="bg-gray-700">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
          Player Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
          Player Tag
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-gray-800 divide-y divide-gray-700">
      {displayedPlayers.map((player) => (
        <React.Fragment key={player._id || player.playerLink}>
          <tr
            onClick={() => toggleRow(player.playerLink)}
            className={`cursor-pointer ${player.playerAccounts && player.playerAccounts.length > 0 ? 'bg-gradient-to-r from-green-400 to-green-800' : ''}`}
          >
            <td className="px-6 py-4 text-sm font-medium text-white flex items-center">
              <IoIosArrowDropdownCircle
                className={`mr-2 text-white transition-transform ${expandedRows[player.playerLink] ? 'rotate-180' : ''}`}
                style={{ transform: 'rotate(0deg)' }}
              />
              {player.playerName}
            </td>
            <td className="px-6 py-4 text-sm text-white">
              {player.playerLink ? (
                "#" + player.playerLink.replace("/player/", "")
              ) : (
                <p className="text-green-300 hover:text-sky-300">Account Have Links</p>
              )}
            </td>
            <td className="px-6 py-4 text-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(player.playerLink);
                }}
                className="text-sky-500 hover:text-indigo-100"
              >
                Copy Tag
              </button>
            </td>
          </tr>
          {expandedRows[player.playerLink] && player.playerAccounts && (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-sm text-gray-400">
                <div
                  className="bg-gray-700 p-4 rounded-md mt-1"
                  style={{
                    borderLeft: "4px solid #3B82F6", // Blue left border
                    marginTop: "-1px", // Closer connection between rows
                    transition: "max-height 0.3s ease-out, padding 0.3s ease-out", // Dropdown effect
                    maxHeight: expandedRows[player.playerLink] ? "200px" : "0",
                    padding: expandedRows[player.playerLink] ? "1rem" : "0 1rem", // Padding for dropdown effect
                    overflow: "hidden",
                  }}
                >
                  <strong>{player.playerName} Linked Accounts:</strong>
                  {player.playerAccounts.map((account) => (
                    <div key={account._id} className="mt-2">
                      {account.linkedAccountsTag}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </tbody>
  </table>
</div>



        <div className="flex justify-between px-6 py-4">
          <button
            onClick={() => handlePageChange("prev")}
            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange("next")}
            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
