import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'
// Assets
import CloseIcon from "../../assets/svg/CloseIcon";


export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">

          <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
            Asik
          </h1>
        </div>
        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className="animate pointer">
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">
        <li className="semiBold font15 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="/"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Beranda
          </Link>
        </li>
        <li className="semiBold font15 pointer">

          <div class="dropdown">
            <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>

              Profil

            </button>
            <div className="dropdown-content">
              <Link to="/Definisi" style={{ padding: "10px 15px", color: "#000" }} onClick={() => toggleSidebar(!sidebarOpen)} >
                Definisi
              </Link>
              <Link to="/Selayang-pandang" style={{ padding: "10px 15px", color: "#000" }} onClick={() => toggleSidebar(!sidebarOpen)}>
                Selayang Pandang
              </Link>
              <Link to="/Struktur-organisasi" style={{ padding: "10px 15px", color: "#000" }} onClick={() => toggleSidebar(!sidebarOpen)} >
                Struktur Organisasi
              </Link>
            </div>
          </div>
        </li>
        <li className="semiBold font15 pointer">
          <div className="dropdown">
            <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>

              Kajian

            </button>
            <div className="dropdown-content">
              <Link to="/Litbang"  onClick={() => toggleSidebar(!sidebarOpen)} style={{ padding: "10px 15px", color: "#000" }} >
                Litbang
              </Link>

            </div>
          </div>
        </li>
        <li className="semiBold font15 pointer">
          <div className="dropdown">
            <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>

              Informasi

            </button>
            <div className="dropdown-content">
              <Link to="/Data-peneliti"   onClick={() => toggleSidebar(!sidebarOpen)}style={{ padding: "10px 15px", color: "#000" }} >
                Data Peneliti
              </Link>

            </div>
          </div>
        </li>
        <li className="semiBold font15 pointer">
          <div className="dropdown">
            <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>
              <Link style={{ padding: "10px 15px", color: "#fff" }} to="/Litbang"  onClick={() => toggleSidebar(!sidebarOpen)}>
                Forum
              </Link>

            </button>
          </div>
        </li>
        <li className="semiBold font15 pointer">
          <div className="dropdown">
            <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>
              <Link style={{ padding: "10px 15px", color: "#fff" }} to="/Login"  onClick={() => toggleSidebar(!sidebarOpen)}>
                Login
              </Link>

            </button>
          </div>
        </li>

      </UlStyle>
      {/* <UlStyle className="flexSpaceCenter">
        <li className="semiBold font15 pointer">
          <Link to="/" style={{ padding: "10px 30px 10px 0" }} className="whiteColor">
            Log in
          </Link>
        </li>
        <li className="semiBold font15 pointer flexCenter">
          <Link to="/" className="radius8 lightBg" style={{ padding: "10px 15px" }}>
            Get Started
          </Link>
        </li>
      </UlStyle> */}
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
