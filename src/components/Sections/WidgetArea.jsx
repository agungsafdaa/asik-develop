import React from "react";

import styled from "styled-components";


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Grid from '@mui/material/Grid';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Button from '@mui/material/Button';
import 'swiper/css/pagination';

export default function SliderArea(props) {

    return (
        <Wrapper id="services">
            <div className="lightBg" style={{ padding: "50px 0" }}>

                <div className="container">
                    <Grid container spacing={10}>

                        <Grid item xs={4}>
                            <Swiper
                                // install Swiper modules
                                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
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
                        <Grid item xs={8} className="widget-center">
                          
                            <div className="widget-area">
                                <Button className="widget-button">
                                <img src="/assets/images/widget/biotech.svg" alt="test" />
                                    galeri
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/biotech.svg" alt="test" />
                                    galeri
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/biotech.svg" alt="test" />
                                    galeri
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/biotech.svg" alt="test" />
                                    galeri
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/biotech.svg" alt="test" />
                                    galeri
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/biotech.svg" alt="test" />
                                    galeri
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/biotech.svg" alt="test" />
                                    galeri
                                </Button>
                                <Button className="widget-button">
                                <img src="/assets/images/widget/biotech.svg" alt="test" />
                                    galeri
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



