import React from "react";
import styled from "styled-components";
// Components
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
export default function Blog() {
  return (
    <Wrapper id="blog">
      <div className="whiteBg berita">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Berita</h1>
            <p className="desc-heading">Kegitan & Event Terbaru</p>
          </HeaderInfo>
          <Grid container spacing={2}>
            <Grid item lg={4} xs={12} md={4}>
              <Card className="card-asik" sx={{ minWidth: 275 }}>
                <CardContent>
                <img src="/assets/images/screen.png" alt="test" style={{ width: '100%' }} />
                  <Typography className="tittle-card" gutterBottom>
                      Rapat Laporan Antara dan Laporan Akhir Kajian Pengaruh Pandemi Covid–19 Terhadap
                  </Typography>
                    <div className="card-posting">
                        <Typography component="div">
                          Harini 
                      </Typography>
                      <Typography> • </Typography>
                      <Typography  color="text.secondary">
                            Baru saja
                      </Typography>
                
                    </div>
                </CardContent>
                <CardActions className="p-10">
                  <Button className="tag-button" size="small">Kegiatan & Event</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item lg={4} xs={12} md={4}>
              <Card className="card-asik" sx={{ minWidth: 275 }}>
                <CardContent>
                <img src="/assets/images/screen.png" alt="test" style={{ width: '100%' }} />
                  <Typography className="tittle-card" gutterBottom>
                      Rapat Laporan Antara dan Laporan Akhir Kajian Pengaruh Pandemi Covid–19 Terhadap
                  </Typography>
                    <div className="card-posting">
                        <Typography component="div">
                          Harini 
                      </Typography>
                      <Typography> • </Typography>
                      <Typography  color="text.secondary">
                            Baru saja
                      </Typography>
                
                    </div>
                </CardContent>
                <CardActions className="p-10">
                  <Button className="tag-button" size="small">Kegiatan & Event</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item lg={4} xs={12} md={4}>
              <Card className="card-asik" sx={{ minWidth: 275 }}>
                <CardContent>
                <img src="/assets/images/screen.png" alt="test" style={{ width: '100%' }} />
                  <Typography className="tittle-card" gutterBottom>
                      Rapat Laporan Antara dan Laporan Akhir Kajian Pengaruh Pandemi Covid–19 Terhadap
                  </Typography>
                    <div className="card-posting">
                        <Typography component="div">
                          Harini 
                      </Typography>
                      <Typography> • </Typography>
                      <Typography  color="text.secondary">
                            Baru saja
                      </Typography>
                
                    </div>
                </CardContent>
                <CardActions className="p-10">
                  <Button className="tag-button" size="small">Kegiatan & Event</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <div className="see-all">
          <Button className="see-all-button" size="small">Selengkapnya <NavigateNextIcon/> </Button>
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
