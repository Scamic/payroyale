import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Spline from "@splinetool/react-spline";


const useGrainEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateNoise(ctx); // Regenerate noise on resize
    };

    const generateNoise = (ctx) => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value; // Red
        data[i + 1] = value; // Green
        data[i + 2] = value; // Blue
        data[i + 3] = 30; // Opacity for less visible grain
      }

      ctx.putImageData(imageData, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return canvasRef;
};

const AnimatedShape = ({ color, size, initialPosition }) => {
  const randomPath = () => {
    const path = [];
    for (let i = 0; i < 5; i++) {
      path.push([
        Math.random() * 100 - 50, // x between -50% and 50%
        Math.random() * 100 - 50, // y between -50% and 50%
      ]);
    }
    return path;
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl`}
      style={{
        background: color,
        width: size,
        height: size,
        left: `${initialPosition[0]}%`,
        top: `${initialPosition[1]}%`,
      }}
      animate={{
        x: randomPath().map((p) => `${p[0]}%`),
        y: randomPath().map((p) => `${p[1]}%`),
        scale: [1, 1.2, 0.9, 1.1, 1],
        opacity: [0.3, 0.5, 0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 10, // Increased movement speed
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    />
  );
};

const BackgroundBlobs = () => {
  const blobsConfig = [
    // Amber, Copper Green, Violet, Cyan blobs
    { color: 'rgba(255, 191, 0, 0.6)', size: '20vw', position: [65, 15] }, // Amber
    { color: 'rgba(72, 132, 123, 0.6)', size: '25vw', position: [70, 25] }, // Copper Green
    { color: 'rgba(138, 43, 226, 0.6)', size: '22vw', position: [75, 35] }, // Violet
    { color: 'rgba(0, 255, 255, 0.6)', size: '18vw', position: [60, 80] }, // Cyan

    // More concentrated towards the center
    { color: 'rgba(255, 191, 0, 0.5)', size: '23vw', position: [45, 50] }, // Amber
    { color: 'rgba(72, 132, 123, 0.5)', size: '19vw', position: [50, 60] }, // Copper Green
    { color: 'rgba(138, 43, 226, 0.5)', size: '21vw', position: [55, 45] }, // Violet
    { color: 'rgba(0, 255, 255, 0.5)', size: '17vw', position: [60, 40] }, // Cyan

    // Spread across the screen
    { color: 'rgba(255, 191, 0, 0.35)', size: '17vw', position: [15, 10] }, // Amber
    { color: 'rgba(72, 132, 123, 0.35)', size: '24vw', position: [20, 70] }, // Copper Green
    { color: 'rgba(138, 43, 226, 0.35)', size: '26vw', position: [30, 60] }, // Violet
    { color: 'rgba(0, 255, 255, 0.35)', size: '21vw', position: [25, 15] }, // Cyan
  ];

  return (
    <>
      {blobsConfig.map((blob, index) => (
        <AnimatedShape
          key={index}
          color={blob.color}
          size={blob.size}
          initialPosition={blob.position}
        />
      ))}
    </>
  );
};

export default function LandingPage() {
  const grainCanvasRef = useGrainEffect();

  return (
    <div
      className="relative min-h-screen overflow-hidden text-gray-200"
      style={{
        background: 'linear-gradient(to bottom right, #000000, #000000, #000000)',
      }}
    >
      {/* Bottom layer: Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundBlobs />
      </div>

      {/* Middle layer: Grain effect */}
      <canvas
        ref={grainCanvasRef}
        className="absolute inset-0 pointer-events-none opacity-80" // Increased opacity for better visibility
      />

      {/* Top layer: Content */}
      <div className="relative z-10">
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className=" mr-10 transform -translate-y-28 h-80">
              <Spline scene="https://prod.spline.design/Tq3GXrdFsh0GS6WM/scene.splinecode" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl font-bold Mokoto"
          >
            Welcome to Forcers Faction
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="Mokoto text-xl"
          >
            Home to Elite Forcers
          </motion.p>
        </main>
      </div>
    </div>
  );
}
