import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from "./components/NavBar";
import LogInPage from "./components/LogIn";
import SignUp from "./components/SignUp";
import History from "./components/History";
import LiveAuctions from "./components/LiveAuctions";
import SavedAuctions from "./components/SavedAuctions";
import Location from './components/Location';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddAuction from "./components/AddAuction";
import Home from './components/pages/Home';
import ShowAuctionDetails from './components/pages/ShowAuctionDetails';
import SearchResults from "./components/SearchResults";
import {AuthProvider} from "./components/context/AuthProvider"
import { RequireAuth } from './components/RequireAuth';
import Message from "./components/Message";

// We may need to get rid of RequireAuth and use PersistLogin instead
toast.configure();
function App() {

  return (
    <AuthProvider>
    <Router>
        <div className='navbar-container fixed-top'>
            <NavBar/>
        </div>

        <Routes>
            <Route path="/login" element={<LogInPage/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/history" element={<RequireAuth><History/></RequireAuth>}/>
            <Route path="/location" element={<RequireAuth><Location/></RequireAuth>}/>
            <Route path="/liveAuctions" element={<RequireAuth><LiveAuctions/></RequireAuth>}/>
            <Route path="/savedAuctions" element={<RequireAuth><SavedAuctions/></RequireAuth>}/>
            <Route path="/addAuction" element={<RequireAuth><AddAuction/></RequireAuth>}/>
            <Route path="/auction/:id" element={<RequireAuth><ShowAuctionDetails/></RequireAuth>} />
            <Route path="/search"  element={<SearchResults/>}/>
            <Route path="/message" element={<Message/>}/>
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
