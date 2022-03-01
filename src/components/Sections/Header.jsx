import React from "react";
import styled from "styled-components";
// Components

import Button from '@mui/material/Button';


export default function Header(props) {
  console.log(props)
  return (
    <Wrapper id="home" className="hero-element">
      <video  loop autoPlay="autoplay" controls muted    id="myVideo"   className="video-asik">
        <source src="https://palembang.go.id/asset/video/Profil_Kota_Palembang_2019.mp4" type="video/mp4"/>
        Your browser does not support HTML5 video.
      </video>

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
    </Wrapper>
  );
}


const Wrapper = styled.section`
 
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;



const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;



