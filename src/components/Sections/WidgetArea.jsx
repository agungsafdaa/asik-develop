import React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Grid from '@mui/material/Grid';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Button from '@mui/material/Button';
import 'swiper/css/pagination';

export default function WidgetArea(props) {

    return (
        <Wrapper id="services">
            <div style={{ padding: "50px 0" }}>

                <div className="container">
                    <Grid container spacing={10}>

                        <Grid item lg={4} xs={12} md={12}>
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
                        <Grid item lg={8} xs={12} md={12} className="widget-center">

                            <div className="widget-area">
                                <Button className="widget-button">
                                    <div className="border-widget">
                                        <img src="/assets/images/widget/galeri.svg" alt="galeri icon" />
                                    </div>
                                    <Typography>galeri</Typography>
                                </Button>
                                <Button className="widget-button">
                                    <div className="border-widget">
                                        <img src="/assets/images/widget/biotech.svg" alt="Kajian" />
                                    </div>
                                    <Typography>Kajian</Typography>
                                </Button>
                                <Button className="widget-button">
                                    <div className="border-widget">
                                        <img src="/assets/images/widget/inovasi.svg" alt="inovasi" />
                                    </div>
                                    <Typography>inovasi</Typography>
                                </Button>
                                <Button className="widget-button">
                                    <div className="border-widget">
                                        <img src="/assets/images/widget/kontak.svg" alt="kontak" />
                                    </div>
                                    <Typography>kontak</Typography>
                                </Button>
                                <Button className="widget-button">
                                    <div className="border-widget">
                                        <img src="/assets/images/widget/idsd.svg" alt="idsd" />
                                    </div>
                                    <Typography>IDSD</Typography>


                                </Button>
                                <Button className="widget-button">
                                    <div className="border-widget">
                                        <img src="/assets/images/widget/ipkd.svg" alt="ipkd" />
                                    </div>
                                    <Typography>IPKD</Typography>


                                </Button>
                                <Button className="widget-button">
                                    <div className="border-widget">
                                        <img src="/assets/images/widget/iga.svg" alt="iga" />
                                    </div>
                                    <Typography>IGA</Typography>


                                </Button>
                                <Button className="widget-button">
                                    <div className="border-widget">
                                        <img src="/assets/images/widget/rinduk.svg" alt="rinduk" />
                                    </div>
                                    <Typography>RINDUK</Typography>



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



