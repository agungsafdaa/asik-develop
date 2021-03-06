import React, { useState, useEffect } from 'react';
import styled from "styled-components";
// Components
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from 'react-router-dom'
import axios from 'axios';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { CircularProgress } from '@mui/material';
function convertDateDBtoIndo(string) {
  const bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const tanggal = string.split("-")[2];
  const bulan = string.split("-")[1];
  const tahun = string.split("-")[0];

  return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
}
export default function Blog() {
 

  const [loading, setLoading] = useState(false)
  const [berita, setBerita] = useState([])

  const getBerita = async () => {
    setLoading(true)
    try {
      let url = " https://asik.palembang.go.id/api/beritas?sort[0]=id%3Adesc&pagination[pageSize]=6&populate=*"
      const response = await axios.get(url);
      if (response.status === 200) {

        setBerita(response.data.data)
     
        setLoading(false)
      }
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    getBerita()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Wrapper id="blog">
      <div className="whiteBg berita">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Berita</h1>
            <p className="desc-heading">Kegitan & Event Terbaru</p>
          </HeaderInfo>
          <Grid container spacing={2}>
           {loading === true ? <CircularProgress/> : berita.length >= 1 ?  berita.map((item) =>  (
      
         
            <Grid key={item.id} item lg={4} xs={12} md={4}>
              <Link to={`/detail-berita/${item.attributes.judul_berita}`} state={{ detailBerita: item }}>
              <Card className="card-asik" sx={{ minWidth: 275 }}>
                <CardContent>
                <img src={'https://asik.palembang.go.id' + item.attributes.gambar_berita.data[0].attributes.formats.medium.url} loading="lazy" alt="test" style={{ width: '100%' }} />
                  <Typography className="tittle-card" gutterBottom>
                     {item.attributes.judul_berita}
                  </Typography>
                    <div className="card-posting">
                        <Typography component="div">
                        {convertDateDBtoIndo(item.attributes.tanggal_berita)}
                      </Typography>
                  
                     
                
                    </div>
                </CardContent>
                <CardActions className="p-10">
                  <Button className="tag-button" size="small">Kegiatan & Event</Button>
                </CardActions>
              </Card>
              </Link>
            </Grid>
            )) : <h3 className="text-center">Belum ada berita</h3>}
          </Grid>

          <div className="see-all">
          <Link to={{pathname: `/Event`, state: ''}}>
            <Button className="see-all-button" size="small">Selengkapnya <NavigateNextIcon/> </Button>
          </Link>
         
          </div>
        </div>

      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding-top: 20px;
`;
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
