import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Components

import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets

import { Link, useLocation } from 'react-router-dom'
export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);


  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  const location = useLocation();


  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className={location.pathname === '/login' || location.pathname === '/dashboard' || location.pathname === '/tambahInovasi' || location.pathname === '/editInovasi' ? 'display-none' : "flexCenter animate whiteBg"} style={y > 100 ? { height: "60px", background: '#A70000' } : location.pathname !== '/' ? { height: "80px", background: '#A70000' } : { display: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link to="/" className="pointer flexNullCenter" >
            {/* <LogoIcon /> */}
            <h1 style={{ marginLeft: "15px", color: "#fff" }} className="font20 extraBold">
              Asik
            </h1>
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <img src="/assets/images/menu.svg" alt="test" style={{ width: '100%' }} />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter navbar-menu">
            <li className="semiBold font15 pointer">
            <div className="dropdown">
                <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>
                <Link to="/" activeClass="active" style={{ padding: "10px 15px", color: "#fff" }} offset={-80}>
                Beranda
              </Link>
                </button>
              </div>
            
            </li>
            <li className="semiBold font15 pointer">
              <div className="dropdown">
                <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>

                  Profil <span><ExpandMoreIcon /></span>

                </button>
                <div className="dropdown-content">
                  <Link to="/Definisi" style={{ padding: "10px 15px", color: "#000" }} >
                    Definisi
                  </Link>
                  <Link to="/Selayang-pandang" style={{ padding: "10px 15px", color: "#000" }} >
                    Selayang Pandang
                  </Link>
                  <Link to="/Struktur-organisasi" style={{ padding: "10px 15px", color: "#000" }} >
                    Struktur Organisasi
                  </Link>
                </div>
              </div>



            </li>
            <li className="semiBold font15 pointer">
              <div className="dropdown">
                <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>

                  Litbang <span><ExpandMoreIcon /></span>

                </button>
                <div className="dropdown-content">
                  <Link to="/Kajian" style={{ padding: "10px 15px", color: "#000" }} >
                    Kajian
                  </Link>
                  <Link to="/Forum" style={{ padding: "10px 15px", color: "#000" }} >
                    Inovasi
                  </Link>

                </div>
              </div>
            </li>
            <li className="semiBold font15 pointer">
              <div className="dropdown">
                <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>

                  Informasi <span><ExpandMoreIcon /></span>

                </button>
                <div className="dropdown-content">
                  <Link to="/Data-peneliti" style={{ padding: "10px 15px", color: "#000" }} >
                    Data Peneliti
                  </Link>
                  <Link to="/Regulasi" style={{ padding: "10px 15px", color: "#000" }} >
                 Regulasi
                  </Link>

                </div>
              </div>

            </li>
            <li className="semiBold font15 pointer">
              <div className="dropdown">
                <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>
                  <Link style={{ padding: "10px 15px", color: "#fff" }} to="/Kompetisi-inovasi">
                    Kompetisi Inovasi
                  </Link>

                </button>
              </div>


            </li>

            <li className="semiBold font15 pointer">
            <div className="dropdown">
                <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>
                <Link style={{ padding: "10px 15px", color: "#fff" }} to="/Login">
                Forum
              </Link>

                </button>
              </div>
            
            </li>

            

          </UlWrapper>
          {/* <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <a href="/" style={{ padding: "10px 30px 10px 0" }}>
                Log in
              </a>
            </li>
            <li className="semiBold font15 pointer flexCenter">
              <a href="/" className="radius8 lightBg" style={{ padding: "10px 15px" }}>
                Get Started
              </a>
            </li>
          </UlWrapperRight> */}
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;



