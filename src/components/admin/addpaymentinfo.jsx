import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner"; // Import the Spinner component
import env from "react-dotenv";

export default function Adduser() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    
    playerTag: "",
    email:"",
    paylink:"",
    // paypalId:"",
  });
  const [successMessage, setSuccessMessage] = useState("");
  

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      playerTag: "",
      email: "",
      paylink:""
    });
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`http://localhost:8080/admin/createplayers`, formData, {
        withCredentials: true,
      });

      // Display spinner for 3 seconds before showing success message
      setIsLoading(true);
      setTimeout(() => {
        setSuccessMessage("Player Info Added successfully!");
        setFormData({
          playerTag: "",
          email: "",
          paylink:""
        });
        setIsSubmitting(false);
        setIsLoading(false); // Hide spinner after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error creating player:", error);
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthorized) {
    return <div className="text-center text-white">You are not authorized to access this page.</div>;
  }

  return (
    <div className="mt-10 max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Add / Update Player's Payment Info💵</h2>
      <p className="text-gray-400 mb-6">Enter player details to add or update  player profile to Clash Royale Payment Gateway.</p>

      {successMessage && (
        <div className="mb-6 p-4 text-green-800 bg-green-100 rounded-lg">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-1">
            

            <div className="sm:col-span-1">
              <label htmlFor="playerTag" className="block text-sm font-medium text-white">
                #Player Tag
              </label>
              <input
                id="playerTag"
                name="playerTag"
                type="text"
                value={formData.playerTag.toUpperCase()}
                onChange={handleChange}
                required
                placeholder="Sample Tag : Q9U9L9J8"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="playerTag" className="block text-sm font-medium text-white">
                Player Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email.toLowerCase()}
                onChange={handleChange}
                required
                placeholder="Example mail : piyushpatelcodes@gmail.com"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="paylink" className="block text-sm font-medium text-white">
                Payment Link
              </label>
              <input
                id="paylink"
                name="paylink"
                type="text"
                value={formData.paylink.toLowerCase()}
                onChange={handleChange}
                required
                placeholder="Any Platform Online PayLink"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* <div className="sm:col-span-1">
              <label htmlFor="score" className="block text-sm font-medium text-white">
                Payment Number
              </label>
              <input
                id="score"
                name="score"
                type="number"
                value={formData.paypalId}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div> */}

            
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold text-gray-400 hover:text-purple-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
