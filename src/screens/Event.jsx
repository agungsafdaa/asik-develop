import React, { useState, useEffect  } from 'react';

import Breadcumbs from "../components/Sections/Breadcumbs";
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'

import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from 'axios';
import { CircularProgress } from '@mui/material';
function convertDateDBtoIndo(string) {
  const bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const tanggal = string.split("-")[2];
  const bulan = string.split("-")[1];
  const tahun = string.split("-")[0];

  return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
}
export default function Event(props) {
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(false)
  const [berita, setBerita] = useState([])
  const [state, setState] = useState({});

  // eslint-disable-next-line no-unused-vars
  const [namaPage, setNamaPage] = useState(
    'Event & Kegiatan'
  );
  const handleChange = async ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  }
  const tanggal_berita = state.opd ? state.opd : " "
  const nama_berita = state.nama_inovasi ? state.nama_inovasi : " "

  const getBerita = async () => {
    setLoading(true)
    try {
      let url = "  https://asik.palembang.go.id/api/beritas?sort[0]=id%3Adesc&populate=*&pagination[pageSize]=9"
      const response = await axios.get(url);
      if (response.status === 200) {

        setBerita(response.data.data)
        setPagination(response.data.meta.pagination)
        setLoading(false)
      }
    } catch (error) {
      throw error;
    }
  }

  const getFilterBerita = async () => {
    setLoading(true)
    try {
    
      let url = tanggal_berita.length >=2 & nama_berita.length >= 2 ?   "https://asik.palembang.go.id/api/beritas?filters[tanggal_berita][$contains]=" + tanggal_berita + "&filters[judul_berita][$contains]=" + nama_berita + "&populate=*" :  tanggal_berita.length >=2 ? "https://asik.palembang.go.id/api/beritas?filters[tanggal_berita][$contains]=" + tanggal_berita + "&populate=*" : nama_berita.length >= 2 ? "https://asik.palembang.go.id/api/beritas?filters[judul_berita][$contains]=" + nama_berita + "&populate=*" : ""
      // http://103.138.143.35:1337/api/beritas?filters[Nama_opd][$contains]=Kecamatan%20Sematang%20Borang&filters[Waktu_uji_coba][$contains]=2022-02-15
      const response = await axios.get(url, {
      });
    
      if (response.status === 200) {
        setBerita(response.data.data)
        setPagination(response.data.meta.pagination)
        setLoading(false)
      }
    } catch (error) {
      throw error;
    }

  }

  const backPage = async () => {
    const page = parseInt(pagination.page) - 1

    setLoading(true)
    try {
      let url = "https://asik.palembang.go.id/api/beritas?sort[0]=id%3Adesc&populate=*&pagination[pageSize]=9&pagination[page]=" + page
      const response = await axios.get(url);
      setBerita(response.data.data)
      setPagination(response.data.meta.pagination)
      setLoading(false)
    } catch (error) {
      throw error;
    }
  }



  const backPage2x = async () => {

    const page = parseInt(pagination.page) - 2
    setLoading(true)

    try {
      let url = "https://asik.palembang.go.id/api/beritas?sort[0]=id%3Adesc&populate=*&pagination[pageSize]=9&pagination[page]=" + page
      const response = await axios.get(url);

      setBerita(response.data.data)
      setPagination(response.data.meta.pagination)
      setLoading(false)
    } catch (error) {
      throw error;
    }
  }


  const nextPage = async () => {
    const page = parseInt(pagination.page) + 1

    setLoading(true)

    try {
      let url = "https://asik.palembang.go.id/api/beritas?sort[0]=id%3Adesc&populate=*&pagination[pageSize]=9&pagination[page]=" + page
      const response = await axios.get(url);

      setBerita(response.data.data)
      setPagination(response.data.meta.pagination)
      setLoading(false)
    } catch (error) {
      throw error;
    }
  }


  const nextPage2x = async () => {


    setLoading(true)
    const page = pagination.page > pagination.pageCount ? parseInt(pagination.page) + 1 : parseInt(pagination.page) + 2
    try {

      let url = "https://asik.palembang.go.id/api/beritas?sort[0]=id%3Adesc&populate=*&pagination[pageSize]=9&pagination[page]=" + page


      const response = await axios.get(url);

      setBerita(response.data.data)
      setPagination(response.data.meta.pagination)
      setLoading(false)
    } catch (error) {
      throw error;
    }
  }


  useEffect(() => {
    getBerita()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>



      <Breadcumbs page={namaPage} />



      <Wrapper id="blog">
        <div className="whiteBg">
          <div className="container">

            <div className="search-area">
              <Card className="card-search">
                <div className="search-bar">
                  <TextField type="date" InputLabelProps={{ shrink: true }} name="opd" onChange={handleChange} label="Tanggal Kegiatan" variant="outlined" />
                  <TextField id="outlined-basic" label="Temukan Kegiatan & Event" name="nama_inovasi"  onChange={handleChange} variant="outlined" />
                  <button onClick={getFilterBerita} name="subject" className="see-all-button">
                    Cari
                  </button>
                </div>
              </Card>
            </div>

            <Grid container spacing={2}>
              {loading === true ? <CircularProgress /> : berita.length >= 1 ?  berita.map((item) => (


                <Grid item lg={4} xs={12} md={4}>
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
              
              ))   : <div className="text-center">
                <h4>Tidak ada Berita</h4>
              </div> }
            </Grid>

            <Card className="pagination-card">
              <div className="pagination-user">
                <ul className='pagination-sidemang'>
                  {pagination.page === 1 ? <button name="subject" className="disabled" type="submit" disabled>
                    <SkipPreviousIcon />
                  </button>
                    : parseInt(pagination.page) - 1 === 1 ?
                      <button name="subject" className="disabled" type="submit" disabled>
                        <SkipPreviousIcon />
                      </button>
                      :
                      <button name="subject" onClick={backPage2x} type="submit" >
                        <SkipPreviousIcon />

                      </button>}
                  {pagination.page === 1 ? <button name="subject" className="disabled" type="submit" disabled>
                    <ArrowBackIosIcon />
                  </button> : <button name="subject" onClick={backPage} type="submit">
                    <ArrowBackIosIcon />
                  </button>}

                  {pagination.page >= pagination.pageCount ? <button name="subject" className="disabled" type="submit" disabled>
                    <ArrowForwardIosIcon />
                  </button> : <button name="subject" onClick={nextPage} type="submit" >
                    <ArrowForwardIosIcon />

                  </button>}

                  {pagination.page >= pagination.pageCount ? <button name="subject" className="disabled" type="submit" disabled>
                    <SkipNextIcon />
                  </button> :
                    parseInt(pagination.pageCount) - 1 === pagination.page ?

                      <button name="subject" className="disabled" type="submit" disabled>
                        <SkipNextIcon />
                      </button> :
                      <button name="subject" onClick={nextPage2x} type="submit">
                        <SkipNextIcon />
                      </button>
                  }
                </ul>
              </div>
            </Card>
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


