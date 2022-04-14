import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Grid from '@mui/material/Grid';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css/pagination';
import SwiperCore, { Autoplay } from 'swiper';
export default function WidgetArea(props) {
    SwiperCore.use([Autoplay]);
    const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
    const [loading, setLoading] = useState(false)
    const [loadingQuote, setLoadingQuote] = useState(false)
    const [paparan, setPaparan] = useState([])
    const [quote, setQuote] = useState([])
    const getSelandang = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/paparan?populate=*&sort[0]=id%3Adesc"
            const response = await axios.get(url);
            if (response.status === 200) {

                setPaparan(response.data.data.attributes)

                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }

    const getQuote = async () => {
        setLoadingQuote(true)
        try {
            let url = "https://asik.palembang.go.id/api/quote-pimpinan?populate=*"
            const response = await axios.get(url);
            if (response.status === 200) {

                setQuote(response.data.data.attributes)

                setLoadingQuote(false)
            }
        } catch (error) {
            throw error;
        }
    }


  
    useEffect(() => {
        getSelandang()
     
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
   
        getQuote()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Wrapper id="services">
            <div style={{ padding: "50px 0" }}>

                <div className="container">

                    <Grid container spacing={10}>

                        <Grid item lg={4} xs={12} md={12} className="informasi">
                            {quote.length !== 0 ? loadingQuote === true ? <CircularProgress /> : <>    <Swiper
                                // install Swiper modules
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={50}
                                slidesPerView={1}
                                navigation
                                className="toko-asik"
                                autoplay={{ delay: 3000 }}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}

                            >
                                <SwiperSlide>
                                    <img src={`https://asik.palembang.go.id${quote.walikota.data.attributes.url}`} alt="test" style={{ width: '100%' }} />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={`https://asik.palembang.go.id${quote.wakil_walikota.data.attributes.url}`} alt="test" style={{ width: '100%' }} />
                                </SwiperSlide>
                                <SwiperSlide>    <img src={`https://asik.palembang.go.id${quote.sekretaris_kota.data.attributes.url}`} alt="test" style={{ width: '100%' }} /></SwiperSlide>
                                <SwiperSlide>    <img src={`https://asik.palembang.go.id${quote.kepala_bappeda.data.attributes.url}`} alt="test" style={{ width: '100%' }} /></SwiperSlide>
                                <SwiperSlide>    <img src={`https://asik.palembang.go.id${quote.kepala_bidang.data.attributes.url}`} alt="test" style={{ width: '100%' }} /></SwiperSlide>


                            </Swiper> </> : <h3>Belum ada data</h3>}


                        </Grid>
                        <Grid item lg={8} xs={12} md={12} className="widget-center">
                            <div className="container">
                                <HeaderInfo>
                                    <h1 className="font40 extraBold">Paparan Bappeda Litbang Kota Palembang</h1>
                                    <p className="desc-heading">Informasi mengenai Litbang di kota Palembang</p>
                                </HeaderInfo>
                                <Grid container spacing={10}>

                                    <Grid item lg={12} xs={12} md={12} className="paparan">
                                        {/* <Link to={`/detail-paparan`} state={{ detailPaparan: paparan }}>
                        <img src={'https://asik.palembang.go.id' + thumbnail.url} alt="test" style={{ width: '100%' }} />
                    </Link> */} {paparan.length !== 0 ? loading === true ? <CircularProgress /> : <>
                                            <iframe src={'https://view.officeapps.live.com/op/embed.aspx?src=https://asik.palembang.go.id' + paparan.ppt_file.data.attributes.url} width='100%' height='450px' frameborder='0' title="Paparan" />
                                        </>
                                            : "Tidak ada data"
                                        }
                                    </Grid>
                                </Grid>

                            </div>

                            {/* {paparan.map((row) =>     (

<SwiperSlide>
<img src="/assets/images/Media.png" alt="test" style={{width:'100%'}}/>
</SwiperSlide>
))}
*/}


                            {/* */}

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



