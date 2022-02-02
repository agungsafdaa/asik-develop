import React, { useState } from "react";
// import Projects from "../components/Sections/Projects";
import Breadcumbs from "../components/Sections/Breadcumbs";
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'

import styled from "styled-components";
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Event(props) {
  const [value, setValue] = React.useState(null);
  const [namaPage, setNamaPage] = useState(
    'Event & Kegiatan'
  );
  return (
    <>



      <Breadcumbs page={namaPage} />



      <Wrapper id="blog">
        <div className="whiteBg">
          <div className="container">

           <div className="search-area">
           <Card className="card-search">
              <div className="search-bar">
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DatePicker
                    label="Tanggal"
                    value={value}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <TextField id="outlined-basic" label="Temukan Kegiatan & Event" variant="outlined" />
                <button name="subject" className="see-all-button">
                    Cari
                  </button>
              </div>
            </Card>
           </div>

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
                      <Typography color="text.secondary">
                        Baru saja
                      </Typography>

                    </div>
                  </CardContent>
                  <CardActions className="p-10">
                  <Link to={{pathname: `/Event`, state: ''}}>
                  <Button className="tag-button" size="small">Kegiatan & Event</Button>
                  </Link>
                  
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
                      <Typography color="text.secondary">
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
                      <Typography color="text.secondary">
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
                      <Typography color="text.secondary">
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
                      <Typography color="text.secondary">
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
                      <Typography color="text.secondary">
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
                      <Typography color="text.secondary">
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
                      <Typography color="text.secondary">
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
                      <Typography color="text.secondary">
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

            <nav className="pagination-area">
              <ul className='pagination-asik'>
                <button name="subject" className="see-all-button disabled" value="Sebelumnya" type="submit" disabled>
                  Sebelumnya
                </button>
                {/* </button> : <button name="subject" onClick={nextPage} type="submit" value="1">
                <ArrowBackIosIcon />
              </button>} */}


                <li className='page-item' >
                  <button name="subject" className='active' type="submit">
                    1
                  </button>

                </li>
                <li className='page-item' >
                  <button name="subject" className='not-active' type="submit">
                    2
                  </button>

                </li>

                <li className='page-item' >
                  <button name="subject" className='not-active' type="submit">
                    2
                  </button>

                </li>


                <li>
                  <button name="subject" className="see-all-button">
                    Selanjutnya
                  </button>
                </li>
              </ul>
            </nav>
          </div>

        </div>
      </Wrapper>


    </>
  );
}
const Wrapper = styled.section`
  width: 100%;
  padding-top: 20px;
  padding-bottom:20px;
`;
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;

