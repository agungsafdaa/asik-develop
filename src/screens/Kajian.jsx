import React, { useState, useEffect } from 'react';
import Breadcumbs from "../components/Sections/Breadcumbs";
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import axios from 'axios';
import styled from "styled-components";
import Card from "@mui/material/Card";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import { CircularProgress } from '@mui/material';

export default function Event(props) {
  
    const [state, setState] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [namaPage, setNamaPage] = useState(
        'Event & Kegiatan'
    );

    const [inovasi, setInovasi] = useState([])
    const [loading, setLoading] = useState(false)
    const handleChange = async ({ target: { name, value } }) => {

        setState({
          ...state,
          [name]: value,
        });
    }
    const getKajian = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis?filters[Publish][$ne]=false"
            const response = await axios.get(url, {
            });
            if(response.status === 200){
                setInovasi(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }

    const getFilterKajian = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis?filters[Publish][$ne]=false&filters[Inisiator_inovasi][$contains]=" + state.opd + "&filters[Waktu_uji_coba][$contains]=" + state.tanggal_kegiatan + "&filters[Nama_inovasi][$contains]=" + state.nama_inovasi
            // http://103.138.143.35:1337/api/inovasis?filters[Nama_opd][$contains]=Kecamatan%20Sematang%20Borang&filters[Waktu_uji_coba][$contains]=2022-02-15
            const response = await axios.get(url, {
            });
            if(response.status === 200){
                setInovasi(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
     
    }

    useEffect(() => {
        getKajian()
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
                                <div className="heading-search">
                                    <Typography>Pilih Kategori</Typography>
                                </div>
                                <div className="filter-area">
                                    <button name="subject" className="button-active">
                                        Kajian
                                    </button>
                                    <button name="subject" className="button-inactive">
                                        Kegiatan & Event
                                    </button>
                                    <button name="subject" className="button-inactive">
                                        Inovasi Daerah
                                    </button>
                                </div>
                                <div className="container">
                                    <Typography>Cari Berdasarkan</Typography>
                                </div>
                                <div className="search-bar">
                                    <TextField id="outlined-basic" name="opd" label="OPD" variant="outlined"  onChange={handleChange} value={state.opd || ''} />
                                    <TextField id="outlined-basic" type="date" InputLabelProps={{ shrink: true }}  name="tanggal_kegiatan" label="Tanggal Kegiatan" variant="outlined"  onChange={handleChange} value={state.tanggal_kegiatan || ''} />
                                    <TextField id="outlined-basic" name="nama_inovasi" label="Temukan Kegiatan & Event" variant="outlined"  onChange={handleChange} value={state.nama_inovasi || ' '}/>
                                    <button onClick={getFilterKajian} name="subject" className="see-all-button">
                                        Cari
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {loading === true ? <CircularProgress /> : <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small"  aria-label="a dense table">
                                <TableHead className="table-inovasi">
                                    <TableRow>
                                        <TableCell>Bentuk Inovasi</TableCell>
                                        <TableCell>Nama Inovasi</TableCell>
                                        <TableCell>Nama OPD</TableCell>
                                        <TableCell>Hasil Inovasi</TableCell>
                                        <TableCell>Inisiator Inovasi</TableCell>
                                        <TableCell>Jenis Inovasi</TableCell>
                                        <TableCell>Manfaat Inovasi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {inovasi.map((row) => (

                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link to="/">  {row.attributes.Bentuk_inovasi}</Link>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <Link to="/">  {row.attributes.Nama_inovasi}</Link>
                                            </TableCell>
                                            <TableCell>{row.attributes.Nama_opd}</TableCell>
                                            <TableCell >{row.attributes.Hasil_inovasi}</TableCell>
                                            <TableCell>{row.attributes.Inisiator_inovasi}</TableCell>
                                            <TableCell>{row.attributes.Jenis_inovasi}</TableCell>
                                            <TableCell>{row.attributes.Manfaat_inovasi}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        }
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


