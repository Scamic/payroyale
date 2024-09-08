import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex border-b border-green-300">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`py-2 px-4 text-sm font-semibold rounded-t-lg transition-colors ${
              activeTab === tab.name
                ? 'bg-green-200 text-green-800'
                : 'text-gray-600 hover:bg-green-50'
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6 bg-white rounded-b-lg shadow-lg">
        {tabs.map(
          (tab) =>
            activeTab === tab.name && (
              <div key={tab.name}>{tab.content}</div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
