import React from "react";
import Spline from "@splinetool/react-spline";
import { AnimatedModalDemo } from "./AnimatedModalDemo";

// bg-gradient-to-b from-zinc via-stone-950 to-neutral-800
const home = () => {
  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-neutral-900 text-neutral-300 px-4">
        
          <div className="absolute top-14 left-0 right-0 bottom-0 bg-gradient-to-t from-transparent to-black opacity-100 z-0"></div>

          {/* Main Heading */}
          <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-white to-black font-bold text-center z-10 justify-center Mokoto mb-4 transform translate-y-10 text-5xl md:text-6xl lg:text-7xl">
            Welcome to ELITE FORCERS
          </h1>

          {/* Subheading */}
          <p className="text-transparent bg-clip-text bg-gradient-to-b from-white to-black text-center z-10 Mokoto translate-y-6 mb-8 text-2xl md:text-3xl lg:text-4xl">
            Flagship Clan in the Forcers Faction
          </p>

          {/* Animated Modal */}

          {/* Spline 3D Element */}
          <div className="sm:w-[20vw] w-full max-w-lg lg:max-w-4xl h-[300px] mb-8 z-20 transform -translate-x-10 translate-y-24 text-center overflow-hidden flex justify-center">
            <Spline scene="https://prod.spline.design/Tq3GXrdFsh0GS6WM/scene.splinecode" />
          </div>
        

        {/* Button (Optional) */}
        {/* <button className="px-6 py-3 bg-purple-600 justify-center text-center text-white font-semibold rounded-lg hover:bg-purple-500 transition-all font-mono">
              Apply
            </button> */}
        {/* <a
          href="https://discord.gg/QUzJMTm4pj" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg  transform -translate-x-5 hover:bg-purple-500 transition-all font-mono text-lg md:text-xl lg:text-2xl"
        >
          Join Discord
        </a> */}

        <div className="transform -translate-x-3 -translate-y-8 ">
          <AnimatedModalDemo />
        </div>
      </section>
      {/* https://discord.gg/QUzJMTm4pj */}
      {/* Footer */}
      <footer className="py-8 text-center bg-gray-800 text-white ">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default home;
