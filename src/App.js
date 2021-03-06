import React from "react";
// import { Helmet } from "react-helmet";
import { Routes, Route, Outlet, Navigate, } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import Profile from "./screens/Profile.jsx";
import SelayangPandang from "./screens/SelayangPandang.jsx";
import DetailInovasi from "./screens/DetailInovasi.jsx";
import StrukturOrganisasi from "./screens/StrukturOrganisasi.jsx";
import Definisi from "./screens/Definisi.jsx";
import Event from "./screens/Event.jsx";
import Landing from "./screens/Landing.jsx";

import Dashboard from "./screens/Dashboard.jsx";
import TambahInovasi from "./screens/TambahInovasi.jsx";
import TambahIndikator from "./screens/TambahIndikator.jsx";
import InovasiEdit from "./screens/EditInovsi.jsx";
// import CircularProgress from '@mui/material/CircularProgress';
import Kajian from "./screens/Kajian.jsx";
import DataPeneliti from "./screens/DataPeneliti.jsx";
import Login from "./screens/Login.jsx";
import TopNavbar from "./components/Nav/TopNavbar";
import Footer from "./components/Sections/Footer";
import Detailpaparan from "./screens/Detailpaparan.jsx";
import DetailBerita from "./screens/Detailberita.jsx";
import Forum from "./screens/Forum.jsx";
import DetailKajian from "./screens/Detailkajian.jsx";
import Regulasi from "./screens/Regulasi.jsx";
import DetailRegulasi from "./screens/Detailregulasi.jsx";
import KompetisiInovasi from "./screens/KompetisiInovasi.jsx";

export default function tree() {
  const isAuthenticated = localStorage.getItem("token")

  return (
    <>
      {/* <CircularProgress /> */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/Profil" element={<Profile />}></Route>
          <Route path="/Event" element={<Event />}></Route>
          <Route path="/Kajian" element={<Kajian />}></Route>
          <Route path="/Forum" element={<Forum />}></Route>
          <Route path="/Detail" element={<Kajian />}></Route>
          <Route path="/data-peneliti" element={<DataPeneliti />}></Route>
          <Route path="/Regulasi" element={<Regulasi/>}></Route>
          <Route path="/detail-inovasi/:id" element={<DetailInovasi />}></Route>
          <Route path="/detail-berita/:id" element={<DetailBerita />}></Route>
          <Route path={"/detail-kajian/:id"} element={<DetailKajian />}></Route>
          <Route path="/detail-regulasi/:id" element={<DetailRegulasi />}></Route>
          <Route path="/detail-paparan" element={<Detailpaparan />}></Route>
          <Route path="/Definisi" element={<Definisi />}></Route>
          <Route path="/Selayang-pandang" element={<SelayangPandang/>}></Route>
          <Route path="/Struktur-organisasi" element={<StrukturOrganisasi/>}></Route>
          <Route path="/Kompetisi-Inovasi" element={<KompetisiInovasi/>}></Route>
       
        </Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
          </Route>
          <Route path="/tambahInovasi" element={
            <PrivateRoute>
              <TambahInovasi />
            </PrivateRoute>
          } token={isAuthenticated}>
          </Route>
          <Route path="/tambahIndikator/:id" element={
            <PrivateRoute>
              <TambahIndikator />
            </PrivateRoute>
          } token={isAuthenticated}>
          </Route>
          <Route path="/editInovasi" element={
            <PrivateRoute>
              <InovasiEdit />
            </PrivateRoute>
          } token={isAuthenticated}>
          </Route>
      </Routes>
    </>

  );
};

function App() {
  const location = useLocation();

  return (
    <>
      {/* <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet> */}
      {location.pathname === '/' ?
        <>
          <TopNavbar />
          <Landing />
          <Footer />
        </>
       :

         <>
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



