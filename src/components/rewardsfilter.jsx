import React from "react";

const FilterComponent = ({ filterValues, onFilterValuesChange, isAuthorized }) => {
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

  return (
    <div className="p-4 border border-blue-300 rounded-md bg-white shadow-md w-full max-w-4xl mx-auto mt-4">
      <h3 className="text-lg font-semibold mb-4 text-blue-600">Filter Options</h3>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-blue-600">3rd WarDay</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="warDay"
              value="3 days"
              checked={filterValues.day === "3 days"}
              onChange={() => handleDayChange("3 days")}
              className="sr-only"
            />
            <div
              className={`w-14 h-8 rounded-full flex items-center ${filterValues.day === "3 days" ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${filterValues.day === "3 days" ? "translate-x-6" : "translate-x-0"}`}></div>
            </div>
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-blue-600">4th WarDay</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="warDay"
              value="4 days"
              checked={filterValues.day === "4 days"}
              onChange={() => handleDayChange("4 days")}
              className="sr-only"
            />
            <div
              className={`w-14 h-8 rounded-full flex items-center ${filterValues.day === "4 days" ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${filterValues.day === "4 days" ? "translate-x-6" : "translate-x-0"}`}></div>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filterValues.fameRewards.map((reward, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <label className="block text-blue-600">
              Fame Score {index + 1}:
              <input
                type="number"
                value={reward.score}
                onChange={(e) => handleFameRewardChange(index, "score", e.target.value)}
                className="block w-full mt-1 p-2 border border-blue-300 rounded-md"
                disabled={!isAuthorized}
              />
            </label>
            <label className="block text-blue-600">
              Reward {index + 1}:
              <input
                type="text"
                value={reward.reward}
                onChange={(e) => handleFameRewardChange(index, "reward", e.target.value)}
                className="block w-full mt-1 p-2 border border-blue-300 rounded-md"
                disabled={!isAuthorized}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
