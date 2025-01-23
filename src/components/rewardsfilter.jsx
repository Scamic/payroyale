import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios if you're using it
import Hypertext from "./ui/hypertextutility";


const FilterComponent = ({ filterValues, onFilterValuesChange }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDayChange = (value) => {
    onFilterValuesChange({
      ...filterValues,
      day: value,
    });
  };

  const handleFameRewardChange = (index, field, value) => {
    const newFameRewards = [...filterValues.fameRewards];
    newFameRewards[index][field] = value;
    onFilterValuesChange({
      ...filterValues,
      fameRewards: newFameRewards,
    });
  };

  const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:8080'
  : 'https://payroyale-backend.vercel.app';

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/test/admin`,
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

  return (
    <div className="p-4 border border-blue-300 rounded-md bg-white/20 shadow-md w-full max-w-4xl mx-auto">
      {isAuthorized ? (
        <sup className="text-green-500">
          Only Admin can Change "Read Only for Users"
        </sup>
      ) : (
        <Hypertext text="Only Admin can Change" className="text-green-500" />
      )}
      <h3 className="text-lg font-semibold mb-4">Score & Reward🤑 Setter</h3>

      <div className="grid grid-cols-2 gap-4">
        {filterValues.fameRewards.map((reward, index) => (
          <div
            key={index}
            className="flex flex-col space-y-2 bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-sm"
          >
            <label className="text-sm text-blue-600">
              Fame Score {index + 1}:
              <input
                type="number"
                value={reward.score}
                onChange={(e) =>
                  handleFameRewardChange(index, "score", e.target.value)
                }
                className="block w-full mt-1 p-2 text-sm border border-blue-300 rounded-md"
                disabled={!isAuthorized}
              />
            </label>

            <label className="text-sm text-blue-600 relative">
              Reward {index + 1}:
              <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-600">
                  💲
                </span>
                <input
                  type="text"
                  value={reward.reward}
                  onChange={(e) =>
                    handleFameRewardChange(index, "reward", e.target.value)
                  }
                  className="block w-full pl-6 mt-1 p-2 text-sm border border-blue-300 rounded-md"
                  disabled={!isAuthorized}
                />
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
