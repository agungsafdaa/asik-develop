import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Components
import Button from '@mui/material/Button';
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [litbang, setLitbang] = useState(null);
  const [informasi, setInformasi] = useState(null);
  const open = Boolean(anchorEl);
  const openInformasi = Boolean(informasi);
  const openLitbang = Boolean(litbang);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickInformasi = (event) => {
    setInformasi(event.currentTarget);
  };
  const handleClickLitbang = (event) => {
    setLitbang(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseInformasi = () => {
    setInformasi(null);
  };




  const handleCloseLitbang = () => {
    setLitbang(null);
  };
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
              <Link to="/" activeClass="active" style={{ padding: "10px 15px", color: "#fff" }} offset={-80}>
                Beranda
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <div className="dropdown">
                <button className="dropbtn whiteColor" style={{ padding: "10px 15px" }}>
 
                  Profil <span><ExpandMoreIcon/></span>

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
              <Menu

                anchorEl={litbang}
                open={openLitbang}
                onClose={handleCloseLitbang}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem >  <Link activeClass="active" to="/Litbang" style={{ padding: "10px 15px", color: "#000" }} offset={-80}>
                  Litbang
                </Link></MenuItem>

              </Menu>
              <Button
                className="text-capitalize "
                inputProps={{ MenuProps: { disableScrollLock: true } }}
                aria-controls={openLitbang ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openLitbang ? 'true' : undefined}
                onClick={handleClickLitbang}
                style={{ padding: "10px 15px", color: "#fff", }} offset={-80}
              >
                Kajian
              </Button>

            </li>
            <li className="semiBold font15 pointer">
              <Menu
                id="basic-menu"
                anchorEl={informasi}
                open={openInformasi}
                onClose={handleCloseInformasi}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >

                <MenuItem >  <Link activeClass="active" to="/Data-peneliti" style={{ padding: "10px 15px", color: "#000" }} offset={-80}>
                  Data Peneliti
                </Link></MenuItem>


              </Menu>
              <Button
                className="text-capitalize"
                activeClass="active"
                aria-controls={openInformasi ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openInformasi ? 'true' : undefined}
                onClick={handleClickInformasi}
                style={{ padding: "10px 15px", color: "#fff", }}
              >
                Informasi
              </Button>
            </li>

            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px", color: "#fff" }} to="/Litbang" offset={-80}>
                Forum
              </Link>
            </li>

            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px", color: "#fff" }} to="/Login" offset={-80}>
                Login
              </Link>
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



