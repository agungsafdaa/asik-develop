import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import {TextValidator ,ValidatorForm} from 'react-material-ui-form-validator';

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
    // let navigate = useNavigate();
    let { id } = useParams();

    const isAuthenticated = localStorage.getItem("token");

    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({});

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
            setLoading(true)

            let url = "https://asik.palembang.go.id/api/inovasis/" + id

            let formData = new FormData();
            formData.append('files.Jumlah_kajian_yang_mendukung_inovasi', target);
            const data = {
                desc_Jumlah_kajian_yang_mendukung_inovasi: state.jumlah_kajian,
            }



            const myJSON = JSON.stringify(data);


            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {

                    setLoading(false)

                    toast.success('Jumlah kajian yang mendukung inovasi berhasil di tambahkan!', {
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

            let url = "https://asik.palembang.go.id/api/inovasis/" + id

            let formData = new FormData();
            formData.append('files.Roadmap_SIDa', target);
            const data = {
                desc_Roadmap_SIDa: state.roadmap_Sida,
            }



            const myJSON = JSON.stringify(data);


            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {

                    setLoading(false)

                    toast.success('Roadmap SIDA berhasil di tambahkan!', {
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
            setLoading(true)

            let url = "https://asik.palembang.go.id/api/inovasis/" + id

            let formData = new FormData();
            formData.append('files.Dukungan_anggaran', target);
            const data = {
                desc_Dukungan_anggaran: state.indikator_dukungan_anggaran,
            }



            const myJSON = JSON.stringify(data);


            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {

                    setLoading(false)

                    toast.success('Roadmap SIDA berhasil di tambahkan!', {
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
            setLoading(true)

            let url = "https://asik.palembang.go.id/api/inovasis/" + id

            let formData = new FormData();
            formData.append('files.Penggunaan_IT', target);
            const data = {
                desc_Penggunaan_IT: state.indikator_penggunaan_it,
            }



            const myJSON = JSON.stringify(data);


            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {

                    setLoading(false)

                    toast.success('Penggunaan IT berhasil di tambahkan!', {
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
            setLoading(true)

            let url = "https://asik.palembang.go.id/api/inovasis/" + id

            let formData = new FormData();
            formData.append('files.Bimtek_inovasi', target);
            const data = {
                desc_Bimtek_inovasi: state.indikator_bimtek_inovasi,
            }



            const myJSON = JSON.stringify(data);


            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {

                    setLoading(false)

                    toast.success('Bimtek Inovasi berhasil di tambahkan!', {
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
            setLoading(true)

            let url = "https://asik.palembang.go.id/api/inovasis/" + id

            let formData = new FormData();
            formData.append('files.Program_Inovasi_perangkat_RKPD', target);
            const data = {
                desc_Program_Inovasi_perangkat_RKPD: state.indikator_RKPD,
            }



            const myJSON = JSON.stringify(data);


            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {

                    setLoading(false)

                    toast.success('Bimtek Inovasi berhasil di tambahkan!', {
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
            setLoading(true)

            let url = "https://asik.palembang.go.id/api/inovasis/" + id

            let formData = new FormData();
            formData.append('files.Keterlibatan_aktor_inovasi', target);
            const data = {
                desc_Keterlibatan_aktor_inovasi: state.indikator_aktor_inovasi,
            }



            const myJSON = JSON.stringify(data);


            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {

                    setLoading(false)

                    toast.success('Keterlibatan aktor inovasi berhasil di tambahkan!', {
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
            setLoading(true)

            let url = "https://asik.palembang.go.id/api/inovasis/" + id

            let formData = new FormData();
            formData.append('files.Pelaksana_inovasi_daerah', target);
            const data = {
                desc_Pelaksana_inovasi_daerah: state.indikator_pelaksana_inovasi,
            }



            const myJSON = JSON.stringify(data);


            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {

                    setLoading(false)

                    toast.success('Pelaksana inovasi daerah berhasil di tambahkan!', {
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
            setLoading(true)

            let url = "https://asik.palembang.go.id/api/inovasis/" + id

            let formData = new FormData();
            formData.append('files.Jejaring_inovasi', target);
            const data = {
                desc_Jejaring_inovasi: state.indikator_jejaring_inovasi,
            }



            const myJSON = JSON.stringify(data);


            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {

                    setLoading(false)

                    toast.success('Pelaksana inovasi daerah berhasil di tambahkan!', {
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
            setLoading(true)
            let url = "https://asik.palembang.go.id/api/inovasis/" + id
            let formData = new FormData();
            formData.append('files.Sosialisasi_inovasi_daerah', target);
            const data = {
                desc_Sosialisasi_inovasi_daerah: state.indikator_sosialisasi_inovasi,
            }

            const myJSON = JSON.stringify(data);

            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)
                    toast.success('Sosialisasi inovasi daerah berhasil di tambahkan!', {
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
            setLoading(true)
            let url = "https://asik.palembang.go.id/api/inovasis/" + id
            let formData = new FormData();
            formData.append('files.Pedoman_teknis_inovasi', target);
            const data = {
                desc_Pedoman_teknis_inovasi: state.indikator_pedoman_inovasi,
            }

            const myJSON = JSON.stringify(data);

            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)
                    toast.success('Pedoman teknis inovasi daerah berhasil di tambahkan!', {
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
            setLoading(true)
            let url = "https://asik.palembang.go.id/api/inovasis/" + id
            let formData = new FormData();
            formData.append('files.Kemudahan_informasi_layanan', target);
            const data = {
                desc_Kemudahan_informasi_layanan: state.indikator_kemudahan_inovasi,
            }

            const myJSON = JSON.stringify(data);

            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)
                    toast.success('Pedoman teknis inovasi daerah berhasil di tambahkan!', {
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
            setLoading(true)
            let url = "https://asik.palembang.go.id/api/inovasis/" + id
            let formData = new FormData();
            formData.append('files.Kemudahan_proses_inovasi_yang_dihasilkan', target);
            const data = {
                desc_Kemudahan_proses_inovasi_yang_dihasilkan: state.indikator_kemudahanProses,
            }

            const myJSON = JSON.stringify(data);

            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)
                    toast.success('Kemudahan proses inovasi yang dihasilkan  berhasil di tambahkan!', {
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
            setLoading(true)
            let url = "https://asik.palembang.go.id/api/inovasis/" + id
            let formData = new FormData();
            formData.append('files.Penyelesaian_layanan_pengaduan', target);
            const data = {
                desc_Penyelesaian_layanan_pengaduan: state.indikator_penyelesaianLayanan,
            }

            const myJSON = JSON.stringify(data);

            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)
                    toast.success('Penyelesaian layanan pengaduan  berhasil di tambahkan!', {
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
            setLoading(true)
            let url = "https://asik.palembang.go.id/api/inovasis/" + id
            let formData = new FormData();
            formData.append('files.Online_sistem', target);
            const data = {
                desc_Online_sistem: state.indikator_onlineSistem,
            }

            const myJSON = JSON.stringify(data);

            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)
                    toast.success('Online Sistem berhasil di tambahkan!', {
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
            setLoading(true)
            let url = "https://asik.palembang.go.id/api/inovasis/" + id
            let formData = new FormData();
            formData.append('files.Repikasi', target);
            const data = {
                desc_Repikasi: state.indikator_repikasi,
            }

            const myJSON = JSON.stringify(data);

            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)
                    toast.success('Repikasi berhasil di tambahkan!', {
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
            setLoading(true)
            let url = "https://asik.palembang.go.id/api/inovasis/" + id
            let formData = new FormData();
            formData.append('files.Kecepatan_inovasi', target);
            const data = {
                desc_Kecepatan_inovasi: state.indikator_kecepatanInovasi,
            }

            const myJSON = JSON.stringify(data);

            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)
                    toast.success('Kecepatan Inovasi berhasil di tambahkan!', {
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

    const uploadKetersediaanSDM = async (event) => {
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
            formData.append('files.Ketersediaan_SDM_inovasi_daerah', target);
            const data = {
                desc_Ketersediaan_SDM_inovasi_daerah: state.indikator_Ketersediaan_SDM_inovasi_daerah,
            }

            const myJSON = JSON.stringify(data);

            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)
                    toast.success('Kecepatan Inovasi berhasil di tambahkan!', {
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
        }
    };

    const DeleteKetersediaanSDM = async (event) => {
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
            setLoading(true)
            let url = "https://asik.palembang.go.id/api/inovasis/" + id
            let formData = new FormData();
            formData.append('files.Kemanfaatan_inovasi', target);
            const data = {
                desc_Kemanfaatan_inovasi: state.indikator_kemanfaatanInovasi,
            }

            const myJSON = JSON.stringify(data);

            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)
                    toast.success('Kemanfaatan Inovasi berhasil di tambahkan!', {
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
            setLoading(true)
            let url = "https://asik.palembang.go.id/api/inovasis/" + id
            let formData = new FormData();
            formData.append('files.Monitoring_dan_evaluasi_daerah', target);
            const data = {
                desc_Monitoring_dan_evaluasi_daerah: state.indikator_monitoringEvaluasi,
            }

            const myJSON = JSON.stringify(data);

            formData.append('data', myJSON)

            try {
                let response = await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer ' + isAuthenticated } })
                // let response = await axios.post(url,  formData, { headers: { 'content-type': 'multipart/form-data', Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkxZGEzYjJjYmQ0MjYwYWJlNDc4MTMiLCJ1c2VybmFtZSI6InRlc3RlciIsImVtYWlsIjoiYWd1bmdzYWZkYWFAZ21haWwuY29tIiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaXNBZG1pbiI6ZmFsc2UsImlzT3BlcmF0b3IiOmZhbHNlLCJpc0FwcHJvdmVyIjpmYWxzZSwiaXNTaWduZXIiOmZhbHNlLCJpc0VtcGxveWVlIjpmYWxzZSwiaWF0IjoxNjQ1NzUzNjk1LCJleHAiOjE2NDU3ODI0OTV9.RZHdhzzlzU61EpDdj4YsVJv5O47YT8CHSnnc92yEfjU' } })
                if (response.status === 200) {
                    setLoading(false)
                    toast.success('Monitoring dan evaluasi daerah berhasil di tambahkan!', {
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

                        {loading === true ? <CircularProgress /> :
                        <ValidatorForm>
                                   <div className="form-inovasi">


<h3 style={{ margin: "20px 0 20px 0" }}>Indikator Inovasi Daerah</h3>
<TableContainer>
    <Table aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Indikator</TableCell>
                <TableCell> angan</TableCell>
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
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_regulasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Regulasi_Inovasi_daerah}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_regulasi"

                            defaultValue={pathnameUpload.attributes.desc_Regulasi_Inovasi_daerah}
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
                        <div className="aksi-indikator">
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
                            <div className="aksi-indikator">
                                <a className={show.jumlah_kajian === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Jumlah_kajian_yang_mendukung_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                    Lihat File
                                </a>
                                <Button onClick={DeletejumlahKajian} name="jumlah_kajian" className={show.jumlah_kajian === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.attributes.Jumlah_kajian_yang_mendukung_inovasi.data.id}>Hapus File</Button>
                                <input type="file" id="file" className={show.jumlah_kajian === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadjumlahKajian} />
                            </div>
                        </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadjumlahKajian} />}

                </TableCell>

            </TableRow>
            {/*     Jumlah kajian yang mendukung inovasi */}
            {/*     Roadmap SIDA */}
            <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    3
                </TableCell>
                <TableCell>
                    Roadmap SIDA
                </TableCell>
                <TableCell >Roadmap SIDA </TableCell>
                <TableCell></TableCell>


                <TableCell>
                    {pathnameUpload.attributes.Roadmap_SIDa.data ? <>
                        <div className="aksi-indikator">
                            <a className={show.roadmap_sida === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Roadmap_SIDa.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="roadmap_sida" className={show.roadmap_sida === false ? "button-asik-edit" : "display-none"} onClick={DeleteroadmapSIDA} value={pathnameUpload.attributes.Roadmap_SIDa.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.roadmap_sida === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadroadmapSIDA} />
                        </div>
                    </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadroadmapSIDA} />}

                </TableCell>

            </TableRow>
            {/*    Roadmap SIDA*/}
            {/*      Dukungan anggaran */}
            <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    4
                </TableCell>
                <TableCell >
                    Dukungan anggaran
                </TableCell>
                <TableCell >  Anggaran inovasi daerah dalam APBD dengan tahapan inisiasi (penyampaian ide, rapat, proposal, penulisan kajian), uji coba (pilot project, perekayasaan, laboratorium lapangan, dan sejenisnya), dan penerapan (penyediaan sarana prasarana, sumber daya manusia dan layanan, bimtek, urusan jenis layanan) </TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_dukungan_anggaran ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Dukungan_anggaran}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_dukungan_anggaran"

                            defaultValue={pathnameUpload.attributes.desc_Regulasi_Inovasi_daerah}
                            value={state.indikator_dukungan_anggaran || ''}
                            label="Pilih Indikator"
                            onChange={handleChange}
                        >
                            <MenuItem value="Anggaran tersedia pada kegiatan inisiasi inovasi daerah">Anggaran tersedia pada kegiatan <br /> inisiasi inovasi daerah </MenuItem>
                            <MenuItem value="Anggaran tersedia pada kegiatan uji coba inovasi daerah">Anggaran tersedia pada kegiatan   <br /> uji coba inovasi daerah</MenuItem>
                            <MenuItem value="Anggaran tersedia pada kegiatan penerapan inovasi daerah">Anggaran tersedia pada kegiatan   <br />penerapan inovasi daerah</MenuItem>
                        </Select>
                    </FormControl>

                </TableCell>

                <TableCell>
                    {pathnameUpload.attributes.Dukungan_anggaran.data !== null ?
                        <>
                            <div className="aksi-indikator">
                                <a className={show.dukungan_anggaran === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Dukungan_anggaran.data.attributes.url} target="_blank" rel="noreferrer">
                                    Lihat File
                                </a>
                                <Button name="dukungan_anggaran" className={show.dukungan_anggaran === false ? "button-asik-edit" : "display-none"} onClick={DeletedukunganAnggaran} value={pathnameUpload.attributes.Dukungan_anggaran.data.id}>Hapus File</Button>
                                <input type="file" id="file" className={show.dukungan_anggaran === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploaddukunganAnggaran} />
                            </div>
                        </>
                        : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploaddukunganAnggaran} />}

                </TableCell>

            </TableRow>
            {/*     Dukungan anggaran */}
            {/*    Penggunaan IT */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    5
                </TableCell>
                <TableCell>
                    Penggunaan IT
                </TableCell>
                <TableCell >  Penggunaan IT dalam pelaksanaan Inovasi yang diterapkan </TableCell>
                <TableCell>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_penggunaan_it ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Penggunaan_IT ? pathnameUpload.attributes.desc_Penggunaan_IT : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_penggunaan_it"

                            defaultValue={pathnameUpload.attributes.desc_Penggunaan_IT}
                            value={state.indikator_penggunaan_it || ''}
                            label="Pilih Indikator"
                            onChange={handleChange}
                        >
                            <MenuItem value="Pelaksanaan kerja secara manual/non elektronik">Pelaksanaan kerja secara <br />  manual/non elektronik</MenuItem>
                            <MenuItem value="Pelaksanaan kerja secara elektronik ">Pelaksanaan kerja secara elektronik </MenuItem>
                            <MenuItem value="Pelaksanaan kerja sudah didukung system informasi online/ daring">Pelaksanaan kerja sudah didukung <br /> system informasi online/ daring</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>

                <TableCell>
                    {pathnameUpload.attributes.Penggunaan_IT.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.penggunaan_it === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Penggunaan_IT.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="penggunaan_it" className={show.penggunaan_it === false ? "button-asik-edit" : "display-none"} onClick={DeletepenggunaanIT} value={pathnameUpload.attributes.Penggunaan_IT.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.penggunaan_it === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadpenggunaanIT} />
                        </div>
                    </>
                        : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadpenggunaanIT} />}

                </TableCell>

            </TableRow>
            {/*  Penggunaan IT */}
            {/*     Bimtek inovasi*/}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    6
                </TableCell>
                <TableCell>
                    Bimtek inovasi
                </TableCell>
                <TableCell >  Peningkatan kapasitas dan kompetensi pelaksana inovasi daerah </TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_bimtek_inovasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Bimtek_inovasi ? pathnameUpload.attributes.desc_Bimtek_inovasi : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_bimtek_inovasi"

                            defaultValue={pathnameUpload.attributes.desc_Bimtek_inovasi}
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
                    {pathnameUpload.attributes.Bimtek_inovasi.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.bimtek_inovasi === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Bimtek_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="bimtek_inovasi" className={show.bimtek_inovasi === false ? "button-asik-edit" : "display-none"} onClick={DeletebimtekInovasi} value={pathnameUpload.attributes.Bimtek_inovasi.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.bimtek_inovasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadbimtekInovasi} />
                        </div>
                    </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadbimtekInovasi} />}

                </TableCell>

            </TableRow>
            {/*    Bimtek inovasi */}
            {/*    Program Inovasi perangkat RKPD*/}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    7
                </TableCell>
                <TableCell>
                    Program Inovasi perangkat RKPD
                </TableCell>
                <TableCell > Inovasi Perangkat Daerah telah dituangkan dalam program pembangunan daerah </TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_RKPD ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Program_Inovasi_perangkat_RKPD ? pathnameUpload.attributes.desc_Program_Inovasi_perangkat_RKPD : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_RKPD"

                            defaultValue={pathnameUpload.attributes.desc_Program_Inovasi_perangkat_RKPD ? pathnameUpload.attributes.desc_Program_Inovasi_perangkat_RKPD : 'Pemerintah daerah sudah menuangkan program inovasi daerah dalam RPJMD'}
                            value={state.indikator_RKPD || ''}
                            label="Pilih Indikator"
                            onChange={handleChange}
                        >
                            <MenuItem value="Pemerintah daerah sudah menuangkan program inovasi daerah dalam RPJMD">Pemerintah daerah sudah menuangkan program  <br /> inovasi daerah dalam RPJMD  </MenuItem>
                            <MenuItem value="Pemerintah daerah sudah menuangkan program inovasi daerah dalam RKPD dan telah diterapkan dalam 1 tahun terakhir">Pemerintah daerah sudah menuangkan program  <br /> inovasi daerah dalam RKPD dan telah diterapkan  <br /> dalam 1 tahun terakhir</MenuItem>
                            <MenuItem value="Pemerintah daerah sudah menuangkan program inovasi daerah dalam RKPD dan telah diterapkan dalam 2 tahun terakhir">Pemerintah daerah sudah menuangkan program <br /> inovasi daerah dalam RKPD dan telah diterapkan  <br /> dalam 2 tahun terakhir </MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>

                <TableCell>
                    {pathnameUpload.attributes.Program_Inovasi_perangkat_RKPD.data !== null ?
                        <>
                            <div className="aksi-indikator">

                                <a className={show.perangkat_rkpd === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Program_Inovasi_perangkat_RKPD.data.attributes.url} target="_blank" rel="noreferrer">
                                    Lihat File
                                </a>
                                <Button name="perangkat_rkpd" className={show.perangkat_rkpd === false ? "button-asik-edit" : "display-none"} onClick={DeleteprogramInovasi} value={pathnameUpload.attributes.Program_Inovasi_perangkat_RKPD.data.id}>Hapus File</Button>
                                <input type="file" id="file" className={show.perangkat_rkpd === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadprogramInovasi} />
                            </div>
                        </>
                        : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadprogramInovasi} />}

                </TableCell>

            </TableRow>
            {/*    Program Inovasi perangkat RKPD  */}
          





            {/*         Keterlibatan aktor inovasi */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    8
                </TableCell>
                <TableCell>
                    Keterlibatan aktor inovasi
                </TableCell>
                <TableCell >Keikutsertaan unsur Stakeholder dalam pelaksanaan inovasi daerah (T-1 dan T-2)</TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_aktor_inovasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Keterlibatan_aktor_inovasi ? pathnameUpload.attributes.desc_Keterlibatan_aktor_inovasi : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_aktor_inovasi"

                            defaultValue={pathnameUpload.attributes.desc_Keterlibatan_aktor_inovasi ? pathnameUpload.attributes.desc_Keterlibatan_aktor_inovasi : 'Inovasi melibatkan 4 aktor'}
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
                    {pathnameUpload.attributes.Keterlibatan_aktor_inovasi.data !== null ?
                        <>
                            <div className="aksi-indikator">
                                <a className={show.keterlibatan_aktor === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Keterlibatan_aktor_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                    Lihat File
                                </a>
                                <Button name="keterlibatan_aktor" onClick={DeleteketerlibatanAktor} className={show.keterlibatan_aktor === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.attributes.Keterlibatan_aktor_inovasi.data.id}>Hapus File</Button>
                                <input type="file" id="file" className={show.keterlibatan_aktor === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadketerlibatanAktor} />
                            </div>
                        </>
                        : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadketerlibatanAktor} />}

                </TableCell>

            </TableRow>
            {/*      Keterlibatan aktor inovasi  */}
            {/*      Pelaksana inovasi daerah  */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    9
                </TableCell>
                <TableCell>
                    Pelaksana inovasi daerah
                </TableCell>
                <TableCell >Penetapan tim pelaksana inovasi daerah</TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">  <InputLabel id="demo-simple-select-label">{state.indikator_pelaksana_inovasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Pelaksana_inovasi_daerah ? pathnameUpload.attributes.desc_Pelaksana_inovasi_daerah : 'Pilih Regulasi'}</InputLabel></InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_pelaksana_inovasi"
                            defaultValue={pathnameUpload.attributes.desc_Pelaksana_inovasi_daerah ? pathnameUpload.attributes.desc_Pelaksana_inovasi_daerah : 'Ada pelaksana namun tidak ditetapkan dengan SK Kepala Perangkat Daerah'}

                            value={state.indikator_pelaksana_inovasi || ''}
                            label="Pilih Indikator"
                            onChange={handleChange}
                        >
                            <MenuItem value="Ada pelaksana namun tidak ditetapkan dengan SK Kepala Perangkat Daerah">Ada pelaksana namun tidak ditetapkan dengan  <br />SK Kepala Perangkat Daerah</MenuItem>
                            <MenuItem value="Ada pelaksana dan ditetapkan dengan SK Kepala Perangkat Daerah">Ada pelaksana dan ditetapkan dengan  <br /> SK Kepala Perangkat Daerah</MenuItem>
                            <MenuItem value="Ada pelaksana dan ditetapkan dengan SK Kepala Daerah">Ada pelaksana dan ditetapkan dengan   <br /> SK Kepala Daerah</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>

                <TableCell>
                    {pathnameUpload.attributes.Pelaksana_inovasi_daerah.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.pelaksana === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Pelaksana_inovasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="pelaksana" className={show.pelaksana === false ? "button-asik-edit" : "display-none"} onClick={DeletepelaksanaInovasi} value={pathnameUpload.attributes.Pelaksana_inovasi_daerah.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.pelaksana === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadpelaksanaInovasi} />
                        </div>
                    </> :
                        <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadpelaksanaInovasi} />
                    }

                </TableCell>

            </TableRow>
            {/*          Pelaksana inovasi daerah   */}
            {/*         Jejaring inovasi  */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

                <TableCell component="th" scope="row">
                    10
                </TableCell>
                <TableCell >
                    Jejaring inovasi
                </TableCell>
                <TableCell >Jumlah Perangkat Daerah yang terlibat dalam penerapan inovasi (dalam 2 tahun terakhir)</TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_jejaring_inovasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Jejaring_inovasi ? pathnameUpload.attributes.desc_Jejaring_inovasi : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_jejaring_inovasi"
                            defaultValue={pathnameUpload.attributes.desc_Jejaring_inovasi ? pathnameUpload.attributes.desc_Jejaring_inovasi : 'Ada pelaksana namun tidak ditetapkan dengan SK Kepala Perangkat Daerah'}

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
                    {pathnameUpload.attributes.Jejaring_inovasi.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.jejaring === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Jejaring_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="jejaring" className={show.jejaring === false ? "button-asik-edit" : "display-none"} onClick={DeletejejaringInovasi} value={pathnameUpload.attributes.Jejaring_inovasi.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.jejaring === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadjejaringInovasi} />
                        </div>

                    </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadjejaringInovasi} />}

                </TableCell>

            </TableRow>
            {/*            Jejaring inovasi  */}
            {/*         Sosialisasi inovasi daerah  */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    11
                </TableCell>
                <TableCell>
                    Sosialisasi inovasi daerah
                </TableCell>
                <TableCell >Penyebarluasan informasi kebijakan inovasi daerah (2 Tahun Terakhir)</TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_sosialisasi_inovasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Sosialisasi_inovasi_daerah ? pathnameUpload.attributes.desc_Sosialisasi_inovasi_daerah : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_sosialisasi_inovasi"
                            defaultValue={pathnameUpload.attributes.desc_Sosialisasi_inovasi_daerah ? pathnameUpload.attributes.desc_Sosialisasi_inovasi_daerah : 'Foto kegiatan berspanduk'}

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
                    {pathnameUpload.attributes.Sosialisasi_inovasi_daerah.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.sosialisasi === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Sosialisasi_inovasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="sosialisasi" className={show.sosialisasi === false ? "button-asik-edit" : "display-none"} onClick={DeletesosialisasiInovasi} value={pathnameUpload.attributes.Sosialisasi_inovasi_daerah.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.sosialisasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadsosialisasiInovasi} />
                        </div>

                    </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadsosialisasiInovasi} />}

                </TableCell>

            </TableRow>
            {/*       Sosialisasi inovasi daerah  */}
            {/*   Pedoman teknis inovasi */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    12
                </TableCell>
                <TableCell>
                    Pedoman teknis inovasi
                </TableCell>
                <TableCell >Ketentuan dasar penggunaan inovasi daerah berupa buku petunjuk/manual book</TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_pedoman_inovasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Pedoman_teknis_inovasi ? pathnameUpload.attributes.desc_Pedoman_teknis_inovasi : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_pedoman_inovasi"

                            defaultValue={pathnameUpload.attributes.desc_Pedoman_teknis_inovasi ? pathnameUpload.attributes.desc_Pedoman_teknis_inovasi : 'Telah terdapat Pedoman teknis berupa buku manual'}
                            value={state.indikator_pedoman_inovasi || ''}
                            label="Pilih Indikator"
                            onChange={handleChange}
                        >
                            <MenuItem value="Telah terdapat Pedoman teknis berupa buku manual">Telah terdapat Pedoman teknis berupa buku <br /> manual</MenuItem>
                            <MenuItem value="Telah terdapat Pedoman teknis berupa buku dalam bentuk elektronik">Telah terdapat Pedoman teknis berupa buku <br /> dalam bentuk elektronik</MenuItem>
                            <MenuItem value="Telah terdapat Pedoman teknis berupa buku yang dapat diakses secara online">Telah terdapat Pedoman teknis berupa buku <br />  yang dapat diakses secara online</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>

                <TableCell>
                    {pathnameUpload.attributes.Pedoman_teknis_inovasi.data !== null ?
                        <>
                            <div className="aksi-indikator">
                                <a className={show.pedoman_teknis === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Pedoman_teknis_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                    Lihat File
                                </a>
                                <Button name="pedoman_teknis" id="file" className={show.pedoman_teknis === false ? "button-asik-edit" : "display-none"} onClick={DeletepedomanTeknis} value={pathnameUpload.attributes.Pedoman_teknis_inovasi.data.id}>Hapus File</Button>
                                <input type="file" id="file" className={show.pedoman_teknis === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadpedomanTeknis} />
                            </div>

                        </> :
                        <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadpedomanTeknis} />
                    }

                </TableCell>

            </TableRow>
            {/*   Pedoman teknis inovasi */}
            {/*    Kemudahan informasi layanan */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    13
                </TableCell>
                <TableCell>
                    Kemudahan informasi layanan
                </TableCell>
                <TableCell >Kemudahan mendapatkan informasi layanan</TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{<InputLabel id="demo-simple-select-label">{state.indikator_kemudahan_inovasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Kemudahan_informasi_layanan ? pathnameUpload.attributes.desc_Kemudahan_informasi_layanan : 'Pilih Regulasi'}</InputLabel>
                        }</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_kemudahan_inovasi"
                            defaultValue={pathnameUpload.attributes.desc_Kemudahan_informasi_layanan ? pathnameUpload.attributes.desc_Kemudahan_informasi_layanan : 'Layanan Telp atau tatap muka langsung/noken'}

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
                    {pathnameUpload.attributes.Kemudahan_informasi_layanan.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.kemudahan_informasi === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Kemudahan_informasi_layanan.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="kemudahan_informasi" className={show.kemudahan_informasi === false ? "button-asik-edit" : "display-none"} onClick={DeletekemudahanLayanan} value={pathnameUpload.attributes.Kemudahan_informasi_layanan.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.kemudahan_informasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadkemudahanLayanan} />
                        </div>

                    </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadkemudahanLayanan} />}

                </TableCell>

            </TableRow>
            {/*    Kemudahan informasi layanan */}
            {/*      Kemudahan proses inovasi yang dihasilkan */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    14
                </TableCell>
                <TableCell>
                    Kemudahan proses inovasi yang dihasilkan
                </TableCell>
                <TableCell >Waktu yang diperlukan untuk memperoleh proses penggunaan hasil inovasi</TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_kemudahanProses ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Kemudahan_proses_inovasi_yang_dihasilkan ? pathnameUpload.attributes.desc_Kemudahan_proses_inovasi_yang_dihasilkan : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_kemudahanProses"

                            defaultValue={pathnameUpload.attributes.desc_Kemudahan_proses_inovasi_yang_dihasilkan ? pathnameUpload.attributes.desc_Kemudahan_proses_inovasi_yang_dihasilkan : 'Hasil inovasi diperoleh dalam waktu 6 hari keatas'}

                            value={state.indikator_kemudahanProses || ''}
                            label="Pilih Indikator"
                            onChange={handleChange}
                        >
                            <MenuItem value="Hasil inovasi diperoleh dalam waktu 6 hari keatas">Hasil inovasi diperoleh dalam <br /> waktu 6 hari keatas</MenuItem>
                            <MenuItem value="Hasil inovasi diperoleh dalam waktu 2-5 hari ">Hasil inovasi diperoleh dalam <br /> waktu 2-5 hari </MenuItem>
                            <MenuItem value="Hasil inovasi diperoleh dalam waktu 1 hari">Hasil inovasi diperoleh dalam <br /> waktu 1 hari</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>

                <TableCell>
                    {pathnameUpload.attributes.Kemudahan_proses_inovasi_yang_dihasilkan.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.kemudahan_proses === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Kemudahan_proses_inovasi_yang_dihasilkan.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="kemudahan_proses" className={show.kemudahan_proses === false ? "button-asik-edit" : "display-none"} onClick={DeletekemudahanProses} value={pathnameUpload.attributes.Kemudahan_proses_inovasi_yang_dihasilkan.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.kemudahan_proses === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadkemudahanProses} />
                        </div>

                    </>
                        : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadkemudahanProses} />}

                </TableCell>

            </TableRow>
            {/*       Kemudahan proses inovasi yang dihasilkan */}
            {/*     Penyelesaian layanan pengaduan */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    15
                </TableCell>
                <TableCell>
                    Penyelesaian layanan pengaduan
                </TableCell>
                <TableCell >Rasio penyelesaian pengaduan dalam tahun terakhir (jumlah pengaduan yang di tindakalnajuti/ jumlah pengaduan keseluruhan x100%)</TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_penyelesaianLayanan ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Penyelesaian_layanan_pengaduan ? pathnameUpload.attributes.desc_Penyelesaian_layanan_pengaduan : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_penyelesaianLayanan"

                            defaultValue={pathnameUpload.attributes.desc_Penyelesaian_layanan_pengaduan ? pathnameUpload.attributes.desc_Penyelesaian_layanan_pengaduan : 'dibawah 31%'}

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
                    {
                        pathnameUpload.attributes.Penyelesaian_layanan_pengaduan.data !== null ?
                            <>
                                <div className="aksi-indikator">
                                    <a className={show.penyelesaian_layanan === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Penyelesaian_layanan_pengaduan.data.attributes.url} target="_blank" rel="noreferrer">
                                        Lihat File
                                    </a>
                                    <Button name="penyelesaian_layanan" className={show.penyelesaian_layanan === false ? "button-asik-edit" : "display-none"} onClick={DeletepenyelesaianLayanan} value={pathnameUpload.attributes.Penyelesaian_layanan_pengaduan.data.id}>Hapus File</Button>
                                    <input type="file" id="file" className={show.penyelesaian_layanan === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadpenyelesaianLayanan} />
                                </div>

                            </>
                            : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadpenyelesaianLayanan} />}
                </TableCell>

            </TableRow>
            {/* Penyelesaian layanan pengaduan*/}
            {/*     Online sistem */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    16
                </TableCell>
                <TableCell >
                    Online sistem
                </TableCell>
                <TableCell >
                    Jaringan prosedur yang dibuat secara daring ( 2 Tahun Terakhir)

                </TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_onlineSistem ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Online_sistem ? pathnameUpload.attributes.desc_Online_sistem : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_onlineSistem"


                            value={state.indikator_onlineSistem || ''}
                            defaultValue={pathnameUpload.attributes.desc_Program_Inovasi_perangkat_RKPD ? pathnameUpload.attributes.desc_Program_Inovasi_perangkat_RKPD : 'Pilih Indikator'}
                            onChange={handleChange}
                        >
                            <MenuItem value="dibawah 31%">dibawah 31%</MenuItem>
                            <MenuItem value="31% s/d 60%">31% s/d 60% </MenuItem>
                            <MenuItem value="diatas 60%">diatas 60%</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>

                <TableCell>
                    {pathnameUpload.attributes.Online_sistem.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.online_sistem === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Online_sistem.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="online_sistem" className={show.online_sistem === false ? "button-asik-edit" : "display-none"} onClick={DeleteonlineSistem} value={pathnameUpload.attributes.Online_sistem.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.online_sistem === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadonlineSistem} />
                        </div>

                    </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadonlineSistem} />}

                </TableCell>

            </TableRow>
            {/*    Online sistem */}
            {/*   Repikasi*/}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    17
                </TableCell>
                <TableCell>
                    Repikasi
                </TableCell>
                <TableCell >
                    Inovasi Daerah telah direplikasi oleh daerah lain (T-2 sampai dengan T-1)

                </TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_repikasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Repikasi ? pathnameUpload.attributes.desc_Repikasi : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_repikasi"

                            defaultValue={pathnameUpload.attributes.desc_Repikasi ? pathnameUpload.attributes.desc_Repikasi : "Pernah 1 Kali direplikasi di daerah lain"}
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
                    {pathnameUpload.attributes.Repikasi.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.repikasi === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Repikasi.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="repikasi" onClick={Deleterepikasi} className={show.repikasi === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.attributes.Repikasi.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.repikasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadrepikasi} />
                        </div>

                    </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadrepikasi} />}

                </TableCell>

            </TableRow>
            {/*  Repikasi */}
            {/*       Kecepatan inovasi*/}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    18
                </TableCell>
                <TableCell>
                    Kecepatan inovasi
                </TableCell>
                <TableCell >
                    Satuan waktu yang digunakan untuk menciptakan inovasi daerah

                </TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_regulasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Kecepatan_inovasi ? pathnameUpload.attributes.desc_Kecepatan_inovasi : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_kecepatanInovasi"
                            defaultValue={pathnameUpload.attributes.desc_Kecepatan_inovasi ? pathnameUpload.attributes.desc_Kecepatan_inovasi : "Inovasi dapat diciptakan dalam waktu 9 bulan keatas"}
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
                    {pathnameUpload.attributes.Kecepatan_inovasi.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.jumlah_kajian === false ? "button-asik" : "display-none"} href={pathnameUpload.attributes.Kecepatan_inovasi.data !== null ? urlAsik + pathnameUpload.attributes.Kecepatan_inovasi.data.attributes.url : ""} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
   
                            <Button name="kecepatan_inovasi" className={show.kecepatan_inovasi === false ? "button-asik-edit" : "display-none"} onClick={DeletekecepatanInovasi} value={pathnameUpload.attributes.Kecepatan_inovasi.data.id }>Hapus File</Button>
                            <input type="file" id="file" className={show.kecepatan_inovasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadkecepatanInovasi} />
                        </div>

                    </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadkecepatanInovasi} />}

                </TableCell>

            </TableRow>
            {/*      Kecepatan inovasi  */}
            {/*      Kemanfaatan inovasi */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    19
                </TableCell>
                <TableCell>
                    Kemanfaatan inovasi
                </TableCell>
                <TableCell >
                    Jumlah pengguna atau penerima manfaat inovasi daerah (2 tahun terakhir)
                </TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_kemanfaatanInovasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Kemanfaatan_inovasi ? pathnameUpload.attributes.desc_Kemanfaatan_inovasi : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_kemanfaatanInovasi"

                            defaultValue={pathnameUpload.attributes.desc_Kemanfaatan_inovasi ? pathnameUpload.attributes.desc_Kemanfaatan_inovasi : "Jumlah pengguna atau penerima manfaat 1-100 orang"}
                            value={state.indikator_kemanfaatanInovasi || ''}
                            label="Pilih Indikator"
                            onChange={handleChange}
                        >
                            <MenuItem value="Jumlah pengguna atau penerima manfaat 1-100 orang">Jumlah pengguna atau penerima <br /> manfaat 1-100 orang</MenuItem>
                            <MenuItem value="Jumlah pengguna atau penerima manfaat 101-200 orang">Jumlah pengguna atau penerima   <br />  manfaat 101-200 orang</MenuItem>
                            <MenuItem value="Jumlah pengguna atau penerima manfaat 201 orang keatas">Jumlah pengguna atau penerima   <br /> manfaat 201 orang keatas</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>

                <TableCell>
                    {pathnameUpload.attributes.Kemanfaatan_inovasi.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.kemanfaatan_inovasi === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Kemanfaatan_inovasi.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="kemanfaatan_inovasi" className={show.kemanfaatan_inovasi === false ? "button-asik-edit" : "display-none"} onClick={DeletekemanfaatanInovasi} value={pathnameUpload.attributes.Kemanfaatan_inovasi.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.kemanfaatan_inovasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadkemanfaatanInovasi} />
                        </div>

                    </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadkemanfaatanInovasi} />}

                </TableCell>

            </TableRow>
            {/* Kemanfaatan inovasi */}
            {/*      Monitoring dan evaluasi daerah  */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    20
                </TableCell>
                <TableCell>
                    Monitoring dan evaluasi daerah
                </TableCell>
                <TableCell >
                    Kepuasan pelaksanaan penggunaan inovasi daerah (2 Tahun Terakhir)
                </TableCell>
                <TableCell>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_monitoringEvaluasi ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Monitoring_dan_evaluasi_daerah ? pathnameUpload.attributes.desc_Monitoring_dan_evaluasi_daerah : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_monitoringEvaluasi"

                            defaultValue={pathnameUpload.attributes.desc_Monitoring_dan_evaluasi_daerah ? pathnameUpload.attributes.desc_Monitoring_dan_evaluasi_daerah : "Hasil laporan monev internal Perangkat Daerah"}
                            value={state.indikator_monitoringEvaluasi || ''}
                            label="Pilih Indikator"
                            onChange={handleChange}
                        >
                            <MenuItem value="Hasil laporan monev internal Perangkat Daerah">Hasil laporan monev internal Perangkat Daerah</MenuItem>
                            <MenuItem value="Hasil pengukuran kepuasaan pengguna dari evaluasi Survei Kepuasan Masyarakat">Hasil pengukuran kepuasaan pengguna dari <br />  evaluasi Survei Kepuasan Masyarakat</MenuItem>
                            <MenuItem value="Hasil laporan monev eksternal berdasarkan hasil penelitian">Hasil laporan monev eksternal berdasarkan  hasil <br /> penelitian</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>

                <TableCell>
                    {pathnameUpload.attributes.Monitoring_dan_evaluasi_daerah.data !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.monitoring_evaluasi === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Monitoring_dan_evaluasi_daerah.data.attributes.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="monitoring_evaluasi" onClick={Deletemonitoring} className={show.monitoring_evaluasi === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.attributes.Monitoring_dan_evaluasi_daerah.data.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.monitoring_evaluasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadmonitoring} />
                        </div>

                    </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadmonitoring} />}

                </TableCell>

            </TableRow>
            {/*    Monitoring dan evaluasi daerah */}
            {/*   Ketersediaan_SDM_inovasi_daerah */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    20
                </TableCell>
                <TableCell>
                    Ketersediaan SDM Inovasi
                </TableCell>
                <TableCell >
                    Jumlah SDM yang mengelola inovasi daerah (Tahun Terakhir)
                </TableCell>
                <TableCell>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.indikator_Ketersediaan_SDM_inovasi_daerah ? 'Pilih Regulasi' : pathnameUpload.attributes.desc_Monitoring_dan_evaluasi_daerah ? pathnameUpload.attributes.desc_Monitoring_dan_evaluasi_daerah : 'Pilih Regulasi'}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="indikator_Ketersediaan_SDM_inovasi_daerah"

                            defaultValue={pathnameUpload.attributes.desc_Monitoring_dan_evaluasi_daerah ? pathnameUpload.attributes.desc_Monitoring_dan_evaluasi_daerah : "Hasil laporan monev internal Perangkat Daerah"}
                            value={state.indikator_Ketersediaan_SDM_inovasi_daerah || ''}
                            label="Pilih Indikator"
                            onChange={handleChange}
                        >
                            <MenuItem value="1-10 SDM">1-10 SDM</MenuItem>
                            <MenuItem value="11-30 SDM">11-30 SDM</MenuItem>
                            <MenuItem value="Lebih dari 30 SDM">Lebih dari 30 SDM</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>

                <TableCell>
                    {pathnameUpload.attributes.desc_Monitoring_dan_evaluasi_daerah !== null ? <>
                        <div className="aksi-indikator">
                            <a className={show.monitoring_evaluasi === false ? "button-asik" : "display-none"} href={urlAsik + pathnameUpload.attributes.Monitoring_dan_evaluasi_daerah.url} target="_blank" rel="noreferrer">
                                Lihat File
                            </a>
                            <Button name="monitoring_evaluasi" onClick={DeleteKetersediaanSDM} className={show.monitoring_evaluasi === false ? "button-asik-edit" : "display-none"} value={pathnameUpload.attributes.Monitoring_dan_evaluasi_daerah.id}>Hapus File</Button>
                            <input type="file" id="file" className={show.monitoring_evaluasi === true ? "file" : "display-none"} accept="image/*,.pdf" onChange={uploadKetersediaanSDM} />
                        </div>

                    </> : <input type="file" id="file" className="file" accept="image/*,.pdf" onChange={uploadKetersediaanSDM} />}

                </TableCell>

            </TableRow>
            {/*       Kualitas inovasi daerah  */}
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    21
                </TableCell>
                <TableCell>
                    Kualitas inovasi daerah
                </TableCell>



                <TableCell colSpan={4}>
                    <TextValidator onChange={handleChange}
                        type="text"
                        fullWidth


                        placeholder="Contoh : https://www.youtube.com/watch?v=ejthPCbcPj0" id="tanggal_pelaksanaan" name="link_youtube"
                        value={state.link_youtube || ''}
                    />

                </TableCell>

            </TableRow>
            <TableRow>
                <TableCell colSpan={5}>
                    {state.link_youtube ? <iframe className="frame-youtube" src={"https://www.youtube.com/embed/" + state.link_youtube.slice(32)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : pathnameUpload.attributes.Kualitas_inovasi_daerah ? <iframe className="frame-youtube" src={"https://www.youtube.com/embed/" + pathnameUpload.attributes.Kualitas_inovasi_daerah} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <h3 className="text-center">Anda belum mengupload link youtube</h3>
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
                        </ValidatorForm>
                        }
                    </CardContent>
                </Card>
            </div>

        </>
    );
}


