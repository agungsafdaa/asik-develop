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
import { useLocation , useNavigate } from 'react-router-dom'
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
    const [tingkat_lembaga, setTingkat_Lembaga] = useState([]);
    const [apbd_tepatwaktu, setApbd_tepatwaktu] = useState([]);
    const [kualitasPerizinan, setKualitasPerizinan] = useState([]);
    const [jumlahPeningkatanKapita, setJumlahPeningkatanKapita] = useState([]);
    const [tingkatPengangguran, setTingkatPengangguran] = useState([]);
    const [jumlah_peningkatan_investasi, setJumlah_peningkatan_investasi] = useState([]);
    const [jumlah_peningkatan_PAD, setJumlah_peningkatan_PAD] = useState([]);
    const [opini, setOpini] = useState([]);
    const [capaianLAKIP, setCapaianLAKIP] = useState([]);
    const [penurunanAngkaMiskin, setPenurunanAngkaMiskin] = useState([]);
    const [nilaiIPM, setNilaiIPM] = useState([]);
    const [penghargaanInovator, setPenghargaanInovator] = useState([]);
    const [regulasiInovasi, setRegulasiInovasi] = useState([]);
    const [ketersediaanSDM, setKetersediaanSDM] = useState([]);
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
    const [show, setShow] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [inovasiUrusan, setinovasiUrusan] = useState([]);

    const handleChange = async ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        });
        console.log(state.nama_inovasi)
    }

    const pathnameUpload = location.state.idInovasi.attributes;
    const urlAsik = "https://asik.palembang.go.id" ;
   

    const uploadVisiMisi = async (event) => {
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
            setVisi(target)
        }
    };

    const DeleteVisi = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };

    const uploadtingkatLembaga = async (event) => {
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
            setTingkat_Lembaga(target)
        }
    };

     const DeletetingkatLembaga  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };


     const uploadAPBD = async (event) => {
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
            setApbd_tepatwaktu(target)
        }
    };

    const DeleteAPBD  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };   
    
    const uploadkualitasPerizinan = async (event) => {
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
            setKualitasPerizinan(target)
        }
    };

    const DeletekualitasPerizinan  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };   

    const uploadjumlahPeningkatanKapita = async (event) => {
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
            setJumlahPeningkatanKapita(target)
        }
    };

    const DeletejumlahPeningkatanKapita  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    }; 

    const uploadtingkatPengangguran = async (event) => {
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
            setTingkatPengangguran(target)
        }
    };

    const DeletetingkatPengangguran  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };

    const uploadjumlah_peningkatan_investasi = async (event) => {
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
            setJumlah_peningkatan_investasi(target)
        }
    };

    const Deletejumlah_peningkatan_investasi  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };

    const uploadjumlah_peningkatan_PAD = async (event) => {
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
            setJumlah_peningkatan_PAD(target)
        }
    };

    const Deletejumlah_peningkatan_PAD  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };

    const uploadopini = async (event) => {
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
            setOpini(target)
        }
    };

    const Deleteopini  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };

    const uploadcapaianLAKIP = async (event) => {
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
            setCapaianLAKIP(target)
        }
    };
    
    const DeletecapaianLAKIP  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };

    const uploadpenurunanAngkaMiskin = async (event) => {
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
            setPenurunanAngkaMiskin(target)
        }
    };

    const DeletepenurunanAngkaMiskin  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };

    const uploadnilaiIPM = async (event) => {
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
            setNilaiIPM(target)
        }
    };

    const DeletenilaiIPM  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };

    const uploadpenghargaanInovator = async (event) => {
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
            setPenghargaanInovator(target)
        }
    };

    const DeletepenghargaanInovator  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };

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

    const DeleteregulasiInovasi  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
        }
    };

    const uploadketersediaanSDM = async (event) => {
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
            setKetersediaanSDM(target)
        }
    };

    const DeleteketersediaanSDM  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletejumlahKajian  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

     const DeleteroadmapSIDA  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletedukunganAnggaran  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletepenggunaanIT  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletebimtekInovasi  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeleteprogramInovasi  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeleteketerlibatanAktor  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletepelaksanaInovasi  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletejejaringInovasi  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletesosialisasiInovasi  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletepedomanTeknis  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletekemudahanLayanan  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletekemudahanProses  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletepenyelesaianLayanan  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeleteonlineSistem  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const Deleterepikasi  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletekecepatanInovasi  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletekemanfaatanInovasi  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const Deletemonitoring  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

    const DeletekualitasInovasi  = async (event) => {
        console.log("onclick", event.target.value)
        setShow(true)
        let url = "https://asik.palembang.go.id/api/upload/files/" +  event.target.value
        try {
            let response = await axios.delete(url, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
            setLoading(false)
            console.log(response)
            toast.success('Mohon upload ulang file anda !', {
                position: "top-right",
                
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            alert(err);
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

 
  
    const addKajian = async (event) => {


        let url = "https://asik.palembang.go.id/api/inovasis/" + location.state.idInovasi.id

        let formData = new FormData();
        formData.append('files.Visi_dan_misi_Pemda', visi);
        formData.append('files.Tingkat_lembaga_kelitbangan', tingkat_lembaga);
        formData.append('files.Apbd_tepat_waktu', apbd_tepatwaktu);
        formData.append('files.Kualitas_peningkatan_perizinan', kualitasPerizinan);
        formData.append('files.Jumlah_peningkatan_perkapita', jumlahPeningkatanKapita);
        formData.append('files.Tingkat_pengangguran_terbuka', tingkatPengangguran);
        formData.append('files.Jumlah_peningkatan_investasi', jumlah_peningkatan_investasi);
        formData.append('files.Jumlah_peningkatan_PAD', jumlah_peningkatan_PAD);
        formData.append('files.Opini_BPK', opini);
        formData.append('files.Nilai_Capaian_LAKIP', capaianLAKIP);
        formData.append('files.Penurunan_angka_kemiskinan', penurunanAngkaMiskin);
        formData.append('files.Nilai_IPM', nilaiIPM);
        formData.append('files.Penghargaan_bagi_inovator', penghargaanInovator);
        formData.append('files.Regulasi_Inovasi_daerah', regulasiInovasi);
        formData.append('files.Ketersediaan_SDM_inovasi_daerah', ketersediaanSDM);
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
            Nama_opd:localStorage.getItem("nama_opd"),
            Nama_inovasi: state.nama_inovasi ? state.nama_inovasi : location.state.idInovasi.attributes.Nama_inovasi ,
            Tahapan_inovasi: state.tahapan_inovasi ? state.tahapan_inovasi : location.state.idInovasi.attributes.Tahapan_inovasi,
            Inisiator_inovasi: state.inisiator_inovasi ? state.inisiator_inovasi : location.state.idInovasi.attributes.Inisiator_inovasi,
            Jenis_inovasi: state.jenis_inovasi ? state.jenis_inovasi  : location.state.idInovasi.attributes.Jenis_inovasi,
            Covid19: state.Covid19 ? state.Covid19 : location.state.idInovasi.attributes.Covid19,
            Urusan_inovasi: urusanInovasi.toString() ? urusanInovasi.toString() : state.Urusan_inovasi,
            Waktu_uji_coba: state.Waktu_uji_coba ? state.Waktu_uji_coba : location.state.idInovasi.attributes.Waktu_uji_coba,
            Bentuk_inovasi: state.Bentuk_inovasi ? state.Bentuk_inovasi : location.state.idInovasi.attributes.Bentuk_inovasi,
            Waktu_implementasi: state.Waktu_implementasi ? state.Waktu_implementasi : location.state.idInovasi.attributes.Waktu_implementasi,
            Rancang_bangun_pokok_inovasi: rancangBangun.length !== undefined ? rancangBangun : location.state.idInovasi.attributes.Rancang_bangun_pokok_inovasi,
            Tujuan_inovasi: tujuanInvoasi.length !== undefined  ? tujuanInvoasi : state.Tujuan_inovasi,
            Manfaat_inovasi: manfaat.length !== undefined ? manfaat : location.state.idInovasi.attributes.Manfaat_inovasi,
            Hasil_inovasi: hasil.length !== undefined  ? hasil : location.state.idInovasi.attributes.Hasil_inovasi,


        }

     

        const myJSON = JSON.stringify(data);


        formData.append('data', myJSON)

        try {
            let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
            // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
           if(response.status === 200){

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
            },3000);
           
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


    console.log(hasil.length, hasil)
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
                        {loading === true ? <CircularProgress/> :   <ValidatorForm
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
                                            value={state.Covid19 ? state.Covid19 : location.state.idInovasi.attributes.Covid19 ? location.state.idInovasi.attributes.Covid19 :  ''}
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
                                            value={state.tahapan_inovasi ? state.tahapan_inovasi : location.state.idInovasi.attributes.Tahapan_inovasi ? location.state.idInovasi.attributes.Tahapan_inovasi  : ''}
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
                                        <InputLabel shrink htmlFor="tanggal_pelaksanaan">
                                            Waktu Uji Coba Inovasi Daerah*
                                        </InputLabel>
                                        <CustomInput aria-label="Waktu Uji coba" defaultValue={location.state.idInovasi.attributes.Waktu_uji_coba}  className="tanggal" type="date" placeholder="Contoh : Bappeda Litbang" id="tanggal_pelaksanaan" name="Waktu_uji_coba"
                                            value={state.Waktu_uji_coba } onChange={handleChange} required/>
                                    </div>
                                    <div>
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Waktu Implementasi Inovasi Daerah*

                                        </InputLabel>
                                        <CustomInput aria-label="Waktu Impelemntasi" defaultValue={location.state.idInovasi.attributes.Waktu_implementasi} className="tanggal" type="date" placeholder="Contoh : Bappeda Litbang" name="Waktu_implementasi"
                                            value={state.Waktu_implementasi} onChange={handleChange} required/>
                                    </div>

                                </div>
                                <div className="form-opd">
                                    <InputLabel shrink htmlFor="Nama_opd">
                                        Rancang bangun dan pokok perubahan yang dilakukan*

                                    </InputLabel>

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
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Visi & Misi

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Visi_dan_misi_Pemda.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeleteVisi}     value={pathnameUpload.Visi_dan_misi_Pemda.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"} onChange={uploadVisiMisi} accept="image/*,.pdf" />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Tingkat lembaga kelitbangan
                                        </InputLabel>
                                        <a href={pathnameUpload.Tingkat_lembaga_kelitbangan.data.attributes.url ?  urlAsik + pathnameUpload.Tingkat_lembaga_kelitbangan.data.attributes.url : ""} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletetingkatLembaga}     value={pathnameUpload.Visi_dan_misi_Pemda.data.id ? location.state.idInovasi.attributes.Visi_dan_misi_Pemda.data.id : ""}>Edit File</Button>
                                        <input type="file"   id="file" className={show === true ? "file" : "display-none"}   onChange={uploadtingkatLembaga} accept="image/*,.pdf"/>
                                    </div>
                                </div>

                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Apbd tepat waktu

                                        </InputLabel>
                                        <a href={"https://asik.palembang.go.id" +location.state.idInovasi.attributes.Apbd_tepat_waktu.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeleteAPBD}     value={location.state.idInovasi.attributes.Apbd_tepat_waktu.data.id}>Edit File</Button>
                                        <input type="file"  id="file" className={show === true ? "file" : "display-none"}  onChange={uploadAPBD} accept="image/*,.pdf"/>
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Kualitas peningkatan perizinan

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Kualitas_peningkatan_perizinan.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletekualitasPerizinan}     value={pathnameUpload.Kualitas_peningkatan_perizinan.data.id}>Edit File</Button>
                                        <input type="file"  id="file"  className={show === true ? "file" : "display-none"}  onChange={uploadkualitasPerizinan} accept="image/*,.pdf"/>
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Jumlah peningkatan perkapita
                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Jumlah_peningkatan_perkapita.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletejumlahPeningkatanKapita}     value={pathnameUpload.Jumlah_peningkatan_perkapita.data.id}>Edit File</Button>
                                        <input type="file"  id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadjumlahPeningkatanKapita} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Tingkat pengangguran terbuka
                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Tingkat_pengangguran_terbuka.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletetingkatPengangguran}     value={pathnameUpload.Tingkat_pengangguran_terbuka.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadtingkatPengangguran} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Jumlah peningkatan investasi
                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Jumlah_peningkatan_investasi.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={Deletejumlah_peningkatan_investasi}     value={pathnameUpload.Jumlah_peningkatan_investasi.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf"  onChange={uploadjumlah_peningkatan_investasi} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Jumlah peningkatan PAD

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Jumlah_peningkatan_PAD.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={Deletejumlah_peningkatan_PAD}     value={pathnameUpload.Jumlah_peningkatan_PAD.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf"  onChange={uploadjumlah_peningkatan_PAD} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Opini BPK
                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Opini_BPK.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={Deleteopini}     value={pathnameUpload.Opini_BPK.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadopini} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Nilai Capaian LAKIP

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Nilai_Capaian_LAKIP.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletecapaianLAKIP}     value={pathnameUpload.Nilai_Capaian_LAKIP.data.id}>Edit File</Button>
                                        <input type="file"  id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadcapaianLAKIP} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Penurunan angka kemiskinan

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Penurunan_angka_kemiskinan.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletepenurunanAngkaMiskin}     value={pathnameUpload.Penurunan_angka_kemiskinan.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadpenurunanAngkaMiskin} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Nilai IPM

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Nilai_IPM.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletenilaiIPM}     value={pathnameUpload.Nilai_IPM.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadnilaiIPM} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Penghargaan bagi inovator

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Penghargaan_bagi_inovator.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletepenghargaanInovator}     value={pathnameUpload.Penghargaan_bagi_inovator.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadpenghargaanInovator} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Regulasi Inovasi daerah

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Regulasi_Inovasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeleteregulasiInovasi}     value={pathnameUpload.Regulasi_Inovasi_daerah.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadregulasiInovasi} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Ketersediaan SDM inovasi daerah
                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Ketersediaan_SDM_inovasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeleteketersediaanSDM}     value={pathnameUpload.Ketersediaan_SDM_inovasi_daerah.data.id}>Edit File</Button>
                                        <input type="file"  id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadketersediaanSDM} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Jumlah kajian yang mendukung inovasi

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Jumlah_kajian_yang_mendukung_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletejumlahKajian}     value={pathnameUpload.Jumlah_kajian_yang_mendukung_inovasi.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadjumlahKajian} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Roadmap SIDA


                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Roadmap_SIDa.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeleteroadmapSIDA}     value={pathnameUpload.Roadmap_SIDa.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadroadmapSIDA} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Dukungan anggaran

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Dukungan_anggaran.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletedukunganAnggaran}     value={pathnameUpload.Dukungan_anggaran.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploaddukunganAnggaran} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Penggunaan IT

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Penggunaan_IT.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletepenggunaanIT}     value={pathnameUpload.Penggunaan_IT.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadpenggunaanIT} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Bimtek inovasi

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Penggunaan_IT.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletebimtekInovasi}     value={pathnameUpload.Penggunaan_IT.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadbimtekInovasi} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Program Inovasi perangkat RKPD

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Program_Inovasi_perangkat_RKPD.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeleteprogramInovasi}     value={pathnameUpload.Program_Inovasi_perangkat_RKPD.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadprogramInovasi} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Keterlibatan aktor inovasi

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Keterlibatan_aktor_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeleteketerlibatanAktor}     value={pathnameUpload.Keterlibatan_aktor_inovasi.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadketerlibatanAktor} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Pelaksana inovasi daerah

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Pelaksana_inovasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletepelaksanaInovasi}     value={pathnameUpload.Pelaksana_inovasi_daerah.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadpelaksanaInovasi} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Jejaring inovasi

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Jejaring_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletejejaringInovasi}     value={pathnameUpload.Jejaring_inovasi.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadjejaringInovasi} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Sosialisasi inovasi daerah

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Sosialisasi_inovasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletesosialisasiInovasi}     value={pathnameUpload.Sosialisasi_inovasi_daerah.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadsosialisasiInovasi} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Pedoman teknis inovasi
                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Pedoman_teknis_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletepedomanTeknis}     value={pathnameUpload.Pedoman_teknis_inovasi.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadpedomanTeknis} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Kemudahan informasi layanan

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Kemudahan_informasi_layanan.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletekemudahanLayanan}     value={pathnameUpload.Kemudahan_informasi_layanan.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadkemudahanLayanan} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Kemudahan proses inovasi yang dihasilkan

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Kemudahan_proses_inovasi_yang_dihasilkan.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletekemudahanProses}     value={pathnameUpload.Kemudahan_proses_inovasi_yang_dihasilkan.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadkemudahanProses} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Penyelesaian layanan pengaduan

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Penyelesaian_layanan_pengaduan.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletepenyelesaianLayanan}     value={pathnameUpload.Penyelesaian_layanan_pengaduan.data.id}>Edit File</Button>
                                        <input type="file"  id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadpenyelesaianLayanan} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Online sistem

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Online_sistem.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeleteonlineSistem}     value={pathnameUpload.Online_sistem.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadonlineSistem} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Repikasi

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Repikasi.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={Deleterepikasi}     value={pathnameUpload.Repikasi.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadrepikasi} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Kecepatan inovasi

                                        </InputLabel>
                                        <a href={pathnameUpload.Kecepatan_inovasi.data !== null ? urlAsik + pathnameUpload.Kecepatan_inovasi.data.attributes.url : "" } target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletekecepatanInovasi}     value={pathnameUpload.Kecepatan_inovasi.data !== null ? pathnameUpload.Kecepatan_inovasi.data.id : ''}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadkecepatanInovasi} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Kemanfaatan inovasi

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Kemanfaatan_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletekemanfaatanInovasi}     value={pathnameUpload.Kemanfaatan_inovasi.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadkemanfaatanInovasi} />
                                    </div>
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Monitoring dan evaluasi daerah

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Monitoring_dan_evaluasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={Deletemonitoring}     value={pathnameUpload.Monitoring_dan_evaluasi_daerah.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadmonitoring} />
                                    </div>

                                </div>
                                <div className="form-opd-grid">
                                    <div className="upload">
                                        <InputLabel shrink htmlFor="Nama_opd">
                                            Kualitas inovasi daerah

                                        </InputLabel>
                                        <a href={urlAsik + pathnameUpload.Kualitas_inovasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>
                                        <Button  onClick={DeletekualitasInovasi}     value={pathnameUpload.Kualitas_inovasi_daerah.data.id}>Edit File</Button>
                                        <input type="file" id="file" className={show === true ? "file" : "display-none"}  accept="image/*,.pdf" onChange={uploadkualitasInovasi} />
                                    </div>
                                    

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


