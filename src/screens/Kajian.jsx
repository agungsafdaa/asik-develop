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
import Autocomplete from '@mui/material/Autocomplete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


export default function Event() {
    const [pagination, setPagination] = useState({})
    const [state, setState] = useState({});
    const [kategori, setKategori] = useState({});
    const [open, setOpen] = useState(false);
    const [kajianKategori, setKajiankategori] = useState([])
    const loadingKategori = open && kajianKategori.length === 0;
    // eslint-disable-next-line no-unused-vars
    const [namaPage, setNamaPage] = useState(
        'Event & Kegiatan'
    );

    const [kajian, setKajian] = useState([])

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
            let url = "https://asik.palembang.go.id/api/kajians?sort[0]=id%3Adesc&populate=*"
            const response = await axios.get(url, {
            });
            if (response.status === 200) {
                setKajian(response.data.data)
                setPagination(response.data.meta.pagination)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }

    const opd =  kategori ? kategori.attributes : " "
    const searchkajian = state.nama_kajian ? state.nama_kajian : " "
 
    // const getKategori
    const getFilterKajian = async () => {
        setLoading(true)
        try {
            // "&filters[Nama_kajian][$contains]=" + searchkajian +
            // https://asik.palembang.go.id/api/kajians?filters[kajian_kategoris][nama_kategori][$eq]=Infrastruktur&populate=%2a
            let url = "https://asik.palembang.go.id/api/kajians?filters[kajian_kategoris][nama_kategori][$eq]=" + opd.nama_kategori + "&filters[Judul][$contains]=" + searchkajian + "&populate=%2a&sort[0]=id%3Adesc"
            // http://103.138.143.35:1337/api/kajians?filters[Nama_opd][$contains]=Kecamatan%20Sematang%20Borang&filters[Waktu_uji_coba][$contains]=2022-02-15
            const response = await axios.get(url, {
            });
            if (response.status === 200) {
                setKajian(response.data.data)
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
            let url = opd === undefined  ||  searchkajian === ' ' ?    "https://asik.palembang.go.id/api/kajians?populate=*&pagination[page]=" + page   + "&sort[0]=id%3Adesc"  :  "https://asik.palembang.go.id/api/kajians?filters[kajian_kategoris][nama_kategori][$eq]=" + opd.nama_kategori   + "&filters[Judul][$contains]=" + searchkajian +  "&populate=*&pagination[page]=" + page  + "&sort[0]=id%3Adesc"
            const response = await axios.get(url);
            setKajian(response.data.data)
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
            let url = opd === undefined  ||  searchkajian === ' ' ?    "https://asik.palembang.go.id/api/kajians?populate=*&pagination[page]=" + page   + "&sort[0]=id%3Adesc"  :  "https://asik.palembang.go.id/api/kajians?filters[kajian_kategoris][nama_kategori][$eq]=" + opd.nama_kategori   + "&filters[Judul][$contains]=" + searchkajian +  "&populate=*&pagination[page]=" + page  + "&sort[0]=id%3Adesc"
            const response = await axios.get(url);

            setKajian(response.data.data)
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
            let url = opd === undefined  ||  searchkajian === ' ' ?    "https://asik.palembang.go.id/api/kajians?populate=*&pagination[page]=" + page   + "&sort[0]=id%3Adesc"  :  "https://asik.palembang.go.id/api/kajians?filters[kajian_kategoris][nama_kategori][$eq]=" + opd.nama_kategori   + "&filters[Judul][$contains]=" + searchkajian +  "&populate=*&pagination[page]=" + page  + "&sort[0]=id%3Adesc"
            // let url = "https://asik.palembang.go.id/api/kajians?filters[Nama_opd][$contains]=" + state.opd + "&populate=*&pagination[page]=" + page
            const response = await axios.get(url);

            setKajian(response.data.data)
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

            let url = opd === undefined  ||  searchkajian === ' ' ?    "https://asik.palembang.go.id/api/kajians?populate=*&pagination[page]=" + page   + "&sort[0]=id%3Adesc"  :  "https://asik.palembang.go.id/api/kajians?filters[kajian_kategoris][nama_kategori][$eq]=" + opd.nama_kategori   + "&filters[Judul][$contains]=" + searchkajian +  "&populate=*&pagination[page]=" + page  + "&sort[0]=id%3Adesc"


            const response = await axios.get(url);

            setKajian(response.data.data)
            setPagination(response.data.meta.pagination)
            setLoading(false)
        } catch (error) {
            throw error;
        }
    }


    const getKategori = (event, newKategori) => {
        const kategori = newKategori;
        setKategori(kategori);
    };

  

    useEffect(() => {
        getKajian()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let activeDistrict = true;

        if (!setKajiankategori) {
            return undefined;
        }

        (async () => {
            await sleep(1e3);

            if (activeDistrict) {
                try {

                    const url = 'https://asik.palembang.go.id/api/kajian-kategoris?pagination[pageSize]=100';
                    let response = await axios.get(url)

                    setKajiankategori(response.data.data)


                } catch (err) {
                    alert(err);
                }
            }
        })();

        return () => {
            activeDistrict = false;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingKategori]);

    useEffect(() => {
        if (!open) {
            setKajiankategori([]);
        }
    }, [open]);


  
    return (
        <>
            <Breadcumbs page={namaPage} />


            <Wrapper id="blog">
                <div className="whiteBg">
                    <div className="container">

                        <div className="search-area">
                            <Card className="card-search">


                                <div className="heading-search">
                                    <h3>Cari Berdasarkan</h3>
                                </div>
                                <div className="search-bar">
                                    <Autocomplete
                                        id="asynchronous-demo"

                                        open={open}
                                        onOpen={() => {
                                            setOpen(true)
                                        }}
                                        onClose={() => {
                                            setOpen(false)
                                        }}

                                        isOptionEqualToValue={(option, value) => option.attributes.nama_kategori === value.attributes.nama_kategori}
                                        onChange={getKategori}
                                        getOptionLabel={(option) => option.attributes.nama_kategori}

                                        options={kajianKategori}
                                        loading={loadingKategori}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                               
                                                key={params.id}
                                                label={"Kategori"}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <React.Fragment>
                                                            {loadingKategori ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />

                                    <TextField id="outlined-basic" name="nama_kajian" label="Temukan Kegiatan & Event" variant="outlined" onChange={handleChange} value={state.nama_kajian || ' '} />
                                    <button onClick={getFilterKajian} name="subject" className="see-all-button">
                                        Cari
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {loading === true ? <CircularProgress /> : <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead className="table-kajian">
                                    <TableRow>
                                        <TableCell align="left">Judul</TableCell>
                                        <TableCell>Tahun</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {kajian.map((row)  =>  (
                                    
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <List>
                                                    <Link to={`/detail-kajian/${row.attributes.Judul}`}>
                                                        <ListItem>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    {row.attributes.Gambar.data.attributes.formats.medium ?    <img src={'https://asik.palembang.go.id' + row.attributes.Gambar.data.attributes.formats.medium.url} loading="lazy" alt="test" style={{ width: '100%' }} /> :     <Avatar>
                                                                <PictureAsPdfIcon/>
                                                                </Avatar>}
                                                                 
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                className="tittle-kajian"
                                                                primary={row.attributes.Judul}

                                                            />

                                                        </ListItem>



                                                    </Link>
                                                </List>

                                            </TableCell>
                                            <TableCell>{row.attributes.Tahun}</TableCell>






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


