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
import { useLocation, useNavigate } from 'react-router-dom'
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
import { CircularProgress } from '@mui/material';

export default function EditInovasi() {
    let navigate = useNavigate();
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
    const location = useLocation();
    
 
  
    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const blue = {
        100: '#DAECFF',
        200: '#80BFFF',
        400: '#3399FF',
        600: '#0072E5',
    };




    const StyledInputElement = styled('input')(
        ({ theme }) => `
        width: 1040px;
        font-size: 0.875rem;
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 400;
        line-height: 1.5;
    
        border-radius: 8px;
        padding: 12px 12px;
      
        &:hover {
       
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
    const [urusanInovasi, setUrusanInovasi] = useState([]);
    const [loading, setLoading] = useState(false)
    const [listUrusan, setListuUrusan] = useState([])
    const [state, setState] = useState({});
    const [rancangBangun, setRancangBangun] = useState({});
    const [tujuanInvoasi, setTujuanInovasi] = useState({});
    const [manfaat, setManfaat] = useState({});
    const [hasil, setHasil] = useState({});
    

   

    // eslint-disable-next-line no-unused-vars
    const [inovasiUrusan, setinovasiUrusan] = useState([]);

    const handleChange = async ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        });
        console.log(state.nama_inovasi)
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


    const getTextLength = (html) => {
        // This will never get added to the DOM.
        const element = document.createElement("div")
        element.innerHTML = html
        return element.textContent.length
    }
    const outputs = [rancangBangun.length !== undefined ? rancangBangun : location.state.idInovasi.attributes.Rancang_bangun_pokok_inovasi]


    const getWordCount = (str) => {
        return str.split(' ')
          .filter(function(n) { return n !== '' })
          .length;
   }

    const addKajian = async (event) => {
        if (getWordCount(outputs) <= 300) {
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

        let url = "https://asik.palembang.go.id/api/inovasis/" + location.state.idInovasi.id

        let formData = new FormData();
    

        const data = {
            Nama_opd: localStorage.getItem("nama_opd"),
            Nama_inovasi: state.nama_inovasi ? state.nama_inovasi : location.state.idInovasi.attributes.Nama_inovasi,
            Tahapan_inovasi: state.tahapan_inovasi ? state.tahapan_inovasi : location.state.idInovasi.attributes.Tahapan_inovasi,
            Inisiator_inovasi: state.inisiator_inovasi ? state.inisiator_inovasi : location.state.idInovasi.attributes.Inisiator_inovasi,
            Jenis_inovasi: state.jenis_inovasi ? state.jenis_inovasi : location.state.idInovasi.attributes.Jenis_inovasi,
            Covid19: state.Covid19 ? state.Covid19 : location.state.idInovasi.attributes.Covid19,
            Urusan_inovasi: urusanInovasi.toString() ? urusanInovasi.toString() : location.state.idInovasi.attributes.Urusan_inovasi,
            Waktu_uji_coba: state.Waktu_uji_coba ? state.Waktu_uji_coba : location.state.idInovasi.attributes.Waktu_uji_coba,
            Bentuk_inovasi: state.Bentuk_inovasi ? state.Bentuk_inovasi : location.state.idInovasi.attributes.Bentuk_inovasi,
            Waktu_implementasi: state.Waktu_implementasi ? state.Waktu_implementasi : location.state.idInovasi.attributes.Waktu_implementasi,
            Rancang_bangun_pokok_inovasi: rancangBangun.length !== undefined ? rancangBangun : location.state.idInovasi.attributes.Rancang_bangun_pokok_inovasi,
            Tujuan_inovasi: tujuanInvoasi.length !== undefined ? tujuanInvoasi : location.state.Tujuan_inovasi,
            Manfaat_inovasi: manfaat.length !== undefined ? manfaat : location.state.idInovasi.attributes.Manfaat_inovasi,
            Hasil_inovasi: hasil.length !== undefined ? hasil : location.state.idInovasi.attributes.Hasil_inovasi,
         
            Kualitas_inovasi_daerah: state.link_youtube ? state.link_youtube.slice(32, 46) : location.state.idInovasi.attributes.Kualitas_inovasi_daerah,
        }



        const myJSON = JSON.stringify(data);


        formData.append('data', myJSON)

        try {
            let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            if (response.status === 200) {

                setLoading(false)

                toast.success('Inovasi anda berhasil di edit!', {
                    position: "top-right",
                    autoClose: 5000,
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
            toast.success(alert.err, {
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
                                Edit Inovasi Pemerintah Daerah
                            </Typography>
                        </div>
                        {loading === true ? <CircularProgress /> : <ValidatorForm
                            onSubmit={addKajian}
                        >
                            <div className="form-inovasi">

                                <div className="form-opd">
                                    <InputLabel shrink htmlFor="Nama_OPD">
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
                                    <InputLabel shrink htmlFor="Nama_Inovasi">
                                        Nama Inovasi
                                    </InputLabel>
                                    <TextValidator onChange={handleChange}
                                        type="text"
                                        validators={['required']}
                                        errorMessages={['Harap di isi']}
                                        placeholder="Contoh : Bappeda Litbang" id="Nama_Inovasi" name="nama_inovasi" value={state.nama_inovasi ? state.nama_inovasi : location.state.idInovasi.attributes.Nama_inovasi ? location.state.idInovasi.attributes.Nama_inovasi : ''}
                                    />
                                </div>
                                <div className="form-opd">

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">  COVID 19</InputLabel>
                                        <Select
                                            className="select-asik"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.Covid19 ? state.Covid19 : location.state.idInovasi.attributes.Covid19 ? location.state.idInovasi.attributes.Covid19 : ''}
                                            defaultValue={location.state.idInovasi.attributes.Covid19}
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
                                            value={state.tahapan_inovasi ? state.tahapan_inovasi : location.state.idInovasi.attributes.Tahapan_inovasi ? location.state.idInovasi.attributes.Tahapan_inovasi : ''}
                                            defaultValue={location.state.idInovasi.attributes.Tahapan_inovasi}
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
                                            value={state.inisiator_inovasi ? state.inisiator_inovasi : location.state.idInovasi.attributes.Inisiator_inovasi ? location.state.idInovasi.attributes.Inisiator_inovasi : ""}
                                            label="Pilih Inisiator Inovasi Daerah"
                                            size="medium"
                                            name="inisiator_inovasi"
                                            required
                                            defaultValue={location.state.idInovasi.attributes.Inisiator_inovasi}
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
                                            value={state.jenis_inovasi ? state.jenis_inovasi : location.state.idInovasi.attributes.Jenis_inovasi ? location.state.idInovasi.attributes.Jenis_inovasi : ""}
                                            label="Jenis Inovasi"
                                            size="medium"
                                            name="jenis_inovasi"
                                            defaultValue={location.state.idInovasi.attributes.Jenis_inovasi}
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
                                            value={state.Bentuk_inovasi ? state.Bentuk_inovasi : location.state.idInovasi.attributes.Bentuk_inovasi ? location.state.idInovasi.Bentuk_inovasi : ""}
                                            label="Bentuk Inovasi"
                                            name="Bentuk_inovasi"
                                            defaultValue={location.state.idInovasi.attributes.Bentuk_inovasi}
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
                                        <InputLabel shrink htmlFor="tanggal_pelaksanaan">
                                            Waktu Uji Coba Inovasi Daerah*
                                        </InputLabel>
                                        <CustomInput aria-label="Waktu Uji coba" defaultValue={location.state.idInovasi.attributes.Waktu_uji_coba} className="tanggal" type="date" placeholder="Contoh : Bappeda Litbang" id="tanggal_pelaksanaan" name="Waktu_uji_coba"
                                            value={state.Waktu_uji_coba} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Waktu Implementasi Inovasi Daerah*

                                        </InputLabel>
                                        <CustomInput aria-label="Waktu Impelemntasi" defaultValue={location.state.idInovasi.attributes.Waktu_implementasi} className="tanggal" type="date" placeholder="Contoh : Bappeda Litbang" name="Waktu_implementasi"
                                            value={state.Waktu_implementasi} onChange={handleChange} required />
                                    </div>

                                </div>
                                <div className="form-opd">
                                    <InputLabel shrink htmlFor="Nama_opd">
                                        Rancang bangun dan pokok perubahan yang dilakukan*

                                    </InputLabel>
                                    <Alert className="info-rancangBangun" severity="warning">
                                        <h5>   Catatan Rancang Bangun</h5>
                                        - memuat 300 Huruf atau lebih<br />
                                        - latar belakang inovasi baik input, output maupun proses<br />
                                        - bahasa tepat sasaran, efektif dan efisien
                                    </Alert>
                                    <CKEditor
                                        editor={ClassicEditor}

                                        data={location.state.idInovasi.attributes.Rancang_bangun_pokok_inovasi ? location.state.idInovasi.attributes.Rancang_bangun_pokok_inovasi : ''}

                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setRancangBangun(data)

                                        }}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.

                                        }}
                                    />

<p id="demo">{rancangBangun.length  === undefined ? 'Total Kata :' + getWordCount(location.state.idInovasi.attributes.Rancang_bangun_pokok_inovasi) :  'Total Kata :' +  getWordCount(rancangBangun) }</p>
                                    {/* <p id="demo">{getWordCount(outputs) === 15 ? 'Jumlah Huruf ' + 0 : 'Jumlah Huruf ' +  getWordCount(rancangBangun)}</p> */}

                                </div>

                                <div className="form-opd">
                                    <InputLabel shrink htmlFor="Nama_opd">
                                        Tujuan inovasi daerah*

                                    </InputLabel>

                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={location.state.idInovasi.attributes.Tujuan_inovasi ? location.state.idInovasi.attributes.Tujuan_inovasi : ''}

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
                                    <InputLabel shrink htmlFor="Nama_opd">
                                        Manfaat yang diperoleh*

                                    </InputLabel>

                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={location.state.idInovasi.attributes.Manfaat_inovasi ? location.state.idInovasi.attributes.Manfaat_inovasi : ''}

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
                                    <InputLabel shrink htmlFor="Nama_opd">
                                        Hasil Inovasi*

                                    </InputLabel>

                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={location.state.idInovasi.attributes.Hasil_inovasi ? location.state.idInovasi.attributes.Hasil_inovasi : ''}

                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setHasil(data)

                                        }}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.

                                        }}
                                    />
                                </div>

                          
                                {loading === true ? <LoadingButton loading variant="outlined">
                                    Submit
                                </LoadingButton> : <Button className="see-all-button" size="small" type="submit">Tambah Inovasi  </Button>}

                            </div>
                        </ValidatorForm>}
                    </CardContent>
                </Card>
            </div>

        </>
    );
}


