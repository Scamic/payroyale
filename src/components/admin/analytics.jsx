// ViewAnalysis.jsx
import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { FaUpload } from 'react-icons/fa';
import Tabs from './tabs'; // Ensure Tabs is correctly imported
import LineChartComponent from './graph'; // Import the Line Chart component
import './analytics.css'; // Custom styles for Clash Royale theme


const GraphAnalysis = ({ data }) => (
  <div className="p-6 bg-green-100 rounded-lg shadow-lg w-full">
    <h3 className="text-xl font-bold text-green-800 mb-4">Graph Analysis</h3>
    <LineChartComponent data={data} /> {/* Render the Line Chart */}
  </div>
);

const TableView = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-green-300 bg-white rounded-lg shadow-lg">
      <thead className="bg-green-100">
        <tr>
          {data.headers.map((header, index) => (
            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-green-200">
        {data.rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={row[6].replace("$","") > 0 ? 'bg-yellow-50' : ''}> {/* Highlight rows with rewards */}
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function ViewAnalysis() {
  const { CSVReader } = useCSVReader();
  const [data, setData] = useState({ headers: [], rows: [] });

  const handleUpload = (results) => {
    const { data: csvData } = results;
    if (csvData.length > 0) {
      const headers = csvData[0];
      const rows = csvData.slice(1);
      setData({ headers, rows });
    }
  };

  const tabs = [
    {
      name: 'table',
      label: 'Table View',
      content: <TableView data={data} />,
    },
    {
      name: 'graph',
      label: 'Graph Analysis',
      content: <GraphAnalysis  data={data} />,
    },
  ];

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold text-green-800 mb-4">CSV Data Analysis</h2>

      <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-6">
        <CSVReader
          onUploadAccepted={handleUpload}
          onUploadRejected={(error) => console.error(error)}
          addRemoveButton
        >
          {({ getRootProps, acceptedFile, removeFile }) => (
            <div className="flex flex-col lg:flex-row lg:items-center">
              <button
                {...getRootProps()}
                className="flex items-center bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
              >
                <FaUpload className="mr-2" />
                {acceptedFile ? 'Change File' : 'Upload CSV'}
              </button>
              
            </div>
          )}
        </CSVReader>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
}
