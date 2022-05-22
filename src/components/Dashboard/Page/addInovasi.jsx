import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddInovasi() {
    const isAuthenticated = localStorage.getItem("token")
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const [open, setOpen] = React.useState(false);



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
        width: 1040px;
        font-size: 0.875rem;
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 400;
        line-height: 1.5;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
       
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


    const theme = useTheme();
    let navigate = useNavigate();
    const [urusanInovasi, setUrusanInovasi] = useState([]);
    const [loading, setLoading] = useState(false)
    const [listUrusan, setListuUrusan] = useState([])
    const [state, setState] = useState({});
    const [rancangBangun, setRancangBangun] = useState({});
    const [tujuanInvoasi, setTujuanInovasi] = useState({});
    const [manfaat, setManfaat] = useState({});
    const [hasil, setHasil] = useState({});

    const [pedomanTeknis, setpedomanTeknis] = useState([]);
  
    // eslint-disable-next-line no-unused-vars
    const [inovasiUrusan, setinovasiUrusan] = useState([]);
    const handleChange = async ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        });

    }



   

    const handleinovasi = (event) => {
        const {
            target: { value },
        } = event;
        setUrusanInovasi(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const getUrusanInovasi = async () => {

        setLoading(true)
        try {
            let url = "  https://asik.palembang.go.id/api/urusan-inovasis?pagination[pageSize]=100"
            const response = await axios.get(url, {
            });
            if (response.status === 200) {
                setListuUrusan(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    };



    const getWordCount = (str) => {
        return str.split(' ')
          .filter(function(n) { return n !== '' })
          .length;
   }

    // Should ouput `9` for all test inputs.

    const addKajian = async () => {
        if (getWordCount(rancangBangun) <= 300) {
            toast.warn('Rancang bangun kurang dari 300 kata', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else if( tujuanInvoasi.length === 0 ){
            toast.warn('Tujuan Inovasi harus di isi', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else if( manfaat.length === 0 ){
            toast.warn('Manfaat Inovasi harus di isi', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else if(hasil.length === 0){

            toast.warn('Hasil Inovasi harus di isi', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setLoading(true)
            setOpen(true);
            let url = "https://asik.palembang.go.id/api/inovasis"
            let formData = new FormData();
          
         
       
         
       
         
            formData.append('files.Pedoman_teknis_inovasi', pedomanTeknis);
            const data = {
                Nama_opd: localStorage.getItem("nama_opd"),
                Nama_inovasi: state.nama_inovasi,
                Tahapan_inovasi: state.tahapan_inovasi,
                Inisiator_inovasi: state.inisiator_inovasi,
                Jenis_inovasi: state.jenis_inovasi,
                Covid19: state.Covid19,
                Urusan_inovasi: urusanInovasi.toString(),
                Waktu_uji_coba: state.Waktu_uji_coba,
                Bentuk_inovasi: state.Bentuk_inovasi,
                Waktu_implementasi: state.Waktu_implementasi,
                Rancang_bangun_pokok_inovasi: rancangBangun,
                Tujuan_inovasi: tujuanInvoasi,
                Manfaat_inovasi: manfaat,
                Hasil_inovasi: hasil,

            }



            const myJSON = JSON.stringify(data);


            formData.append('data', myJSON)

            try {
                let response = await axios.post(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)

                    toast.success('Inovasi berhasil di tambahkan', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        return navigate("/dashboard");
                    }, 3000);
                }
            } catch (err) {
                setLoading(false)
                setOpen(false);
                toast.warn('Inovasi gagal di tambahkan', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }


    }

    useEffect(() => {
        getUrusanInovasi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="info-home">
                <h1 className="tittle">Dashboard Asik Bappeda Kota Palembang</h1>
            </div>
            <Alert severity="error" className="information"><h3>Harap diperhatikan!</h3> <br />    Inovasi yang diajukan akan di review terlebih dahulu oleh Admin Asik Bappeda Litbang mohon cek kembali apakah inovasi yang diajukan disetujui / ditolak</Alert>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="list-inovasi">
                <Card className="card-inovasi">
                    <CardContent className="content">
                        <div className="heading-card">
                            <Typography gutterBottom>
                                Tambah Inovasi Pemerintah Daerah
                            </Typography>
                        </div>
                        <ValidatorForm

                            onSubmit={addKajian}

                        >
                            <div className="form-inovasi">
                                <div className="form-opd">
                                    <InputLabel className="label" shrink htmlFor="Nama_OPD">
                                        Nama OPD
                                    </InputLabel>
                                    <TextValidator onChange={handleChange}
                                        type="text"
                                        validators={['required']}
                                        errorMessages={['Harap di isi']}
                                        disabled
                                        placeholder="Contoh : Bappeda Litbang" id="Nama_opd" name="Nama_opd" value={localStorage.getItem("nama_opd")}
                                    />
                                </div>
                                <div className="form-opd">
                                    <InputLabel className="label" shrink htmlFor="Nama_Inovasi">
                                        Nama Inovasi
                                    </InputLabel>
                                    <TextValidator onChange={handleChange}
                                        type="text"
                                        validators={['required']}
                                        errorMessages={['Harap di isi']}
                                        placeholder="Contoh : Bappeda Litbang" id="Nama_Inovasi" name="nama_inovasi" value={state.nama_inovasi || ''}
                                    />
                                </div>
                                <div className="form-opd">

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">  COVID 19</InputLabel>
                                        <Select
                                            className="select-asik"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.Covid19 || ''}
                                            defaultValue="Pilih"
                                            name="Covid19"
                                            label="Tahapan Inovasi"
                                            size="medium"
                                            required
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Pilih">Pilih </MenuItem>
                                            <MenuItem value="Covid19">COVID 19</MenuItem>
                                            <MenuItem value="Non_covid19">Non Covid 19</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>


                                <div className="form-opd-grid">

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Tahapan Inovasi</InputLabel>
                                        <Select
                                            className="select-asik"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.tahapan_inovasi || ''}
                                            defaultValue="Pilih Tahapan Inovasi"
                                            name="tahapan_inovasi"
                                            label="Tahapan Inovasi"
                                            size="medium"
                                            required
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Pilih Tahapan Inovasi">Pilih Tahapan Inovasi</MenuItem>
                                            <MenuItem value="Inisiatif">Inisiatif</MenuItem>
                                            <MenuItem value="Uji Coba">Uji Coba</MenuItem>
                                            <MenuItem value="Penerapan">Penerapan</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Inisiator Inovasi Daerah</InputLabel>
                                        <Select
                                            className="select-asik"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.inisiator_inovasi}
                                            label="Pilih Inisiator Inovasi Daerah"
                                            size="medium"
                                            name="inisiator_inovasi"
                                            required
                                            defaultValue="Pilih Inisiator Inovasi Daerah"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Pilih Inisiator Inovasi Daerah">Pilih Inisiator Inovasi Daerah</MenuItem>
                                            <MenuItem value="Kepala Daerah">Kepala Daerah</MenuItem>
                                            <MenuItem value="Anggota DPRD">Anggota DPRD</MenuItem>
                                            <MenuItem value="OPD">OPD</MenuItem>
                                            <MenuItem value="ASN">ASN</MenuItem>
                                            <MenuItem value="Masyarakat"> Masyarakat</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Jenis Inovasi</InputLabel>
                                        <Select
                                            className="select-asik"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.jenis_inovasi}
                                            label="Jenis Inovasi"
                                            size="medium"
                                            name="jenis_inovasi"
                                            defaultValue="Pilih Jenis Inovasi"
                                            required
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Pilih Jenis Inovasi">Pilih Jenis Inovasi</MenuItem>
                                            <MenuItem value="Digital">Digital</MenuItem>
                                            <MenuItem value="Non Digital">Non Digital</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="form-opd">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Bentuk Inovasi</InputLabel>
                                        <Select
                                            className="select-asik"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.Bentuk_inovasi}
                                            label="Bentuk Inovasi"
                                            name="Bentuk_inovasi"
                                            defaultValue="Pilih Bentuk Inovasi"
                                            size="medium"
                                            required
                                            onChange={handleChange}
                                        > <MenuItem value="Pilih Bentuk Inovasi">Pilih Bentuk Inovasi</MenuItem>
                                            <MenuItem value="Inovasi Daerah lainnya sesuai dengan Urusan Pemerintahan yang menjadi Kewenangan Daerah">Inovasi Daerah lainnya sesuai dengan Urusan Pemerintahan yang menjadi Kewenangan Daerah</MenuItem>
                                            <MenuItem value="Inovasi Pelayanan Publik">Inovasi Pelayanan Publik</MenuItem>
                                            <MenuItem value="Inovasi tata kelola Pemerintahan Daerah">Inovasi tata kelola Pemerintahan Daerah</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="form-opd">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-chip-label">Urusan Inovasi Daerah*</InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            className="select-asik"
                                            value={urusanInovasi}
                                            required
                                            size="medium"
                                            onChange={handleinovasi}
                                            input={<OutlinedInput id="select-multiple-chip" label="Urusan Inovasi Daerah*" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {listUrusan.map((name) => (
                                                <MenuItem
                                                    key={name.id}
                                                    value={name.attributes.Urusan_inovasi}
                                                    style={getStyles(name.attributes.Urusan_inovasi, urusanInovasi, theme)}
                                                >
                                                    {name.attributes.Urusan_inovasi}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="form-opd-grid-tanggal">
                                    <div>
                                        <InputLabel className="label" shrink htmlFor="tanggal_pelaksanaan">
                                            Waktu Uji Coba Inovasi Daerah*
                                        </InputLabel>
                                        <CustomInput aria-label="Waktu Uji coba" className="tanggal" type="date" placeholder="Contoh : Bappeda Litbang" id="tanggal_pelaksanaan" name="Waktu_uji_coba"
                                            value={state.Waktu_uji_coba || ''} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <InputLabel className="label" shrink htmlFor="Nama_opd">
                                            Waktu Implementasi Inovasi Daerah*

                                        </InputLabel>
                                        <CustomInput aria-label="Waktu Impelemntasi " className="tanggal" type="date" placeholder="Contoh : Bappeda Litbang" name="Waktu_implementasi"
                                            value={state.Waktu_implementasi || ''} onChange={handleChange} required />
                                    </div>

                                </div>
                                <div className="form-opd">
                                    <InputLabel className="label" shrink htmlFor="Nama_opd">
                                        Rancang bangun dan pokok perubahan yang dilakukan*

                                    </InputLabel>
                                    <Alert className="info-rancangBangun" severity="warning">
                                        <h5>   Catatan Rancang Bangun</h5>
                                        - memuat 300 Kata atau lebih<br />
                                        - latar belakang inovasi baik input, output maupun proses<br />
                                        - bahasa tepat sasaran, efektif dan efisien
                                    </Alert>

                                    <CKEditor
                                        editor={ClassicEditor}

                                        data=""
                                        required
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setRancangBangun(data)
                                           
                                        }}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.

                                        }}
                                    />

                                    <p id="demo">{rancangBangun.length  === undefined ? 'Total Kata : 0 ' :  'Total Kata :' +  getWordCount(rancangBangun) }</p>
                                    {/* 'Total Kata :' +  getWordCount(rancangBangun)  */}
                                </div>

                                <div className="form-opd">
                                    <InputLabel className="label" shrink htmlFor="Nama_opd">
                                        Tujuan inovasi daerah*

                                    </InputLabel>

                                    <CKEditor
                                        editor={ClassicEditor}
                                        data=""
                                        required
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setTujuanInovasi(data)

                                        }}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.

                                        }}
                                    />
                                </div>
                                <div className="form-opd">
                                    <InputLabel className="label" shrink htmlFor="Nama_opd">
                                        Manfaat yang diperoleh*

                                    </InputLabel>

                                    <CKEditor
                                        editor={ClassicEditor}
                                        data=""
                                        required
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setManfaat(data)

                                        }}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.

                                        }}
                                    />
                                </div>
                                <div className="form-opd">
                                    <InputLabel className="label" shrink htmlFor="Nama_opd">
                                        Hasil Inovasi*

                                    </InputLabel>

                                    <CKEditor
                                        editor={ClassicEditor}
                                        data=""
                                        required
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log(data, data.length)
                                            setHasil(data)

                                        }}

                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.

                                        }}
                                    />
                                </div>

                              
                               
                                {loading === true ? <LoadingButton loading variant="outlined">
                                    Submit
                                </LoadingButton> : <div className="submit-form">
                                    <Button className="see-all-button" size="small" type="submit">Tambah Inovasi  </Button>
                                </div>}
                                <Dialog
                                    open={open}

                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        Mohon tunggu
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Inovasi anda dalam proses pengajuan harap jangan tutup jendela ini sampai inovasi sukses di ajukan
                                        </DialogContentText>
                                    </DialogContent>

                                </Dialog>
                            </div>
                        </ValidatorForm>
                    </CardContent>
                </Card>
            </div>

        </>
    );
}


