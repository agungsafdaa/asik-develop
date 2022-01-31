import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px", background: '#1FA2FF' } : location.pathname === '/Profil' ? { height: "80px", background: '#1FA2FF' } : { height: "80px" }}>
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
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <Link to="/" activeClass="active" style={{ padding: "10px 15px", color: "#fff" }} offset={-80}>
                Beranda
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem >  <Link activeClass="active" to="/Profil" style={{ padding: "10px 15px", color: "#000" }} offset={-80}>
                  Profil
                </Link></MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
              </Menu>
              <Button
              className="text-capitalize"
                activeClass="active"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ padding: "10px 15px", color: "#fff",}} offset={-80}
              >
                Profil
              </Button>

            </li>
            {/* <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" , color: "#fff"}} to="services" spy={true} smooth={true} offset={-80}>
              Informasi
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" , color: "#fff"}} to="projects" spy={true} smooth={true} offset={-80}>
              Litbang
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px", color: "#fff" }} to="blog" spy={true} smooth={true} offset={-80}>
                Forum
              </Link>
            </li> */}

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



