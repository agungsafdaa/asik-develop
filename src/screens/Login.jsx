import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { ToastContainer, toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@mui/material/Button';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
export default function Login(props) {
    let navigate = useNavigate();
    const [state, setState] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [namaPage, setNamaPage] = useState(
        'Login & Kegiatan'
    );

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    const [loading, setLoading] = useState(false)
    const handleChange = async ({ target: { name, value } }) => {

        setState({
            ...state,
            [name]: value,
        });
    }
    const getKajian = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/auth/local"
            const response = await axios.post(url, {
                identifier: state.username,
                password: state.password,
            });
            if (response.status === 200) {
                console.log(response.data)
                localStorage.setItem("token", response.data.jwt);
                localStorage.setItem("nama_opd", response.data.user.Nama_opd);
                return navigate("/dashboard");
            }
        } catch (error) {
            console.log(error.response.data.error.message)
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
            <div className="login-area">
                <div className="login-page">
                    <div className="login-card">
                        <Card className="card-login">
                            <CardContent>
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

                                <Typography sx={{ fontSize: 14 }} color="text.secondary" >

                                    Selamat Datang
                                </Typography>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Silahkan Login
                                </Typography>
                                <ValidatorForm

                                    onSubmit={getKajian}

                                >
                                    <div className="form-login">
                                        <div className="form">
                                            <TextValidator label="Username" variant="outlined" onChange={handleChange}
                                                type="text"
                                                name="username"
                                                value={state.username || ''}
                                                validators={['required']}
                                                errorMessages={['Harap di isi']}
                                                placeholder='username' />
                                        </div>
                                        <div className="form">
                                            <TextValidator type={
                                                state.showPassword ? 'text' : 'password'
                                            }
                                                onChange={handleChange} name="password"
                                                validators={['required']}
                                                errorMessages={['Harap di isi']}

                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={
                                                                    handleClickShowPassword
                                                                }
                                                                onMouseDown={
                                                                    handleMouseDownPassword
                                                                }
                                                            >
                                                                {state.showPassword ? (
                                                                    <VisibilityIcon />
                                                                ) : (
                                                                    <VisibilityOffIcon />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                value={state.password || ''} label="Password" variant="outlined" />
                                        </div>
                                        {loading === true ? <LoadingButton className="disabled-button" loading variant="outlined">
                                            Loading
                                        </LoadingButton> : <Button className="login-button" variant="contained" type="submit">Login</Button>}
                                    </div>
                                </ValidatorForm>
                            </CardContent>

                        </Card>
                    </div>

                </div>

            </div>



        </>
    );
}


