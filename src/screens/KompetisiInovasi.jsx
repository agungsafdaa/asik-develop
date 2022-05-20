import React, { useState } from 'react';

import Breadcumbs from "../components/Sections/Breadcumbs";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styled from "styled-components";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from "@mui/material/Button";
export default function KompetisiInovasi(props) {
    const [pagination, setPagination] = useState({})
    const [loading, setLoading] = useState(false)
    const [berita, setBerita] = useState([])
    const [state, setState] = useState({});
    let navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [namaPage, setNamaPage] = useState(
        'Event & Kegiatan'
    );
    const handleChange = async ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        });

    }

    const DaftarLomba = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/inovasi-formulir-kompetisis"
            const response = await axios.post(url, {
                Nik: state.Nik,
                Nama_lengkap: state.Nama_lengkap,
                Email: state.email,
                Jenis_kelamin: state.Jenis_kelamin,
                No_wa: state.No_wa,
                No_handphone: state.No_handphone,
                Status_pekerjaan: state.Status_pekerjaan,
                Nama_institusi: state.Nama_institusi,
                Skill_hackaton: state.Skill_hackaton,
                Alasan: state.Alasan,
                Informasi_kompetisi: state.Informasi_kompetisi,
                Ide_inovasi: state.Ide_inovasi,

            });
            if (response.status === 200) {
                toast.success('Anda Berhasil mendaftar silahkan cek email', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }
        } catch (error) {

            const messageError = error.response.data.error.message === 'Invalid identifier or password' ? 'Username/Password Salah' : error.response.data.error.message
            toast.error(messageError, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoading(false)
        }
    }

    return (
        <>



            <Breadcumbs page={namaPage} />


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

            <Wrapper id="blog">
                <div className="whiteBg">
                    <div className="container">

                        <div className="pendaftaran">
                            <div className="heading-pendaftaran">
                                <h3>
                                    Formulir Pendaftaran Kompetisi Inovasi
                                </h3>
                            </div>
                            <div className="form-pendaftaran">
                                <ValidatorForm onSubmit={DaftarLomba}>
                                    <TextValidator onChange={handleChange}
                                        type="text"
                                        fullWidth
                                        className="form-inovasi"
                                        validators={['required']}
                                        errorMessages={['Harap di isi']}
                                        placeholder="Nomor Induk Kependudukan" id="nik" name="nik" value={state.nik || ''}
                                    />
                                    <TextValidator onChange={handleChange}
                                        type="text"
                                        fullWidth
                                        validators={['required']}
                                        className="form-inovasi"
                                        errorMessages={['Harap di isi']}
                                        placeholder="Nama Lengkap" id="nik" name="nama_lengkap" value={state.nama_lengkap || ''}
                                    />
                                    <TextValidator onChange={handleChange}
                                        type="email"
                                        fullWidth
                                        className="form-inovasi"
                                        validators={['required']}
                                        errorMessages={['Harap di isi']}
                                        placeholder="Email Aktif" id="nik" name="Email" value={state.Email || ''}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Jenis Kelamin</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="bagian-kerja"
                                            defaultValue=''
                                            value={state.jenis_kelamin || ''}
                                            placeholder="Pilih Unit Kerja"
                                            label="Pilih Jenis Kelamin"

                                            name="jenis_kelamin"

                                            onChange={handleChange}
                                        >
                                            <MenuItem value=''>Pilih Jenis Kelamin</MenuItem>
                                            <MenuItem value='Laki-Laki'>Laki-Laki</MenuItem>
                                            <MenuItem value='Perempuan'>Perempuan</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextValidator onChange={handleChange}
                                        type="text"
                                        fullWidth
                                        className="form-inovasi"
                                        validators={['required']}
                                        errorMessages={['Harap di isi']}
                                        placeholder="No Handphone" id="nik" name="No_handphone" value={state.No_handphone || ''}
                                    />
                                    <TextValidator onChange={handleChange}
                                        type="text"
                                        fullWidth
                                        className="form-inovasi"
                                        validators={['required']}
                                        errorMessages={['Harap di isi']}
                                        placeholder="No WhatsApp" id="nik" name="No_wa" value={state.No_wa || ''}
                                    />

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Status Pekerjaan</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="bagian-kerja"
                                            defaultValue=''
                                            value={state.Status_pekerjaan || ''}
                                            placeholder="Pilih Status Pekerjaan"
                                            label="Pilih Status Pekerjaan"

                                            name="Status_pekerjaan"

                                            onChange={handleChange}
                                        >
                                            <MenuItem value=''>Pilih Status Pekerjaan</MenuItem>
                                            <MenuItem value='Laki-Laki'>Bekerja</MenuItem>
                                            <MenuItem value='Perempuan'>Mahasiswa</MenuItem>
                                            <MenuItem value='Perempuan'>Siswa</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <TextValidator onChange={handleChange}
                                        type="text"
                                        fullWidth
                                        className="form-inovasi"
                                        validators={['required']}
                                        errorMessages={['Harap di isi']}
                                        placeholder="Nama institusi" id="nik" name="Nama_institusi" value={state.Nama_institusi || ''}
                                    />

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Skill hackaton</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="bagian-kerja"
                                            defaultValue=''
                                            value={state.Skill_hackaton || ''}
                                            placeholder="Pilih Skill hackaton"
                                            label="Pilih Skill hackaton"

                                            name="Skill_hackaton"

                                            onChange={handleChange}
                                        >
                                            <MenuItem value=''>Pilih Skill hackaton</MenuItem>
                                            <MenuItem value='Hacker (programming/teknis teknoloogi )'>Hacker (programming/teknis teknoloogi )</MenuItem>
                                            <MenuItem value='Hustler ( Bisnis & Pemasaran )'>Hustler ( Bisnis & Pemasaran )</MenuItem>
                                            <MenuItem value='Hipster (Desain /Kreator / Inovator )'>Hipster (Desain /Kreator / Inovator )</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <TextValidator onChange={handleChange}
                                        type="text"
                                        fullWidth
                                        multiline
                                        className="form-inovasi"
                                        rows={4}
                                        validators={['required']}
                                        errorMessages={['Harap di isi']}
                                        placeholder="Alasan Mengikuti" id="nik" name="Alasan" value={state.Alasan || ''}
                                    />

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Informasi kompetisi</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="bagian-kerja"
                                            defaultValue=''
                                            value={state.Informasi_kompetisi || ''}
                                            placeholder="Pilih Informasi kompetisi"
                                            label="Pilih Informasi kompetisi"

                                            name="Informasi_kompetisi"

                                            onChange={handleChange}
                                        >
                                            <MenuItem value=''>Pilih Informasi kompetisi</MenuItem>
                                            <MenuItem value='Media Sosial (Instagram,Telegram,Facebook, Dll)'>Media Sosial (Instagram,Telegram,Facebook, Dll)</MenuItem>
                                            <MenuItem value='Media Cetak'>Media Cetak</MenuItem>

                                        </Select>
                                    </FormControl>


                                    <TextValidator onChange={handleChange}
                                        type="text"
                                        fullWidth
                                        multiline
                                        className="form-inovasi"
                                        rows={4}
                                        validators={['required']}
                                        errorMessages={['Harap di isi']}
                                        placeholder="Ide inovasi" id="nik" name="Ide_inovasi" value={state.Ide_inovasi || ''}
                                    />

                                    <div className="button-area">
                                        {loading === true ? <LoadingButton loading variant="outlined">
                                            Submit
                                        </LoadingButton> : <Button className="see-all-button" size="small" type="submit">Daftar  </Button>}
                                    </div>
                                </ValidatorForm>

                            </div>
                        </div>


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


