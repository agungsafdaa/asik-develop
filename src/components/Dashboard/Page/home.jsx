import React, { useState, useEffect } from 'react';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import axios from 'axios';
import { Link } from 'react-router-dom'
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Button from "@mui/material/Button";
import TableRow from '@mui/material/TableRow';
import { CircularProgress } from '@mui/material';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
export default function Home() {
    const blue = {
        100: '#DAECFF',
        200: '#80BFFF',
        400: '#3399FF',
        600: '#0072E5',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E7EBF0',
        200: '#E0E3E7',
        300: '#CDD2D7',
        400: '#B2BAC2',
        500: '#A0AAB4',
        600: '#6F7E8C',
        700: '#3E5060',
        800: '#2D3843',
        900: '#1A2027',
    };

    const StyledInputElement = styled('input')(
        ({ theme }) => `
        width: 320px;
        font-size: 0.875rem;
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 400;
        line-height: 1.5;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
        border-radius: 8px;
        padding: 12px 12px;
      
        &:hover {
          background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
          border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
        }
      
        &:focus {
          outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
        }
      `,
    );

    const CustomInput = React.forwardRef(function CustomInput(props, ref) {
        return (
            <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
        );
    });

    const [loading, setLoading] = useState(false)
    const [inovasi, setInovasi] = useState([])
    const [total, setTotal] = useState()
    const [publish, setPublish] = useState()
    const [rejected, setRejected] = useState()
    const [pagination, setPagination] = useState({})
    
    const getKajian = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis?filters[Nama_opd][$contains]=" + localStorage.getItem("nama_opd") + '&populate=*'
            const response = await axios.get(url);
            if (response.status === 200) {
             
                setInovasi(response.data.data)
                setPagination(response.data.meta.pagination)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }

    const totalInovasi = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis?filters[Nama_opd][$contains]=" + localStorage.getItem("nama_opd") + '&pagination[pageSize]=1'
            const response = await axios.get(url);
            if (response.status === 200) {
               
                setTotal(response.data.meta.pagination.total)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
      
    }

    const publishInovasi = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis?filters[Nama_opd][$contains]=" + localStorage.getItem("nama_opd") + '&pagination[pageSize]=1&filters[Publish][$ne]=false'
            const response = await axios.get(url);
            if (response.status === 200) {
                console.log(response.data.meta)
                setPublish(response.data.meta.pagination.total)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
      
    }

    const rejectInovasi = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis?filters[Nama_opd][$contains]=" + localStorage.getItem("nama_opd") + '&pagination[pageSize]=1&filters[Catatan][$null]=null'
            const response = await axios.get(url);
            if (response.status === 200) {
                console.log(response.data.meta)
                setRejected(response.data.meta.pagination.total)
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
        publishInovasi()
        getKajian()
        totalInovasi()
        rejectInovasi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="info-home">
                <h1 className="tittle">Dashboard Asik Bappeda Kota Palembang</h1>
            </div>
            <Alert severity="error" className="information"><h3>Harap diperhatikan!</h3> <br />    Inovasi yang diajukan akan di review terlebih dahulu oleh Admin Asik Bappeda Litbang mohon cek kembali apakah inovasi yang diajukan disetujui / ditolak</Alert>
            <div className="overview-menu">
                <Card className="card-overview">
                    <CardContent className="content">
                        <EmojiObjectsOutlinedIcon className="icon" />
                        <div className="infografis">
                            Inovasi di ajukan
                            <h5> {loading === true ? <CircularProgress/> : total}</h5>
                        </div>

                    </CardContent>
                </Card>
                <Card className="card-overview">
                    <CardContent className="content">
                        <EmojiObjectsOutlinedIcon className="icon" />
                        <div className="infografis">
                            Inovasi belum ditanggapi
                            <h5> {loading === true ? <CircularProgress/> : rejected}</h5>
                        </div>
                    </CardContent>
                </Card>
                <Card className="card-overview">
                    <CardContent className="content">
                        <EmojiObjectsOutlinedIcon className="icon" />
                        <div className="infografis">
                            Inovasi di Terima
                            <h5> {loading === true ? <CircularProgress/> : publish}</h5>
                        </div>
                    </CardContent>
                </Card>

            </div>

            <div className="list-inovasi">
                <Card className="card-inovasi">
                    <CardContent className="content">

                        <div className="heading-card">
                            <Typography gutterBottom>
                                List Inovasi yang di ajukan
                            </Typography>
                            <div className="search-area">
                                <CustomInput aria-label="Demo input" placeholder="Type something..." />
                                <Link to={{ pathname: `/tambahInovasi`, state: '' }}>
                                    <Button className="see-all-button" size="small">Tambah Inovasi  </Button>
                                </Link>
                            </div>
                        </div>
                        {loading === true ? <CircularProgress /> : <TableContainer >
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead className="table-inovasi">
                                    <TableRow>
                                        <TableCell>Nama OPD</TableCell>
                                        <TableCell>Bentuk Inovasi</TableCell>
                                        <TableCell>Nama Inovasi</TableCell>

                                     
                                        <TableCell>Status</TableCell>
                                        <TableCell>Catatan</TableCell>
                                        <TableCell>Aksi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {inovasi.map((row) => (

                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{row.attributes.Nama_opd}</TableCell>
                                            <TableCell component="th" scope="row">
                                                <Link to="/">  {row.attributes.Bentuk_inovasi}</Link>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <Link to="/">  {row.attributes.Nama_inovasi}</Link>
                                            </TableCell>

                                        
                                            <TableCell>{row.attributes.Publish === false ? 'Belum disetujui' : 'disetujui'}</TableCell>
                                            <TableCell>{row.attributes.Catatan === null ? 'Belum ada tanggapan' : row.attributes.Catatan}</TableCell>
                                            <TableCell>
                                                {row.attributes.Publish === false ? 
                                                <>
                                                    <div className="aksi">
                                                        <Link to={`/editInovasi`} state={{ idInovasi: row }}>
                                                            <EditIcon />
                                                        </Link>
                                                        <Link to={`/tambahIndikator/${row.id}`} state={{ idInovasi: row }} alt="indikator">
                                                            <FolderIcon/>
                                                        </Link>
                                                    </div>
                                                </>
                                                 : <>
                                                    <Typography>Inovasi telah disetujui anda tidak bisa lagi mengubah inovasi yang telah di ajukan</Typography></>}

                                            </TableCell>
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
                    </CardContent>
                </Card>
            </div>

        </>
    );
}


