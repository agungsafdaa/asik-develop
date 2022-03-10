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
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
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

    const [regulasiInovasi, setRegulasiInovasi] = useState([]);

    const [jumlahKajian, setJumlahKajian] = useState([]);
    const [roadmapSIDA, setRoadmapSIDA] = useState([]);
    const [dukunganAnggaran, setDukunganAnggaran] = useState([]);
    const [penggunaanIT, setPenggunaanIT] = useState([]);
    const [bimtekInovasi, setBimtekInovasi] = useState([]);
    const [programInovasi, setProgramInovasi] = useState([]);
    const [keterlibatanAktor, setKeterlibatanAktor] = useState([]);
    const [pelaksanaInovasi, setPelaksanaInovasi] = useState([]);
    const [jejaringInovasi, setJejaringInovasi] = useState([]);
    const [sosialisasiInovasi, setSosialisasiInovasi] = useState([]);
    const [pedomanTeknis, setpedomanTeknis] = useState([]);
    const [kemudahanLayanan, setKemudahanLayanan] = useState([]);
    const [kemudahanProses, setKemudahanProses] = useState([]);
    const [penyelesaianLayanan, setPenyelesaianLayanan] = useState([]);
    const [onlineSistem, setOnlineSistem] = useState([]);
    const [repikasi, setRepikasi] = useState([]);
    const [kecepatanInovasi, setKecepatanInovasi] = useState([]);
    const [kemanfaatanInovasi, setKemanfaatanInovasi] = useState([]);
    const [monitoring, setMonitoring] = useState([]);
    const [kualitasInovasi, setKualitasInovasi] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [inovasiUrusan, setinovasiUrusan] = useState([]);
    const handleChange = async ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        });
        console.log(state.nama_inovasi)
    }












    const uploadregulasiInovasi = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setRegulasiInovasi(target)
        }
    };




    const uploadjumlahKajian = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setJumlahKajian(target)
        }
    };

    const uploadroadmapSIDA = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setRoadmapSIDA(target)
        }
    };

    const uploaddukunganAnggaran = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setDukunganAnggaran(target)
        }
    };

    const uploadpenggunaanIT = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setPenggunaanIT(target)
        }
    };


    const uploadbimtekInovasi = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setBimtekInovasi(target)
        }
    };

    const uploadprogramInovasi = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setProgramInovasi(target)
        }
    };

    const uploadketerlibatanAktor = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setKeterlibatanAktor(target)
        }
    };

    const uploadpelaksanaInovasi = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setPelaksanaInovasi(target)
        }
    };

    const uploadjejaringInovasi = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setJejaringInovasi(target)
        }
    };

    const uploadsosialisasiInovasi = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setSosialisasiInovasi(target)
        }
    };

    const uploadpedomanTeknis = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setpedomanTeknis(target)
        }
    };

    const uploadkemudahanLayanan = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setKemudahanLayanan(target)
        }
    };

    const uploadkemudahanProses = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setKemudahanProses(target)
        }
    };

    const uploadpenyelesaianLayanan = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setPenyelesaianLayanan(target)
        }
    };

    const uploadonlineSistem = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setOnlineSistem(target)
        }
    };

    const uploadrepikasi = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setRepikasi(target)
        }
    };

    const uploadkecepatanInovasi = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setKecepatanInovasi(target)
        }
    };

    const uploadkemanfaatanInovasi = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setKemanfaatanInovasi(target)
        }
    };

    const uploadmonitoring = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setMonitoring(target)
        }
    };

    const uploadkualitasInovasi = async (event) => {
        const fileInput =
            document.querySelector('.file');
        const target = (event.target.files[0]);
        const cekExtensions = (event.target.value);
        // Allowing file type
        const allowedExtensions =
            /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
        if (!allowedExtensions.exec(cekExtensions)) {
            toast.warn('Hanya JPEG dan PDF yang bisa di upload', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fileInput.value = '';
            return false;
        } else {
            setKualitasInovasi(target)
        }
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
    };



    const getTextLength = (html) => {
        // This will never get added to the DOM.
        const element = document.createElement("div")
        element.innerHTML = html
        return element.textContent.length
    }
    const outputs = [rancangBangun]

    // Should ouput `9` for all test inputs.
 

    const addKajian = async (event) => {
        if(outputs.map(getTextLength)[0] <= 300){
            toast.warn('Rancang bangun kurang dari 300 kata', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            setLoading(true)
            setOpen(true);
            let url = "https://asik.palembang.go.id/api/inovasis"
    
            let formData = new FormData();
            formData.append('files.Regulasi_Inovasi_daerah', regulasiInovasi);
            formData.append('files.Jumlah_kajian_yang_mendukung_inovasi', jumlahKajian);
            formData.append('files.Roadmap_SIDa', roadmapSIDA);
            formData.append('files.Dukungan_anggaran', dukunganAnggaran);
            formData.append('files.Penggunaan_IT', penggunaanIT);
            formData.append('files.Bimtek_inovasi', bimtekInovasi);
            formData.append('files.Program_Inovasi_perangkat_RKPD', programInovasi);
            formData.append('files.Keterlibatan_aktor_inovasi', keterlibatanAktor);
            formData.append('files.Pelaksana_inovasi_daerah', pelaksanaInovasi);
            formData.append('files.Jejaring_inovasi', jejaringInovasi);
            formData.append('files.Sosialisasi_inovasi_daerah', sosialisasiInovasi);
            formData.append('files.Pedoman_teknis_inovasi', pedomanTeknis);
            formData.append('files.Kemudahan_informasi_layanan', kemudahanLayanan);
            formData.append('files.Kemudahan_proses_inovasi_yang_dihasilkan', kemudahanProses);
            formData.append('files.Penyelesaian_layanan_pengaduan', penyelesaianLayanan);
            formData.append('files.Online_sistem', onlineSistem);
            formData.append('files.Repikasi', repikasi);
            formData.append('files.Kecepatan_inovasi', kecepatanInovasi);
            formData.append('files.Kemanfaatan_inovasi', kemanfaatanInovasi);
            formData.append('files.Monitoring_dan_evaluasi_daerah', monitoring);
            formData.append('files.Kualitas_inovasi_daerah', kualitasInovasi);
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
                desc_Regulasi_Inovasi_daerah: state.indikator_regulasi,
                desc_Jumlah_kajian_yang_mendukung_inovasi: state.jumlah_kajian,
                desc_Roadmap_SIDa: state.roadmap_Sida,
                desc_Dukungan_anggaran: state.indikator_dukungan_anggaran,
                desc_Penggunaan_IT: state.indikator_penggunaan_it,
                desc_Bimtek_inovasi: state.indikator_bimtek_inovasi,
                desc_Program_Inovasi_perangkat_RKPD: state.indikator_RKPD,
                desc_Keterlibatan_aktor_inovasi: state.indikator_aktor_inovasi,
                desc_Pelaksana_inovasi_daerah: state.indikator_pelaksana_inovasi,
                desc_Jejaring_inovasi: state.indikator_jejaring_inovasi,
                desc_Sosialisasi_inovasi_daerah: state.indikator_sosialisasi_inovasi,
                desc_Pedoman_teknis_inovasi: state.indikator_pedoman_inovasi,
                desc_Kemudahan_informasi_layanan: state.indikator_kemudahan_inovasi,
                desc_Kemudahan_proses_inovasi_yang_dihasilkan: state.indikator_kemudahanProses,
                desc_Penyelesaian_layanan_pengaduan: state.indikator_penyelesaianLayanan,
                desc_Online_sistem: state.indikator_onlineSistem,
                desc_Repikasi: state.indikator_repikasi,
                desc_Kecepatan_inovasi: state.indikator_kecepatanInovasi,
                desc_Kemanfaatan_inovasi: state.indikator_kemanfaatanInovasi,
                desc_Monitoring_dan_evaluasi_daerah: state.indikator_monitoringEvaluasi,
                desc_Kualitas_inovasi_daerah: state.indikator_kualitasInovasi,
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
                                        - memuat 300 kata atau lebih<br />
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
                                            console.log(data)
                                        }}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.

                                        }}
                                    />

                                    <p id="demo">{outputs.map(getTextLength)[0] === 15 ?   'Jumlah kata '  + 0 : 'Jumlah kata ' + outputs.map(getTextLength)[0]}</p>
                                  
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

                                <h3 style={{ margin: "20px 0 20px 0" }}>Indikator Inovasi Daerah</h3>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Indikator</TableCell>
                                                <TableCell style={{ width: "15%" }}>Keterangan</TableCell>

                                                <TableCell style={{ width: "25%" }}>Parameter</TableCell>
                                                <TableCell>Data Pendukung</TableCell>
                                                <TableCell >Jenis File</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* visi misi */}
                                            <TableRow

                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Regulasi Inovasi daerah
                                                </TableCell>
                                                <TableCell >Regulasi yang menetapkan nama-nama inovasi daerah yang menjadi landasan operasional penerapan Inovasi Daerah</TableCell>

                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_regulasi"

                                                            defaultValue="SK Kepala Perangkat Daerah"
                                                            value={state.indikator_regulasi || ''}
                                                            label="Age"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="SK Kepala Perangkat Daerah">SK Kepala Perangkat Daerah</MenuItem>
                                                            <MenuItem value="SK Kepala Daerah">SK Kepala Daerah</MenuItem>
                                                            <MenuItem value="Peraturan Kepala Daerah/Peraturan Daerah">Peraturan Kepala Daerah/Peraturan Daerah</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadregulasiInovasi} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/* visi misi */}
                                            {/*      Jumlah kajian yang mendukung inovasi */}
                                            <TableRow

                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Jumlah kajian yang mendukung inovasi
                                                </TableCell>
                                                <TableCell >Jumlah kajian yang mendukung terlaksananya inovasi</TableCell>
                                                <TableCell>

                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadjumlahKajian} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*     Jumlah kajian yang mendukung inovasi */}
                                            {/*     Roadmap SIDA */}
                                            <TableRow

                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Roadmap SIDA
                                                </TableCell>
                                                <TableCell >Roadmap SIDA </TableCell>
                                                <TableCell></TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadroadmapSIDA} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*    Roadmap SIDA*/}
                                            {/*      Dukungan anggaran */}
                                            <TableRow

                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Dukungan anggaran
                                                </TableCell>
                                                <TableCell >  Anggaran inovasi daerah dalam APBD dengan tahapan inisiasi (penyampaian ide, rapat, proposal, penulisan kajian), uji coba (pilot project, perekayasaan, laboratorium lapangan, dan sejenisnya), dan penerapan (penyediaan sarana prasarana, sumber daya manusia dan layanan, bimtek, urusan jenis layanan) </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_dukungan_anggaran"

                                                            defaultValue="Anggaran tersedia pada kegiatan inisiasi inovasi daerah"
                                                            value={state.indikator_dukungan_anggaran || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Anggaran tersedia pada kegiatan inisiasi inovasi daerah">Anggaran tersedia pada kegiatan inisiasi inovasi daerah </MenuItem>
                                                            <MenuItem value="Anggaran tersedia pada kegiatan uji coba inovasi daerah">Anggaran tersedia pada kegiatan uji coba inovasi daerah</MenuItem>
                                                            <MenuItem value="Anggaran tersedia pada kegiatan penerapan inovasi daerah">Anggaran tersedia pada kegiatan penerapan inovasi daerah</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploaddukunganAnggaran} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*     Dukungan anggaran */}
                                            {/*    Penggunaan IT */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Penggunaan IT
                                                </TableCell>
                                                <TableCell >  Penggunaan IT dalam pelaksanaan Inovasi yang diterapkan </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_penggunaan_it"

                                                            defaultValue="Pelaksanaan kerja secara manual/non elektronik"
                                                            value={state.indikator_penggunaan_it || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Pelaksanaan kerja secara manual/non elektronik">Pelaksanaan kerja secara manual/non elektronik</MenuItem>
                                                            <MenuItem value="Pelaksanaan kerja secara elektronik ">Pelaksanaan kerja secara elektronik </MenuItem>
                                                            <MenuItem value="Pelaksanaan kerja sudah didukung system informasi online/ daring">Pelaksanaan kerja sudah didukung system informasi online/ daring</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadpenggunaanIT} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*  Penggunaan IT */}
                                            {/*     Bimtek inovasi*/}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Bimtek inovasi
                                                </TableCell>
                                                <TableCell >  Peningkatan kapasitas dan kompetensi pelaksana inovasi daerah </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_bimtek_inovasi"

                                                            defaultValue="Dalam 2 tahun terakhir pernah 1 kali bimtek"
                                                            value={state.indikator_bimtek_inovasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Dalam 2 tahun terakhir pernah 1 kali bimtek">Dalam 2 tahun terakhir pernah 1 kali bimtek </MenuItem>
                                                            <MenuItem value="Dalam 2 tahun terakhir pernah 2 kali bimtek">Dalam 2 tahun terakhir pernah 2 kali bimtek</MenuItem>
                                                            <MenuItem value="Dalam 2 tahun terakhir pernah 3 kali atau lebih ">Dalam 2 tahun terakhir pernah 3 kali atau lebih </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadbimtekInovasi} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*    Bimtek inovasi */}
                                            {/*    Program Inovasi perangkat RKPD*/}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Program Inovasi perangkat RKPD
                                                </TableCell>
                                                <TableCell > Inovasi Perangkat Daerah telah dituangkan dalam program pembangunan daerah </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_RKPD"

                                                            defaultValue="Pemerintah daerah sudah menuangkan program inovasi daerah dalam RPJMD "
                                                            value={state.indikator_RKPD || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Pemerintah daerah sudah menuangkan program inovasi daerah dalam RPJMD ">Pemerintah daerah sudah menuangkan program  <br/> inovasi daerah dalam RPJMD  </MenuItem>
                                                            <MenuItem value="Pemerintah daerah sudah menuangkan program inovasi daerah dalam RKPD dan telah diterapkan dalam 1 tahun terakhir">Pemerintah daerah sudah menuangkan program  <br/> inovasi daerahdalam RKPD dan telah diterapkan dalam 1 tahun terakhir</MenuItem>
                                                            <MenuItem value="Pemerintah daerah sudah menuangkan program inovasi daerah dalam RKPD dan telah diterapkan dalam 2 tahun terakhir">Pemerintah daerah sudah menuangkan program <br/> inovasi daerah  dalam RKPD dan telah diterapkan dalam 2 tahun terakhir </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadprogramInovasi} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*    Program Inovasi perangkat RKPD  */}
                                            {/*         Keterlibatan aktor inovasi */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Keterlibatan aktor inovasi
                                                </TableCell>
                                                <TableCell >Keikutsertaan unsur Stakeholder dalam pelaksanaan inovasi daerah (T-1 dan T-2)</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_aktor_inovasi"

                                                            defaultValue="Inovasi melibatkan 4 aktor"
                                                            value={state.indikator_aktor_inovasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Inovasi melibatkan 4 aktor">Inovasi melibatkan 4 aktor</MenuItem>
                                                            <MenuItem value="Inovasi melibatkan 5 aktor">Inovasi melibatkan 5 aktor</MenuItem>
                                                            <MenuItem value="Inovasi melibatkan lebih dari 5 aktor">Inovasi melibatkan lebih dari 5 aktor</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadketerlibatanAktor} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*      Keterlibatan aktor inovasi  */}
                                            {/*      Pelaksana inovasi daerah  */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Pelaksana inovasi daerah
                                                </TableCell>
                                                <TableCell >Penetapan tim pelaksana inovasi daerah</TableCell>
                                                <TableCell>

                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_pelaksana_inovasi"

                                                            defaultValue="Ada pelaksana namun tidak ditetapkan dengan SK Kepala Perangkat Daerah"
                                                            value={state.indikator_pelaksana_inovasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Ada pelaksana namun tidak ditetapkan dengan SK Kepala Perangkat Daerah">Ada pelaksana namun tidak ditetapkan dengan  <br/>SK Kepala Perangkat Daerah</MenuItem>
                                                            <MenuItem value="Ada pelaksana dan ditetapkan dengan SK Kepala Perangkat Daerah">Ada pelaksana dan ditetapkan dengan  <br/> SK Kepala Perangkat Daerah</MenuItem>
                                                            <MenuItem value="Ada pelaksana dan ditetapkan dengan SK Kepala Daerah">Ada pelaksana dan ditetapkan dengan   <br/> SK Kepala Daerah</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadpelaksanaInovasi} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*          Pelaksana inovasi daerah   */}
                                            {/*         Jejaring inovasi  */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Jejaring inovasi
                                                </TableCell>
                                                <TableCell >Jumlah Perangkat Daerah yang terlibat dalam penerapan inovasi (dalam 2 tahun terakhir)</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_jejaring_inovasi"

                                                            defaultValue="Inovasi melibatkan 1-2 Perangkat Daerah"
                                                            value={state.indikator_jejaring_inovasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Inovasi melibatkan 1-2 Perangkat Daerah">Inovasi melibatkan 1-2 Perangkat Daerah</MenuItem>
                                                            <MenuItem value="Inovasi melibatkan 3-4 Perangkat Daerah">Inovasi melibatkan 3-4 Perangkat Daerah</MenuItem>
                                                            <MenuItem value="inovasi melibatkan 5 Perangkat Daerah atau lebih">inovasi melibatkan 5 Perangkat Daerah atau lebih</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadjejaringInovasi} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*            Jejaring inovasi  */}
                                            {/*         Sosialisasi inovasi daerah  */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Sosialisasi inovasi daerah
                                                </TableCell>
                                                <TableCell >Penyebarluasan informasi kebijakan inovasi daerah (2 Tahun Terakhir)</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_sosialisasi_inovasi"

                                                            defaultValue="Foto kegiatan berspanduk"
                                                            value={state.indikator_sosialisasi_inovasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Foto kegiatan berspanduk">Foto kegiatan berspanduk</MenuItem>
                                                            <MenuItem value="URL Media Sosial">URL Media Sosial</MenuItem>
                                                            <MenuItem value="Media Berita">Media Berita</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadsosialisasiInovasi} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*       Sosialisasi inovasi daerah  */}
                                            {/*   Pedoman teknis inovasi */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Pedoman teknis inovasi
                                                </TableCell>
                                                <TableCell >Ketentuan dasar penggunaan inovasi daerah berupa buku petunjuk/manual book</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_pedoman_inovasi"

                                                            defaultValue="Telah terdapat Pedoman teknis berupa buku manual"
                                                            value={state.indikator_pedoman_inovasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Telah terdapat Pedoman teknis berupa buku manual">Telah terdapat Pedoman teknis berupa buku <br/> manual</MenuItem>
                                                            <MenuItem value="Telah terdapat Pedoman teknis berupa buku dalam bentuk elektronik">Telah terdapat Pedoman teknis berupa buku <br/> dalam bentuk elektronik</MenuItem>
                                                            <MenuItem value="Telah terdapat Pedoman teknis berupa buku yang dapat diakses secara online">Telah terdapat Pedoman teknis berupa buku <br/>  yang dapat diakses secara online</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadpedomanTeknis} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*   Pedoman teknis inovasi */}
                                            {/*    Kemudahan informasi layanan */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Kemudahan informasi layanan
                                                </TableCell>
                                                <TableCell >Kemudahan mendapatkan informasi layanan</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_kemudahan_inovasi"

                                                            defaultValue="Layanan Telp atau tatap muka langsung/noken"
                                                            value={state.indikator_kemudahan_inovasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Layanan Telp atau tatap muka langsung/noken">Layanan Telp atau tatap muka langsung/noken</MenuItem>
                                                            <MenuItem value="Layanan Email/Media Sosial">Layanan Email/Media Sosial</MenuItem>
                                                            <MenuItem value="Layanan melalui aplikasi online">Layanan melalui aplikasi online</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadkemudahanLayanan} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*    Kemudahan informasi layanan */}
                                            {/*      Kemudahan proses inovasi yang dihasilkan */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Kemudahan proses inovasi yang dihasilkan
                                                </TableCell>
                                                <TableCell >Waktu yang diperlukan untuk memperoleh proses penggunaan hasil inovasi</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_kemudahanProses"

                                                            defaultValue="Hasil inovasi diperoleh dalam waktu 6 hari keatas"
                                                            value={state.indikator_kemudahanProses || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Hasil inovasi diperoleh dalam waktu 6 hari keatas">Hasil inovasi diperoleh dalam <br/> waktu 6 hari keatas</MenuItem>
                                                            <MenuItem value="Hasil inovasi diperoleh dalam waktu 2-5 hari ">Hasil inovasi diperoleh dalam <br/> waktu 2-5 hari </MenuItem>
                                                            <MenuItem value="Hasil inovasi diperoleh dalam waktu 1 hari">Hasil inovasi diperoleh dalam <br/> waktu 1 hari</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadkemudahanProses} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*       Kemudahan proses inovasi yang dihasilkan */}
                                            {/*     Penyelesaian layanan pengaduan */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Penyelesaian layanan pengaduan
                                                </TableCell>
                                                <TableCell >Rasio penyelesaian pengaduan dalam tahun terakhir (jumlah pengaduan yang di tindakalnajuti/ jumlah pengaduan keseluruhan x100%)</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_penyelesaianLayanan"

                                                            defaultValue="dibawah 31%"
                                                            value={state.indikator_penyelesaianLayanan || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="dibawah 31%">dibawah 31%</MenuItem>
                                                            <MenuItem value="31% s/d 60%">31% s/d 60% </MenuItem>
                                                            <MenuItem value="diatas 60%">diatas 60%</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadpenyelesaianLayanan} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/* Penyelesaian layanan pengaduan*/}
                                            {/*     Online sistem */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Online sistem
                                                </TableCell>
                                                <TableCell >
                                                    Jaringan prosedur yang dibuat secara daring ( 2 Tahun Terakhir)

                                                </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_onlineSistem"

                                                            defaultValue="dibawah 31%"
                                                            value={state.indikator_onlineSistem || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="dibawah 31%">dibawah 31%</MenuItem>
                                                            <MenuItem value="31% s/d 60%">31% s/d 60% </MenuItem>
                                                            <MenuItem value="diatas 60%">diatas 60%</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadonlineSistem} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*    Online sistem */}
                                            {/*   Repikasi*/}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Repikasi
                                                </TableCell>
                                                <TableCell >
                                                    Inovasi Daerah telah direplikasi oleh daerah lain (T-2 sampai dengan T-1)

                                                </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_repikasi"

                                                            defaultValue="Pernah 1 Kali direplikasi di daerah lain"
                                                            value={state.indikator_repikasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Pernah 1 Kali direplikasi di daerah lain">Pernah 1 Kali direplikasi di daerah lain</MenuItem>
                                                            <MenuItem value="Pernah 2 Kali direplikasi di daerah lain">Pernah 2 Kali direplikasi di daerah lain</MenuItem>
                                                            <MenuItem value="Pernah 3 Kali direplikasi di daerah lain">Pernah 3 Kali direplikasi di daerah lain</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadrepikasi} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*  Repikasi */}
                                            {/*       Kecepatan inovasi*/}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Kecepatan inovasi
                                                </TableCell>
                                                <TableCell >
                                                    Satuan waktu yang digunakan untuk menciptakan inovasi daerah

                                                </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_kecepatanInovasi"
                                                            defaultValue="Inovasi dapat diciptakan dalam waktu 9 bulan keatas"
                                                            value={state.indikator_kecepatanInovasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Inovasi dapat diciptakan dalam waktu 9 bulan keatas">Inovasi dapat diciptakan dalam waktu 9 bulan keatas</MenuItem>
                                                            <MenuItem value="Inovasi dapat diciptakan dalam waktu 5-8 bulan">Inovasi dapat diciptakan dalam waktu 5-8 bulan</MenuItem>
                                                            <MenuItem value="Inovasi dapat diciptakan dalam waktu 1-4 bulan">Inovasi dapat diciptakan dalam waktu 1-4 bulan</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadkecepatanInovasi} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*      Kecepatan inovasi  */}
                                            {/*      Kemanfaatan inovasi */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Kemanfaatan inovasi
                                                </TableCell>
                                                <TableCell >
                                                    Jumlah pengguna atau penerima manfaat inovasi daerah (2 tahun terakhir)
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_kemanfaatanInovasi"

                                                            defaultValue="Jumlah pengguna atau penerima manfaat 1-100 orang"
                                                            value={state.indikator_kemanfaatanInovasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Jumlah pengguna atau penerima manfaat 1-100 orang">Jumlah pengguna atau penerima <br/> manfaat 1-100 orang</MenuItem>
                                                            <MenuItem value="Jumlah pengguna atau penerima manfaat 101-200 orang">Jumlah pengguna atau penerima   <br/>  manfaat 101-200 orang</MenuItem>
                                                            <MenuItem value="Jumlah pengguna atau penerima manfaat 201 orang keatas">Jumlah pengguna atau penerima   <br/> manfaat 201 orang keatas</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadkemanfaatanInovasi} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/* Kemanfaatan inovasi */}
                                            {/*      Monitoring dan evaluasi daerah  */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Monitoring dan evaluasi daerah
                                                </TableCell>
                                                <TableCell >
                                                    Kepuasan pelaksanaan penggunaan inovasi daerah (2 Tahun Terakhir)
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_monitoringEvaluasi"

                                                            defaultValue="Hasil laporan monev internal Perangkat Daerah"
                                                            value={state.indikator_monitoringEvaluasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Hasil laporan monev internal Perangkat Daerah">Hasil laporan monev internal Perangkat Daerah</MenuItem>
                                                            <MenuItem value="Hasil pengukuran kepuasaan pengguna dari evaluasi Survei Kepuasan Masyarakat">Hasil pengukuran kepuasaan pengguna dari <br/>  evaluasi Survei Kepuasan Masyarakat</MenuItem>
                                                            <MenuItem value="Hasil laporan monev eksternal berdasarkan hasil penelitian">Hasil laporan monev eksternal berdasarkan hasil penelitian</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadmonitoring} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*    Monitoring dan evaluasi daerah */}
                                            {/*       Kualitas inovasi daerah  */}
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Kualitas inovasi daerah
                                                </TableCell>
                                                <TableCell >
                                                    Kualitas inovasi daerah
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Pilih Parameter</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_kualitasInovasi"

                                                            defaultValue="Memenuhi 1 atau 2 unsur substansi"
                                                            value={state.indikator_kualitasInovasi || ''}
                                                            label="Pilih Indikator"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value="Memenuhi 1 atau 2 unsur substansi">Hasil laporan monev internal Perangkat Daerah</MenuItem>
                                                            <MenuItem value="Memenuhi 3 atau 4 unsur substansi">Memenuhi 3 atau 4 unsur substansi</MenuItem>
                                                            <MenuItem value="Memenuhi 5 unsur substansi">Memenuhi 5 unsur substansi</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell>
                                                    <input type="file"  id="file" className="file" accept="image/*,.pdf" onChange={uploadkualitasInovasi} />
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*      Kualitas inovasi daerah */}

                                        </TableBody>
                                    </Table>
                                </TableContainer>

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


