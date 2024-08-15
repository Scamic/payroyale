import React, { useEffect, useState } from 'react';
import './about.css'; // Ensure this file includes the CSS above
import Spline from "@splinetool/react-spline";

export default function App() {
  const [animationClass, setAnimationClass] = useState('gradient-text');

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      spline-viewer {
        width: 100vw;
        height: 100vh;
        display: block;
        overflow: hidden;
      }
      spline-viewer::part(watermark) {
        display: none;
      }
      body, html {
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100%;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const toggleAnimation = () => {
    setAnimationClass(prevClass =>
      prevClass === 'gradient-text' ? 'gradient-text paused' : 'gradient-text'
    );
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
{/*       <iframe
        src="https://my.spline.design/tvatimedoor-a1e6e1b6c2cb5d045cc9e8737f30d91f/"
        style={{ width: '100%', height: '100%', border: 'none' }}
        allow="fullscreen"
        title="Spline Scene"
      ></iframe> */}
       <Spline scene="https://prod.spline.design/pGqp32AzIknjOfuJ/scene.splinecode" />
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        background: 'rgba(0, 0, 0, 0.5)', // Transparent background
        padding: '10px',
        borderRadius: '5px',
      }}>
        <div style={{ marginBottom: 60 }}>
          <p>About Devs:</p>
          <p className={animationClass}>PIYUSH PATEL</p><br></br>
          <p className={animationClass}>WACHAN NARKHEDE</p>
        </div>

      </div>
    </div>
  );
}
