import React, { useState, useEffect } from 'react';

import styled from "styled-components";

import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css/pagination';

export default function SliderArea(props) {
  SwiperCore.use([Autoplay]);
  const [loading, setLoading] = useState(false)
  const [paparan, setPaparan] = useState([])
  const [thumbnail, setThumbnail] = useState([])
  const getSelandang = async () => {
    setLoading(true)
    try {
      let url = "https://asik.palembang.go.id/api/paparan?populate=*&sort[0]=id%3Adesc"
      const response = await axios.get(url);
      if (response.status === 200) {

        setPaparan(response.data.data.attributes)
        setThumbnail(response.data.data.attributes.thumbnail.data.attributes.formats.medium)
        setLoading(false)
      }
    } catch (error) {
      throw error;
    }
  }
 
  useEffect(() => {
    getSelandang()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Wrapper id="services">
      <div style={{ padding: "50px 0" }}>
        <div className="container">
          <Swiper
            // install Swiper modules
            className="paparan"
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={2}
            navigation
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {loading === true ? <CircularProgress/> : <>
            <SwiperSlide>
            <Link to={`/detail-paparan`} state={{ detailPaparan: paparan }}>
              <img src={'https://asik.palembang.go.id' + thumbnail.url} alt="test" style={{ width: '100%' }} />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <img src={'https://asik.palembang.go.id' + thumbnail.url} alt="test" style={{ width: '100%' }} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={'https://asik.palembang.go.id' + thumbnail.url} alt="test" style={{ width: '100%' }} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={'https://asik.palembang.go.id' + thumbnail.url} alt="test" style={{ width: '100%' }} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={'https://asik.palembang.go.id' + thumbnail.url} alt="test" style={{ width: '100%' }} />
            </SwiperSlide>
            </>}
          
            {/* {paparan.map((row) =>     (
                
            <SwiperSlide>
                <img src="/assets/images/Media.png" alt="test" style={{width:'100%'}}/>
                </SwiperSlide>
            ))}
         */}

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





