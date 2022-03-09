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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
    console.log(location)

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
    const [show, setShow] = useState({
        regulasi: false,
        jumlah_kajian: false,
        roadmap_sida: false,
        dukungan_anggaran: false,
        bimtek_inovasi: false,
        perangkat_rkpd: false,
        keterlibatan_aktor: false,
        pelaksana: false,
        penggunaan_it: false,
        jejaring: false,
        sosialisasi: false,
        pedoman_teknis: false,
        kemudahan_informasi: false,
        kemudahan_proses: false,
        penyelesaian_layanan: false,
        online_sistem: false,
        repikasi: false,
        kecepatan_inovasi: false,
        kemanfaatan_inovasi: false,
        monitoring_evaluasi: false,
        kualitas_inovasi: false,
    });

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
    const urlAsik = "https://asik.palembang.go.id";




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

    const DeleteregulasiInovasi = async (event) => {

        setShow({
            ...show,
            [event.target.name]: true,
        });
       

        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletejumlahKajian = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeleteroadmapSIDA = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletedukunganAnggaran = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletepenggunaanIT = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletebimtekInovasi = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeleteprogramInovasi = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeleteketerlibatanAktor = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletepelaksanaInovasi = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletejejaringInovasi = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletesosialisasiInovasi = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletepedomanTeknis = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletekemudahanLayanan = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletekemudahanProses = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletepenyelesaianLayanan = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeleteonlineSistem = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const Deleterepikasi = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletekecepatanInovasi = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletekemanfaatanInovasi = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const Deletemonitoring = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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

    const DeletekualitasInovasi = async (event) => {
        setShow({
            ...show,
            [event.target.name]: true,
        });
        let url = "https://asik.palembang.go.id/api/upload/files/" + event.target.value
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
        setLoading(true)

        let url = "https://asik.palembang.go.id/api/inovasis/" + location.state.idInovasi.id

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
            Nama_inovasi: state.nama_inovasi ? state.nama_inovasi : location.state.idInovasi.attributes.Nama_inovasi,
            Tahapan_inovasi: state.tahapan_inovasi ? state.tahapan_inovasi : location.state.idInovasi.attributes.Tahapan_inovasi,
            Inisiator_inovasi: state.inisiator_inovasi ? state.inisiator_inovasi : location.state.idInovasi.attributes.Inisiator_inovasi,
            Jenis_inovasi: state.jenis_inovasi ? state.jenis_inovasi : location.state.idInovasi.attributes.Jenis_inovasi,
            Covid19: state.Covid19 ? state.Covid19 : location.state.idInovasi.attributes.Covid19,
            Urusan_inovasi: urusanInovasi.toString() ? urusanInovasi.toString() : state.Urusan_inovasi,
            Waktu_uji_coba: state.Waktu_uji_coba ? state.Waktu_uji_coba : location.state.idInovasi.attributes.Waktu_uji_coba,
            Bentuk_inovasi: state.Bentuk_inovasi ? state.Bentuk_inovasi : location.state.idInovasi.attributes.Bentuk_inovasi,
            Waktu_implementasi: state.Waktu_implementasi ? state.Waktu_implementasi : location.state.idInovasi.attributes.Waktu_implementasi,
            Rancang_bangun_pokok_inovasi: rancangBangun.length !== undefined ? rancangBangun : location.state.idInovasi.attributes.Rancang_bangun_pokok_inovasi,
            Tujuan_inovasi: tujuanInvoasi.length !== undefined ? tujuanInvoasi : state.Tujuan_inovasi,
            Manfaat_inovasi: manfaat.length !== undefined ? manfaat : location.state.idInovasi.attributes.Manfaat_inovasi,
            Hasil_inovasi: hasil.length !== undefined ? hasil : location.state.idInovasi.attributes.Hasil_inovasi,


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

                                <h3 style={{ margin: "20px 0 20px 0" }}>Indikator Inovasi Daerah</h3>

                                <TableContainer>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Indikator</TableCell>
                                                <TableCell>Keterangan</TableCell>

                                                <TableCell>Parameter</TableCell>
                                                <TableCell style={{ width: '15%' }}>File yang di upload</TableCell>
                                                <TableCell style={{ width: '15%' }}>Action</TableCell>
                                                <TableCell >Jenis File</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Regulasi */}
                                            <TableRow

                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Regulasi Inovasi daerah
                                                </TableCell>
                                                <TableCell >Regulasi yang menetapkan nama-nama inovasi daerah yang menjadi landasan operasional penerapan Inovasi Daerah</TableCell>

                                                <TableCell></TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Regulasi_Inovasi_daerah.data !== null ? <a className="button-asik" href={urlAsik + pathnameUpload.Regulasi_Inovasi_daerah.data.attributes.url} target="_blank" type="button" rel="noreferrer">
                                                        Lihat File
                                                    </a> : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5> }
                                                    
                                                </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Regulasi_Inovasi_daerah.data !== null ? <> <Button onClick={DeleteregulasiInovasi} name="regulasi" className={show.regulasi === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.Regulasi_Inovasi_daerah.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.regulasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadregulasiInovasi} /></> : 
                                                    <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadregulasiInovasi} /> }
                                                   
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*Regulasi */}
                                            {/*      Jumlah kajian yang mendukung inovasi */}
                                            <TableRow

                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    Jumlah kajian yang mendukung inovasi
                                                </TableCell>
                                                <TableCell >Jumlah kajian yang mendukung terlaksananya inovasi</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>
                                                {pathnameUpload.Jumlah_kajian_yang_mendukung_inovasi.data !== null ?   <a className="button-asik" href={urlAsik + pathnameUpload.Jumlah_kajian_yang_mendukung_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                                        Lihat File
                                                    </a> :<h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5> }
                                                  
                                                </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Jumlah_kajian_yang_mendukung_inovasi.data !== null ? 
                                                    <>
                                                    <Button onClick={DeletejumlahKajian} name="regulasi" className={show.jumlah_kajian === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.Jumlah_kajian_yang_mendukung_inovasi.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.jumlah_kajian === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadjumlahKajian} />
                                                    </> :  <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadjumlahKajian} />}
                                                  
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
                                                    {pathnameUpload.Roadmap_SIDa.data !== null ?       <a className="button-asik" href={urlAsik + pathnameUpload.Roadmap_SIDa.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a> : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5> }
                                                </TableCell>

                                                <TableCell>
                                                    {pathnameUpload.Roadmap_SIDa.data ? <>
                                                        <Button name="roadmap_sida" className={show.roadmap_sida === false ? "button-asik-edit" : "display-none"} onClick={DeleteroadmapSIDA} value={pathnameUpload.Roadmap_SIDa.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.roadmap_sida === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadroadmapSIDA} />
                                                    </> :    <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadroadmapSIDA} />}
                                                 
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
                                                <TableCell> </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Dukungan_anggaran.data !== null ?   <a className="button-asik" href={urlAsik + pathnameUpload.Dukungan_anggaran.data.attributes.url} target="_blank" rel="noreferrer">
                                                        Lihat File
                                                    </a> : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                                  
                                                </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Dukungan_anggaran.data !== null ?  
                                                    <>
                                                     <Button name="dukungan_anggaran" className={show.dukungan_anggaran === false ? "button-asik-edit" : ""} onClick={DeletedukunganAnggaran} value={pathnameUpload.Dukungan_anggaran.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.dukungan_anggaran === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploaddukunganAnggaran} />
                                                    </>
                                                     :   <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploaddukunganAnggaran} /> }
                                                  
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
                                                <TableCell> </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Penggunaan_IT.data !== null ?   <a className="button-asik" href={urlAsik + pathnameUpload.Penggunaan_IT.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a> : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                                    </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Penggunaan_IT.data !== null ?  <>
                                                        <Button name="penggunaan_it" className={show.penggunaan_it === false ? "button-asik-edit" : "display-none"} onClick={DeletepenggunaanIT} value={pathnameUpload.Penggunaan_IT.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.penggunaan_it === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadpenggunaanIT} /> 
                                                    </>
                                                    :  <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadpenggunaanIT} />  }
                                                   
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
                                                <TableCell> </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Penggunaan_IT.data !== null ?  <a className="button-asik" href={urlAsik + pathnameUpload.Penggunaan_IT.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a>  : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                                   </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Penggunaan_IT.data !== null ? <> 
                                                        <Button name="bimtek_inovasi" className={show.bimtek_inovasi === false ? "button-asik-edit" : "display-none"} onClick={DeletebimtekInovasi} value={pathnameUpload.Penggunaan_IT.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.bimtek_inovasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadbimtekInovasi} />
                                                    </> :  <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadbimtekInovasi} />}
                                                   
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
                                                <TableCell> </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Program_Inovasi_perangkat_RKPD.data !== null ?   <a className="button-asik" href={urlAsik + pathnameUpload.Program_Inovasi_perangkat_RKPD.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a> : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                                   </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Program_Inovasi_perangkat_RKPD.data !== null ?
                                                    <>
                                                      <Button name="perangkat_rkpd" className={show.perangkat_rkpd === false ? "button-asik-edit" : "display-none"} onClick={DeleteprogramInovasi} value={pathnameUpload.Program_Inovasi_perangkat_RKPD.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.perangkat_rkpd === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadprogramInovasi} />
                                                    </>
                                                    :     <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadprogramInovasi} />}
                                                  
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
                                                <TableCell> </TableCell>
                                                <TableCell>
                                                {pathnameUpload.Keterlibatan_aktor_inovasi.data !== null ?  <a className="button-asik" href={urlAsik + pathnameUpload.Keterlibatan_aktor_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a> : <h6>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h6>}    
                                                   
                                                </TableCell>
                                                <TableCell>
                                                {pathnameUpload.Keterlibatan_aktor_inovasi.data !== null ? 
                                                <>
                                                 <Button name="keterlibatan_aktor" onClick={DeleteketerlibatanAktor} className={show.keterlibatan_aktor === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.Keterlibatan_aktor_inovasi.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.keterlibatan_aktor === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadketerlibatanAktor} />
                                                </>
                                                : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadketerlibatanAktor} />}    
                                                   
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
                                                <TableCell> </TableCell>
                                                <TableCell> 
                                                {pathnameUpload.Pelaksana_inovasi_daerah.data !== null ?  <a className="button-asik" href={urlAsik + pathnameUpload.Pelaksana_inovasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a> :
                                                <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>
                                                }
                                               
                                                </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Pelaksana_inovasi_daerah.data !== null ? <>
                                                        <Button name="pelaksana" className={show.pelaksana === false ? "button-asik-edit" : "display-none"} onClick={DeletepelaksanaInovasi} value={pathnameUpload.Pelaksana_inovasi_daerah.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.pelaksana === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadpelaksanaInovasi} />
                                                    </> : 
                                                     <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadpelaksanaInovasi} />
                                                    }
                                                    
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
                                                <TableCell> </TableCell>
                                                <TableCell>   
                                                {pathnameUpload.Jejaring_inovasi.data !== null ?    <a className="button-asik" href={urlAsik + pathnameUpload.Jejaring_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a>  : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5> }
                                             
                                                </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Jejaring_inovasi.data !== null ? <>
                                                        <Button name="jejaring" className={show.jejaring === false ? "button-asik-edit" : "display-none"} onClick={DeletejejaringInovasi} value={pathnameUpload.Jejaring_inovasi.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.jejaring === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadjejaringInovasi} />
                                                    </> :     <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadjejaringInovasi} />}
                                                    
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
                                                <TableCell> </TableCell>
                                                <TableCell> 
                                                { pathnameUpload.Sosialisasi_inovasi_daerah.data !== null ?  <a className="button-asik" href={urlAsik + pathnameUpload.Sosialisasi_inovasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a> : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                                 
                                                </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Sosialisasi_inovasi_daerah.data !== null ? <>
                                                        <Button name="sosialisasi" className={show.sosialisasi === false ? "button-asik-edit" : "display-none"} onClick={DeletesosialisasiInovasi} value={pathnameUpload.Sosialisasi_inovasi_daerah.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.sosialisasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadsosialisasiInovasi} />
                                                    </> :  <input type="file" id="file" className="file"  accept="image/*,.pdf" onChange={uploadsosialisasiInovasi} /> }
                                                 
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
                                                <TableCell> </TableCell>
                                                <TableCell> 
                                                { pathnameUpload.Pedoman_teknis_inovasi.data !== null ?  <a className="button-asik" href={urlAsik + pathnameUpload.Pedoman_teknis_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a>  : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                               
                                                </TableCell>
                                                <TableCell>
                                                    { pathnameUpload.Pedoman_teknis_inovasi.data !== null ?
                                                    <>
                                                          <Button name="pedoman_teknis" id="file" className={show.pedoman_teknis === false ? "button-asik-edit" : "display-none"} onClick={DeletepedomanTeknis} value={pathnameUpload.Pedoman_teknis_inovasi.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.pedoman_teknis === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadpedomanTeknis} />
                                                    </> :
                                                          <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadpedomanTeknis} />
                                                    }
                                                  
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
                                                <TableCell> </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Kemudahan_informasi_layanan.data !== null ?   <a className="button-asik" href={urlAsik + pathnameUpload.Kemudahan_informasi_layanan.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                    </a>  : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                                  
                                                </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Kemudahan_informasi_layanan.data !== null ? <>
                                                        <Button name="kemudahan_informasi" className={show.kemudahan_informasi === false ? "button-asik-edit" : "display-none"} onClick={DeletekemudahanLayanan} value={pathnameUpload.Kemudahan_informasi_layanan.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.kemudahan_informasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadkemudahanLayanan} />
                                                    </> :  <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadkemudahanLayanan} />}
                                                    
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
                                                <TableCell> </TableCell>
                                                <TableCell> 
                                                    {pathnameUpload.Kemudahan_proses_inovasi_yang_dihasilkan.data !== null ?  <a className="button-asik" href={urlAsik + pathnameUpload.Kemudahan_proses_inovasi_yang_dihasilkan.data.attributes.url} target="_blank" rel="noreferrer">
                                                        Lihat File
                                                    </a>  : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                                   
                                                </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Kemudahan_proses_inovasi_yang_dihasilkan.data !== null  ? <>
                                                        <Button name="kemudahan_proses" className={show.kemudahan_proses === false ? "button-asik-edit" : "display-none"} onClick={DeletekemudahanProses} value={pathnameUpload.Kemudahan_proses_inovasi_yang_dihasilkan.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.kemudahan_proses === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadkemudahanProses} />
                                                    </> 
                                                    :   <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadkemudahanProses} /> }
                                                    
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
                                                <TableCell> </TableCell>
                                                <TableCell>  
                                                    {pathnameUpload.Penyelesaian_layanan_pengaduan.data !== null ?  <a className="button-asik" href={urlAsik + pathnameUpload.Penyelesaian_layanan_pengaduan.data.attributes.url} target="_blank" rel="noreferrer">
                                                       Lihat File
                                                    </a>   : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                                   
                                                </TableCell>
                                                <TableCell>
                                                    { 
                                                     pathnameUpload.Penyelesaian_layanan_pengaduan.data !== null  ?
                                                    <>
                                                    <Button name="penyelesaian_layanan" className={show.penyelesaian_layanan === false ? "button-asik-edit" : "display-none"} onClick={DeletepenyelesaianLayanan} value={pathnameUpload.Penyelesaian_layanan_pengaduan.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.penyelesaian_layanan === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadpenyelesaianLayanan} />
                                                    </> 
                                                     :     <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadpenyelesaianLayanan} />}
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
                                                <TableCell> </TableCell>
                                                <TableCell> 
                                                    {pathnameUpload.Online_sistem.data !== null ?  <a className="button-asik" href={urlAsik + pathnameUpload.Online_sistem.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a> : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                                
                                                </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Online_sistem.data !== null ?  <>
                                                        <Button name="online_sistem" className={show.online_sistem === false ? "button-asik-edit" : "display-none"} onClick={DeleteonlineSistem} value={pathnameUpload.Online_sistem.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.online_sistem === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadonlineSistem} />
                                                    </> :    <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadonlineSistem} />}
                                                    
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
                                                <TableCell> </TableCell>
                                                <TableCell>   
                                                    {pathnameUpload.Repikasi.data !== null ?   <a className="button-asik" href={urlAsik + pathnameUpload.Repikasi.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a> : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                              
                                                </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Repikasi.data !== null ?  <>
                                                        <Button name="repikasi" onClick={Deleterepikasi} className={show.repikasi === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.Repikasi.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.repikasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadrepikasi} />
                                                    </> :  <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadrepikasi} /> }
                                                   
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
                                                <TableCell> </TableCell>
                                                <TableCell>  
                                                    {pathnameUpload.Kecepatan_inovasi.data !== null ?  <a className="button-asik" href={pathnameUpload.Kecepatan_inovasi.data !== null ? urlAsik + pathnameUpload.Kecepatan_inovasi.data.attributes.url : ""} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a> : <h6>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h6>}
                                                   </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Kecepatan_inovasi.data !== null ? <> 
                                                        <Button name="kecepatan_inovasi" className={show.kecepatan_inovasi === false ? "button-asik-edit" : "display-none"} onClick={DeletekecepatanInovasi} value={pathnameUpload.Kecepatan_inovasi.data !== null ? pathnameUpload.Kecepatan_inovasi.data.id : ''}>Edit File</Button>
                                                    <input type="file" id="file" className={show.kecepatan_inovasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadkecepatanInovasi} /> 
                                                    </>:    <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadkecepatanInovasi} />}
                                                    
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
                                                <TableCell> </TableCell>
                                                <TableCell> 
                                                    {pathnameUpload.Kemanfaatan_inovasi.data !== null ?   <a className="button-asik" href={urlAsik + pathnameUpload.Kemanfaatan_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a>  : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                                   
                                                </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Kemanfaatan_inovasi.data !== null ? <>
                                                        <Button name="kemanfaatan_inovasi" className={show.kemanfaatan_inovasi === false ? "button-asik-edit" : "display-none"} onClick={DeletekemanfaatanInovasi} value={pathnameUpload.Kemanfaatan_inovasi.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.kemanfaatan_inovasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadkemanfaatanInovasi} />
                                                    </> :  <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadkemanfaatanInovasi} />}
                                                   
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
                                                <TableCell> </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Monitoring_dan_evaluasi_daerah.data !== null ?  <a className="button-asik" href={urlAsik + pathnameUpload.Monitoring_dan_evaluasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a> : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}
                                                 </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Monitoring_dan_evaluasi_daerah.data !== null ?  <> 
                                                        <Button name="monitoring_evaluasi" onClick={Deletemonitoring} className={show.monitoring_evaluasi === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.Monitoring_dan_evaluasi_daerah.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.monitoring_evaluasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadmonitoring} /> 
                                                    </>:   <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadmonitoring} /> }
                                                    
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
                                                <TableCell> </TableCell>
                                                <TableCell>{pathnameUpload.Kualitas_inovasi_daerah.data !== null ? <a className="button-asik" href={urlAsik + pathnameUpload.Kualitas_inovasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                                    Lihat File
                                                </a> : <h5>Anda belum mengupload file , Silahkan upload indikator inovasi daerah</h5>}  </TableCell>
                                                <TableCell>
                                                    {pathnameUpload.Kualitas_inovasi_daerah.data !== null  ? <>
                                                        <Button name="kualitas_inovasi" className={show.kualitas_inovasi === false ? "button-asik-edit" : "display-none"} onClick={DeletekualitasInovasi} value={pathnameUpload.Kualitas_inovasi_daerah.data.id}>Edit File</Button>
                                                    <input type="file" id="file" className={show.kualitas_inovasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadkualitasInovasi} />
                                                    </> :   <input type="file" id="file" className="file"  accept="image/*,.pdf" onChange={uploadkualitasInovasi} /> }
                                                  
                                                </TableCell>
                                                <TableCell>Dokumen PDF/JPG</TableCell>
                                            </TableRow>
                                            {/*      Kualitas inovasi daerah */}

                                        </TableBody>
                                    </Table>
                                </TableContainer>


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


