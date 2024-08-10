import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Nav from "./components/Nav";
import Blog from './components/Blog';
import Card from './components/card';
import SignUp from './components/user/Signup';
import Login from './components/user/Signin';
import AddUser from "./components/admin/adduser";
import Carddynamic from "./components/carddynamic"
import ClashRoyaleTable from "./components/payTable"
import AddPaymentinfo from './components/admin/addpaymentinfo';
import Playerinfo from "./components/player/playerinfo"
import Deck from "./components/player/deck"
import BattleCard from "./components/player/BattleCard"
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
            <Route path="/add" element={<AddUser />} />
                <Route path="/" element={ <Carddynamic />} />
                <Route path="/admin" element={ <Card />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/war-stats" element={<ClashRoyaleTable />} />
                <Route path="/addpaymentinfo" element={<AddPaymentinfo />} />
                <Route path="/playerinfo/:playerName" element={<Playerinfo />} />
                
            </Routes>
            
        </>
    );
};

export default App;
