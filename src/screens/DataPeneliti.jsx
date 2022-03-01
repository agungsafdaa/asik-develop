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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
export default function Event(props) {

    const [state, setState] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [namaPage, setNamaPage] = useState(
        'Event & Kegiatan'
    );

    const [inovasi, setInovasi] = useState([])
    const [pagination, setPagination] = useState({})
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
            let url = "https://asik.palembang.go.id/api/data-penelitis"
            
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

    const getFilterKajian = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis?filters[Publish][$ne]=false&filters[Inisiator_inovasi][$contains]=" + state.opd + "&filters[Waktu_uji_coba][$contains]=" + state.tanggal_kegiatan + "&filters[Nama_inovasi][$contains]=" + state.nama_inovasi
            // http://103.138.143.35:1337/api/inovasis?filters[Nama_opd][$contains]=Kecamatan%20Sematang%20Borang&filters[Waktu_uji_coba][$contains]=2022-02-15
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
        console.log(pagination.page)
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis?filters[Nama_opd][$contains]=" + localStorage.getItem("nama_opd") + "&populate=*&pagination[page]=" + page
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
            let url = "https://asik.palembang.go.id/api/inovasis?filters[Nama_opd][$contains]=" + localStorage.getItem("nama_opd") + "&populate=*&pagination[page]=" + page
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
            let url = "https://asik.palembang.go.id/api/inovasis?filters[Nama_opd][$contains]=" + localStorage.getItem("nama_opd") + "&populate=*&pagination[page]=" + page
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

            let url = "https://asik.palembang.go.id/api/inovasis?filters[Nama_opd][$contains]=" + localStorage.getItem("nama_opd") + "&pagination[page]=" + page


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
                            <Card className="daftar-peneliti">
                              <div className="heading">
                              <h3>Daftar Peneliti</h3>
                              </div>
                            {loading === true ? <CircularProgress /> : <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead className="table-inovasi">
                                    <TableRow>
                                        <TableCell>Nama Peneliti</TableCell>
                                        <TableCell>Tempat Tanggal Lahir</TableCell>
                                        <TableCell>Agama</TableCell>
                                        <TableCell>Alamat</TableCell>
                                        <TableCell>Pekerjaan</TableCell>
                                        <TableCell>NIP</TableCell>
                                        <TableCell>Jabatan</TableCell>
                                        <TableCell>Pangkat golongan</TableCell>
                                        <TableCell>Alumni terakhir</TableCell>
                                        <TableCell>Contact Person</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {inovasi.map((row) => (

                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link to="/">  {row.attributes.Nama_peneliti}</Link>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <Link to="/">  {row.attributes.Tempat_tgl_lahir}</Link>
                                            </TableCell>
                                            <TableCell>{row.attributes.Agama}</TableCell>
                                            <TableCell>{row.attributes.Alamat}</TableCell>
                                            <TableCell>{row.attributes.Pekerjaan}</TableCell>
                                            <TableCell>{row.attributes.NIP}</TableCell>
                                            <TableCell>{row.attributes.Jabatan}</TableCell>
                                            <TableCell>{row.attributes.Pangkat_golongan}</TableCell>
                                            <TableCell>{row.attributes.Alumni_terakhir}</TableCell>
                                            <TableCell>{row.attributes.Contact_person}</TableCell>
                                          
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        }
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


