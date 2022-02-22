import React, {useState} from "react";
import { Helmet } from "react-helmet";
import { Routes, Route, Outlet,  Switch, } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import Profile from "./screens/Profile.jsx";
import Event from "./screens/Event.jsx";
import Landing from "./screens/Landing.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import Kajian from "./screens/Kajian.jsx";
import TopNavbar from "./components/Nav/TopNavbar";
import Footer from "./components/Sections/Footer"; 
export default function tree() {


  return (
    <>
  <CircularProgress />
      <Routes>
        
        <Route path="/" element={<App />}>
     
        <Route path="/Profil" element={<Profile />}></Route>
        <Route path="/Event" element={<Event />}></Route>
        <Route path="/Litbang" element={<Kajian />}></Route>
        
        </Route>
      </Routes>
    </>
  
  );
};

function App() {
  const location = useLocation();
  console.log();
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <TopNavbar />
      {location.pathname === '/' ? <Landing/> :   <Outlet />}
    

      <Footer />
    </>
  );
}



