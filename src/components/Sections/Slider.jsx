import React from "react";

import styled from "styled-components";


import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import 'swiper/swiper.min.css'; // core Swiper
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

export default function SliderArea(props) {
  
  return (
    <Wrapper id="services">
    <div className="lightBg" style={{ padding: "50px 0" }}>
      <div className="container">
            <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            >
            <SwiperSlide>
                <img src="/assets/images/Media.png" alt="test" style={{width:'100%'}}/>
                </SwiperSlide>
            <SwiperSlide>
            <img src="/assets/images/Media.png" alt="test" style={{width:'100%'}}/>
            </SwiperSlide>
            <SwiperSlide>    <img src="/assets/images/Media.png" alt="test" style={{width:'100%'}}/></SwiperSlide>
        
            
            </Swiper>
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



