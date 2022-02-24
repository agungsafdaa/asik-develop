import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import Alert from '@mui/material/Alert';
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

    const getKajian = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis"
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
    useEffect(() => {
        getKajian()
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
                            <h5> 10</h5>
                        </div>

                    </CardContent>
                </Card>
                <Card className="card-overview">
                    <CardContent className="content">
                        <EmojiObjectsOutlinedIcon className="icon" />
                        <div className="infografis">
                            Inovasi di tolak
                            <h5> 10</h5>
                        </div>
                    </CardContent>
                </Card>
                <Card className="card-overview">
                    <CardContent className="content">
                        <EmojiObjectsOutlinedIcon className="icon" />
                        <div className="infografis">
                            Inovasi di Terima
                            <h5> 10</h5>
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
                    </CardContent>
                </Card>
            </div>

        </>
    );
}


