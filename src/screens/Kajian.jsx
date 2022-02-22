import React, { useState, useEffect } from 'react';
// import Projects from "../components/Sections/Projects";
import Breadcumbs from "../components/Sections/Breadcumbs";
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import axios from 'axios';
import styled from "styled-components";
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
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

function createData(Judul, Kategori, Opd, Tahun, Tags, Notes) {
    return { Judul, Kategori, Opd, Tahun, Tags, Notes };
}



const rows = [
    createData('Palembang Digital', 'Palembang Digital', 'BAPPEDA LITBANG', 2021, 'Digital, Media', 'Kemajuan dunia teknologi'),
    createData('Konsep Pengembangan dan Pengelolaan Taman', 'Konsep Pengembangan dan Pengelolaan Taman', 'BAPPEDA LITBANG', 2018, 'Digital, Media', 'Kemajuan dunia teknologi'),

];


export default function Event(props) {
    const [value, setValue] = useState(null);
    const [namaPage, setNamaPage] = useState(
        'Event & Kegiatan'
    );

    const [inovasi, setInovasi] = useState([])
    const [loading, setLoading] = useState(false)

    const getKajian = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis"
            const response = await axios.get(url, {
            });
            if(response.status === 200){
                setInovasi(response.data)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }

    const getFilterKajian = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis?filters[Nama_opd][$contains]=Dinas%20Pariwisata"
            const response = await axios.get(url, {
            });
            if(response.status === 200){
                setInovasi(response.data)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
     
    }
    console.log(rows)
    console.log(inovasi.data)
    useEffect(() => {
        getKajian()
    })
 
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
                                    <TextField id="outlined-basic" label="OPD" variant="outlined" />
                                    <LocalizationProvider dateAdapter={DateAdapter}>
                                        <DatePicker
                                            label="Tahun"
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

                        {loading === true ? <CircularProgress /> : <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead className="table-head">
                                    <TableRow>
                                        <TableCell>Judul</TableCell>
                                        <TableCell align="right">Kategori</TableCell>
                                        <TableCell align="right">OPD</TableCell>
                                        <TableCell align="right">Tahun</TableCell>
                                        <TableCell align="right">Tags</TableCell>
                                        <TableCell align="right">Notes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {inovasi.data.map((row) => (

                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link to="/">  {row.attributes.Bentuk_inovasi}</Link>
                                            </TableCell>
                                            <TableCell align="right">{row.attributes.Nama_opd}</TableCell>
                                            <TableCell align="right">{row.attributes.Hasil_inovasi}</TableCell>
                                            <TableCell align="right">{row.attributes.Inisiator_inovasi}</TableCell>
                                            <TableCell align="right">{row.attributes.Jenis_inovasi}</TableCell>
                                            <TableCell align="right">{row.attributes.Manfaat_inovasi}</TableCell>
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
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;

