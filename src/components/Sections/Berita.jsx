import React from "react";

import styled from "styled-components";


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Grid from '@mui/material/Grid';
import {  Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Button from '@mui/material/Button';
import 'swiper/css/pagination';

export default function  Berita() {

    return (
        <Wrapper id="services">
            <div className="berita" style={{ padding: "50px 0" }}>

                <div className="container">
                    <Grid container spacing={10}>

                        <Grid item lg={4} xs={12} md={12}>
                            <Swiper
                                // install Swiper modules
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={50}
                                slidesPerView={1}
                                navigation
                                Autoplay={{
                                    delay: 5000
                                }}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                            >
                                <SwiperSlide>
                                    <img src="/assets/images/carousel/kadin.svg" alt="test" style={{ width: '100%' }} />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="/assets/images/Media.png" alt="test" style={{ width: '100%' }} />
                                </SwiperSlide>
                                <SwiperSlide>    <img src="/assets/images/Media.png" alt="test" style={{ width: '100%' }} /></SwiperSlide>
                                <SwiperSlide>    <img src="/assets/images/Media.png" alt="test" style={{ width: '100%' }} /></SwiperSlide>
                                <SwiperSlide>    <img src="/assets/images/Media.png" alt="test" style={{ width: '100%' }} /></SwiperSlide>


                            </Swiper>
                        </Grid>
                        <Grid item  lg={8} xs={12} md={12}  className="widget-center">
                          
                            <div className="widget-area">
                                <Button className="widget-button">
                                <img src="/assets/images/widget/galeri.svg" alt="galeri icon" />
                                    galeri
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/biotech.svg" alt="Kajian" />
                                     Kajian
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/inovasi.svg" alt="inovasi" />
                                inovasi
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/kontak.svg" alt="kontak" />
                                kontak
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/idsd.svg" alt="idsd" />
                                    IDSD
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/ipkd.svg" alt="ipkd" />
                                    IPKD
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/iga.svg" alt="iga" />
                                    IGA
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/rinduk.svg" alt="rinduk" />
                                    RINDUK
                                </Button>
                            </div>
                          
                        </Grid>
                    </Grid>

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



