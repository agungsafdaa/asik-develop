import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Inovasi() {
    let navigate = useNavigate();
    let { id } = useParams();
    console.log(id)
    const isAuthenticated = localStorage.getItem("token");
    const location = useLocation();
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({});
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
    const [inovasiDetail, setInovasiDetail] = useState([])
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

    const getInovasi = async () => {
         
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasis?filters[id][$contains]=" + id + "&populate=*"
            const response = await axios.get(url);
            if (response.status === 200) {

                setInovasiDetail(response.data.data)
                console.log(response.data.data[0])
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }

    // eslint-disable-next-line no-unused-vars
    const [inovasiUrusan, setinovasiUrusan] = useState([]);

    const handleChange = async ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        });
     
    }

    const pathnameUpload = inovasiDetail[0];
    console.log(pathnameUpload)
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
            setLoading(true)
        
            let url = "https://asik.palembang.go.id/api/inovasis/" + id
    
            let formData = new FormData();
            formData.append('files.Regulasi_Inovasi_daerah', target);
            const data = {
                desc_Regulasi_Inovasi_daerah: state.indikator_regulasi,
             
            }
    
    
    
            const myJSON = JSON.stringify(data);
    
    
            formData.append('data', myJSON)
    
            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
    
                    setLoading(false)
    
                    toast.success('Regulasi Inovasi daerah berhasil di tambahkan!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    window.location.reload(false);
                    // setTimeout(() => {
                    //     return navigate("/dashboard");
                    // }, 3000);
    
                }
            } catch (err) {
                setLoading(false)
                toast.success(err.error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
    
            // setRegulasiInovasi(target)
        }
    };

    const DeleteregulasiInovasi = async (event) => {

        setShow({
            ...show,
            [event.target.name]: true,
        });
        console.log(event.target.value)

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

        formData.append('files.Pedoman_teknis_inovasi', pedomanTeknis);



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

    // console.log(pathnameUpload[0].attributes.Regulasi_Inovasi_daerah.data)

    useEffect(() => {
        getInovasi()
      
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

                        {loading === true ? <CircularProgress /> : <ValidatorForm
                            onSubmit={addKajian}
                        >
                            <div className="form-inovasi">


                                <h3 style={{ margin: "20px 0 20px 0" }}>Indikator Inovasi Daerah</h3>
                                <TableContainer>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>No.</TableCell>
                                                <TableCell>Indikator</TableCell>
                                                <TableCell>Keterangan</TableCell>
                                                <TableCell style={{ width: "55%" }}>Parameter</TableCell>

                                                <TableCell style={{ width: '15%' }}>Action</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Regulasi */}
                                            <TableRow

                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    1

                                                </TableCell>
                                                <TableCell>
                                                    Regulasi Inovasi daerah<br />

                                                </TableCell>
                                                <TableCell>
                                                    Regulasi yang menetapkan nama-nama inovasi daerah yang menjadi landasan operasional penerapan Inovasi Daerah
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl sx={{ width: 1 / 2 }} >
                                                        <InputLabel id="demo-simple-select-label">{state.indikator_regulasi ? 'Pilih Regulasi' : location.state.idInovasi.attributes.desc_Regulasi_Inovasi_daerah}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="indikator_regulasi"

                                                            defaultValue={location.state.idInovasi.attributes.desc_Regulasi_Inovasi_daerah}
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
                                                    {pathnameUpload.attributes.Regulasi_Inovasi_daerah.data !== null ? <>
                                                        <div className="aksi">
                                                            <a className={show.regulasi === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Regulasi_Inovasi_daerah.data.attributes.url} target="_blank" type="button" rel="noreferrer">
                                                                Lihat File
                                                            </a>
                                                            <Button onClick={DeleteregulasiInovasi} name="regulasi" className={show.regulasi === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.attributes.Regulasi_Inovasi_daerah.data.id}>Hapus File</Button>
                                                            <input type="file" id="file" className={show.regulasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadregulasiInovasi} />
                                                        </div>
                                                    </>
                                                        :
                                                        <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadregulasiInovasi} />}

                                                </TableCell>

                                            </TableRow>

                                            {/*      Jumlah kajian yang mendukung inovasi */}
                                            <TableRow

                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    2
                                                </TableCell>
                                                <TableCell>
                                                    Jumlah kajian yang mendukung inovasi
                                                </TableCell>
                                                <TableCell >Jumlah kajian yang mendukung terlaksananya inovasi</TableCell>
                                                <TableCell></TableCell>

                                                <TableCell>
                                                    {pathnameUpload.attributes.Jumlah_kajian_yang_mendukung_inovasi.data !== null ?
                                                        <>
                                                            <div className="aksi">
                                                                <a className={show.jumlah_kajian === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Jumlah_kajian_yang_mendukung_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                                                    Lihat File
                                                                </a>
                                                                <Button onClick={DeletejumlahKajian} name="jumlah_kajian" className={show.jumlah_kajian === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.Jumlah_kajian_yang_mendukung_inovasi.data.id}>Hapus File</Button>
                                                                <input type="file" id="file" className={show.jumlah_kajian === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadjumlahKajian} />
                                                            </div>
                                                        </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadjumlahKajian} />}

                                                </TableCell>

                                            </TableRow>
                                            {/*     Jumlah kajian yang mendukung inovasi */}
                                            <TableRow>
                                                <TableCell colSpan={5}>
                                                    {state.link_youtube ? <iframe className="frame-youtube" src={"https://www.youtube.com/embed/" + state.link_youtube.slice(32)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : location.state.idInovasi.attributes.Kualitas_inovasi_daerah ? <iframe width="250" height="215" src={"https://www.youtube.com/embed/" + location.state.idInovasi.attributes.Kualitas_inovasi_daerah} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <h3 className="text-center">Anda belum mengupload link youtube</h3>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            {/*      Kualitas inovasi daerah */}

                                        </TableBody>
                                    </Table>
                                </TableContainer>

                     
                                <Alert className="info-rancangBangun" severity="warning">
                                    <h5>   Catatan Kualitas Inovasi daerah</h5>
                                    Mengunggah video penerapan inovasi dengan durasi maksimal 5 menit (mp4/MOV) atau link google drive/ youtube, dengan ketentuan video memvisualisasikan 5 substansi:<br />
                                    1. Latar belakang inovasi     <br />
                                    2. Penjaringan ide         <br />
                                    3. Pemilihan ide<br />
                                    4. Manfaat inovasi<br />
                                    5. Dampak inovasi<br />
                                    Video inovasi dilengkapi dengan cover thumbnail dengan format jpg/jpeg/png
                                </Alert>

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


