import React from "react";
// ,{useEffect}
import styled from "styled-components";
// Components

import Button from '@mui/material/Button';



export default function Header() {
  // const  vid = document.getElementById("myVideo");
  //   useEffect(() => {
  //    setTimeout(() => {
  //     vid.muted = true;
  //    }, 2000);


  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  return (
    <Wrapper id="home" className="hero-element">
      <div>
        <video loop autoPlay="autoplay" poster="/assets/images/cover.jpg " controls muted id="myVideo" className="video-asik">
          <source src="/assets/video/asik.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

      
        <Tirai>
        <div className="hero-content">
          <div className="container">
            <div className="counter-layanan">
              <BtnWrapper className="test">
                <h4>265</h4>

                <Button className="button-asik-border-white">Inovasi Daerah</Button>
              </BtnWrapper>
              <BtnWrapper className="test">
                <h4>33</h4>

                <Button className="button-asik-border-white">Kajian</Button>
              </BtnWrapper>
              <BtnWrapper className="test">
                <h4>25</h4>

                <Button className="button-asik-border-white">Regulasi</Button>
              </BtnWrapper>

            </div>
          </div>
          <div className="welcome-text">
            <div className="container">
              <div className="welcome-heading">
                <h3 className="welcome-heading ">Memahami dan memecahkan masalah Kota Palembang secara ilmiah</h3>

              </div>

            </div>
          </div>
        </div>
        </Tirai>
      </div>
    </Wrapper>
  );
}


const Wrapper = styled.section`
position: relative;
height: 100vh;
overflow: hidden;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Tirai = styled.div`
position: absolute;
top: 0;
left: 0;
display: flex;
height: 100%;
width: 100%;
align-items: flex-end;
--tw-text-opacity: 1;
color: rgba(255,255,255,var(--tw-text-opacity));
background: rgba(0,0,0,.6);
`;



const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;



