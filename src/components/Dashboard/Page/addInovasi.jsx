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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import { CircularProgress } from '@mui/material';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from '@mui/material/TextField';
export default function AddInovasi({ token }) {
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
    const theme = useTheme();
    const [urusanInovasi, setUrusanInovasi] = useState([]);
    const [loading, setLoading] = useState(false)
    const [listUrusan, setListuUrusan] = useState([])
    const [state, setState] = useState({});
    const [rancangBangun, setRancangBangun] = useState({});
    const [tujuanInvoasi, setTujuanInovasi] = useState({});
    const [manfaat, setManfaat] = useState({});
    const [hasil, setHasil] = useState({});
    const [visi, setVisi] = useState([]);
    const handleChange = async ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        });
        console.log(state.nama_inovasi)
    }

    const uploadVisiMisi = async (event) => {
        const target = (event.target.files[0]);


        setVisi(target)
        console.log(target)
    };

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
            let url = "  https://asik.palembang.go.id/api/urusan-inovasis"
            const response = await axios.get(url, {
            });
            if (response.status === 200) {
                setListuUrusan(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }
    const uploadKTP = async (event) => {
        const target = (event.target.files[0]);
        const targetSize = event.target.files[0].size


        const url = 'https://asik.palembang.go.id/api/upload';
        let formData = new FormData();

        formData.append('Visi_dan_misi_Pemda', target);

        try {
            let response = await axios.post(url,   formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })

            setLoading(false)
        } catch (err) {
            alert(err);
        }

    };


    const addKajian = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let formData = new FormData();

            formData.append("Nama_opd", 'a');
            let url = "https://asik.palembang.go.id/api/inovasis"
            const response = await axios.post(url, {
                //     const response = await axios({
                //         method:'POST',
                //         headers: {

                //              Authorization: 'Bearer ' + isAuthenticated
                //         },
                //         url:'https://asik.palembang.go.id/api/inovasis',

                //            data:{
                //                  Nama_opd: 'a',
                //            }

                //   })


                data: {
                    Nama_opd: state.Nama_opd,
                    // Nama_inovasi: state.nama_inovasi,
                    // Tahapan_inovasi: state.tahapan_inovasi,
                    // Inisiator_inovasi: state.inisiator_inovasi,
                    // Jenis_inovasi: state.jenis_inovasi,
                    // Covid19: state.Covid19,
                    // Urusan_inovasi: urusanInovasi.toString(),
                    // Waktu_uji_coba: state.Waktu_uji_coba,
                    // Bentuk_inovasi: state.Bentuk_inovasi,
                    // Waktu_implementasi: state.Waktu_implementasi,
                    // Rancang_bangun_pokok_inovasi: rancangBangun,
                    // Tujuan_inovasi: tujuanInvoasi,
                    // Manfaat_inovasi: manfaat,
                    // Hasil_inovasi: hasil,
                    // Visi_dan_misi_Pemda:visi,

                }

            }, {
                headers: {

                    'Content-Type': 'application/json; charset=utf-8' || 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated
                }
            });
            if (response.status === 200) {

                setLoading(false)
                toast.success('🦄 Wow so easy!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.log(error.status)
            toast.error('a', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoading(false)


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

                        <div className="form-inovasi">
                            <div className="form-opd">
                                <InputLabel shrink htmlFor="Nama_OPD">
                                    Nama OPD
                                </InputLabel>
                                <TextField onChange={handleChange}
                                    type="text"
                                    placeholder="Contoh : Bappeda Litbang" id="Nama_opd" name="Nama_opd" value={state.Nama_opd || ''}
                                />
                            </div>
                            <div className="form-opd">
                                <InputLabel shrink htmlFor="Nama_Inovasi">
                                    Nama Inovasi
                                </InputLabel>
                                <TextField onChange={handleChange}
                                    type="text"
                                    placeholder="Contoh : Bappeda Litbang" id="Nama_Inovasi" name="nama_inovasi" value={state.nama_inovasi || ''}
                                />
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
                                        value={state.Jenis_inovasi}
                                        label="Age"
                                        defaultValue="Pilih Bentuk Inovasi"
                                        size="medium"

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
                                    <CustomInput aria-label="Waktu Uji coba" className="tanggal" type="date" placeholder="Contoh : Bappeda Litbang" id="tanggal_pelaksanaan" name="Waktu_uji_coba"
                                        value={state.Waktu_uji_coba || ''} onChange={handleChange} />
                                </div>
                                <div>
                                    <InputLabel shrink htmlFor="Nama_opd">
                                        Waktu Implementasi Inovasi Daerah*

                                    </InputLabel>
                                    <CustomInput aria-label="Waktu Impelemntasi " className="tanggal" type="date" placeholder="Contoh : Bappeda Litbang" name="Waktu_implementasi"
                                        value={state.Waktu_implementasi || ''} onChange={handleChange} />
                                </div>

                            </div>
                            <div className="form-opd">
                                <InputLabel shrink htmlFor="Nama_opd">
                                    Rancang bangun dan pokok perubahan yang dilakukan*

                                </InputLabel>

                                <CKEditor
                                    editor={ClassicEditor}

                                    data=""

                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setRancangBangun(data)

                                    }}
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.

                                    }}
                                />
                            </div>

                            <div className="form-opd">
                                <InputLabel shrink htmlFor="Nama_opd">
                                    Tujuan inovasi daerah*

                                </InputLabel>

                                <CKEditor
                                    editor={ClassicEditor}
                                    data=""

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
                                    data=""

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
                                    data=""

                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setHasil(data)

                                    }}
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.

                                    }}
                                />
                            </div>
                            <div className="form-opd">
                                <input type="file" onChange={uploadKTP} />
                            </div>
                            {loading === true ? <LoadingButton loading variant="outlined">
                                Submit
                            </LoadingButton> : <Button className="see-all-button" size="small" onClick={addKajian}>Tambah Inovasi  </Button>}

                        </div>
                    </CardContent>
                </Card>
            </div>

        </>
    );
}


