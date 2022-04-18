import React, { useState, useEffect } from 'react';
import Breadcumbs from "../components/Sections/Breadcumbs";
import TextField from '@mui/material/TextField';

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
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
export default function Regulasi() {
    const [pagination, setPagination] = useState({})
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
            let url = "https://asik.palembang.go.id/api/regulasis?populate=%2A"
            const response = await axios.get(url, {
            });
            if (response.status === 200) {
                setInovasi(response.data.data)
                setPagination(response.data.meta.pagination)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }

    const opd = state.opd ? state.opd : " "
    const searchinovasi = state.nama_inovasi ? state.nama_inovasi : " "
    const getFilterKajian = async () => {
        setLoading(true)
        try {

            let url = "https://asik.palembang.go.id/api/regulasis?filters[Publish][$ne]=false&filters[Nama_opd][$contains]=" + opd + "&filters[Nama_inovasi][$contains]=" + searchinovasi
            // http://103.138.143.35:1337/api/regulasis?filters[Nama_opd][$contains]=Kecamatan%20Sematang%20Borang&filters[Waktu_uji_coba][$contains]=2022-02-15
            const response = await axios.get(url, {
            });
            if (response.status === 200) {
                setInovasi(response.data.data)
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
            let url = "https://asik.palembang.go.id/api/regulasis?filters[Nama_opd][$contains]=" + state.opd + "&populate=*&pagination[page]=" + page
            const response = await axios.get(url);
            setInovasi(response.data.data)
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
            let url = "https://asik.palembang.go.id/api/regulasis?filters[Nama_opd][$contains]=" + state.opd + "&populate=*&pagination[page]=" + page
            const response = await axios.get(url);

            setInovasi(response.data.meta)
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
            let url = "https://asik.palembang.go.id/api/regulasis?filters[Nama_opd][$contains]=" + state.opd + "&populate=*&pagination[page]=" + page
            const response = await axios.get(url);

            setInovasi(response.data.data)
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

            let url = "https://asik.palembang.go.id/api/regulasis?filters[Nama_opd][$contains]=" + state.opd + "&pagination[page]=" + page + "&populate=*"


            const response = await axios.get(url);

            setInovasi(response.data.data)
            setPagination(response.data.meta.pagination)
            setLoading(false)
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
                                {/* <div className="heading-search">
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
                                </div> */}
                                <div className="heading-search">
                                    <h3>Cari Berdasarkan</h3>
                                </div>
                                <div className="search-bar">
                                    <TextField id="outlined-basic" name="opd" label="OPD" variant="outlined" onChange={handleChange} value={state.opd || ''} />
                                    <TextField id="outlined-basic" name="nama_inovasi" label="Temukan Kegiatan & Event" variant="outlined" onChange={handleChange} value={state.nama_inovasi || ' '} />
                                    <button onClick={getFilterKajian} name="subject" className="see-all-button">
                                        Cari
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {loading === true ? <CircularProgress /> : <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead className="table-inovasi">
                                    <TableRow>
                                        <TableCell align="left">Judul</TableCell>
                                        <TableCell>Tahun</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {inovasi.map((row) =>  (

                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <List>
                                                    <a href={`https://asik.palembang.go.id${row.attributes.file_regulasi.data.attributes.url}`} target="_blank" rel="noreferrer">
                                                        <ListItem>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                <PictureAsPdfIcon/>
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                className="tittle-kajian"
                                                                primary={row.attributes.judul_regulasi}

                                                            />

                                                        </ListItem>



                                                    </a>
                                                </List>

                                            </TableCell>
                                            <TableCell>{row.attributes.tahun}</TableCell>






                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        }
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


