import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Nav from "./components/Nav";
import Card from './components/card';
import SignUp from './components/user/Signup';
import Login from './components/user/Signin';
import AddUser from "./components/admin/adduser";
import ClashRoyaleTable from "./components/payTable"
import AddPaymentinfo from './components/admin/addpaymentinfo';
import Playerinfo from "./components/player/playerinfo"
import About from './components/About';
import Analytics from "./components/admin/analytics"
import Calendar from './components/user/calendar';
import Live from './components/carddynamic'

const App = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
        });
    }, []);

    return (
        <Router>
            <div className="App">
                <Main />
            </div>
        </Router>
    );
};

const Main = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/signup' || location.pathname === '/login';

    return (
        <>
            {!isAuthPage && <Nav />}
            <Routes>
            <Route path="/linkaccounts" element={<AddUser />} />
                <Route path="/" element={  <Card />}/>
                <Route path="/about" element={ <About />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/war-stats" element={<ClashRoyaleTable />} />
                <Route path="/addpaymentinfo" element={<AddPaymentinfo />} />
                <Route path="/playerinfo/player/:playerLink" element={<Playerinfo />} />
                <Route path="/viewanalytics" element={<Analytics />} />       
                <Route path="/viewcalendar" element={<Calendar />} />    
                <Route path="/live" element={<Live />}    />        
            </Routes>
            
        </>
    );
};

export default App;
