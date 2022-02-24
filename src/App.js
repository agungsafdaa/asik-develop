import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Routes, Route, Outlet, Navigate, } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import Profile from "./screens/Profile.jsx";
import Event from "./screens/Event.jsx";
import Landing from "./screens/Landing.jsx";
import Dashboard from "./screens/Dashboard.jsx";
// import CircularProgress from '@mui/material/CircularProgress';
import Kajian from "./screens/Kajian.jsx";
import Login from "./screens/Login.jsx";
import TopNavbar from "./components/Nav/TopNavbar";
import Footer from "./components/Sections/Footer";
export default function tree() {
  const isAuthenticated = localStorage.getItem("token")

  return (
    <>
      {/* <CircularProgress /> */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/Profil" element={<Profile />}></Route>
          <Route path="/Event" element={<Event />}></Route>
          <Route path="/Litbang" element={<Kajian />}></Route>
          <Route path="/Dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
          </Route>
          <Route path="/tambahInovasi" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } token={isAuthenticated}>
          </Route>
          <Route path="/Login" element={<Login />}></Route>
        </Route>
      </Routes>
    </>

  );
};

function App() {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      {location.pathname === '/' ?
        <>
          <TopNavbar />
          <Landing />

          <Footer />
        </>
        : location.pathname === '/Login' ?

          <Login /> :

          location.pathname === '/Dashboard' ?

            <Dashboard /> : <>
             <TopNavbar /><Outlet />   <Footer />
            </>

      }
    </>
  );
}

function useAuth() {
  const isAuthenticated = localStorage.getItem("token")
  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }

}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/Login" />;
}



