import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Blog from './components/Blog';

const App = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false, // Set to false to animate every time you scroll up/down
        });
    }, []);

    return (
        <div className="App">
            
            <div id="blog-section">
                <Blog />
            </div>
          
        </div>
    );
};

export default App;
