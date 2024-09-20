import React from 'react';
import Spline from "@splinetool/react-spline";


const home = () => {
    return (
        <div className="bg-gray-900">
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 text-white px-4">
            
            {/* Main Heading */}
            <h1 className="font-bold text-center z-10 justify-center Mokoto mb-4 transform -translate-y-6 text-5xl md:text-6xl lg:text-7xl">
              Welcome to ELITE FORCERS
            </h1>
    
            {/* Subheading */}
            <p className="text-center z-10 Mokoto -translate-y-6 mb-8 text-2xl md:text-3xl lg:text-4xl">
              Flagship Clan in the Forcers Faction
            </p>
    
            {/* Spline 3D Element */}
            <div className="sm:w-[20vw] w-full max-w-lg lg:max-w-4xl h-[300px] mb-8 z-20 transform text-center overflow-hidden flex justify-center">
              <Spline scene="https://prod.spline.design/Tq3GXrdFsh0GS6WM/scene.splinecode" />
            </div>
    
            {/* Button (Optional) */}
            {/* <button className="px-6 py-3 bg-purple-600 justify-center text-center text-white font-semibold rounded-lg hover:bg-purple-500 transition-all font-mono">
              Apply
            </button> */}
             <a
          href="https://discord.gg/QUzJMTm4pj" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition-all font-mono text-lg md:text-xl lg:text-2xl"
        >
          Join Discord
        </a>
          </section>
          {/* https://discord.gg/QUzJMTm4pj */}
          {/* Footer */}
          <footer className="py-8 text-center bg-gray-800 text-white">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </footer>
        </div>
      );
    };

export default home;
