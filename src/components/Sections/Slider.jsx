import React from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";
import Typography from "@mui/material/Typography";


import 'swiper/css';

import 'swiper/css/pagination';

export default function SliderArea(props) {
  const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;

  return (
    <Wrapper id="services">
      <div className="widget-center" style={{ padding: "50px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className=" extraBold">Layanan Asik Bappeda Litbang</h1>
        
          </HeaderInfo>

    

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
          {/* <Swiper
            // install Swiper modules
            className="paparan"
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
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
          
        

          </Swiper> */}
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





