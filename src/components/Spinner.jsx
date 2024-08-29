import React from 'react';
import {HashLoader} from "react-spinners"

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-sky-300 bg-opacity-55 z-50">
    <img
      src="/image.png" // Path to the image in the public folder
      alt="Loading..."
      className="w-30 h-25 "
    />
    <div>
    <HashLoader color="#439de0" size={60} /> Adding Player in Payment Gateway...
    </div>
    
  </div>
  
);

export default Spinner;
