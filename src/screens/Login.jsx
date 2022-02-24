import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
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

    const [inovasi, setInovasi] = useState([])
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
            
                return navigate("/dashboard");
            }
        } catch (error) {
            throw error;
        }
    }   

    return (
        <>
            <div className="login-area">
                <div className="login-page">
                    <div className="login-card">
                        <Card className="card-login">
                            <CardContent>

                               
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                                   
                                    Selamat Datang
                                </Typography>
                                <Typography variant="h6" component="div" gutterBottom>
                                Silahkan Login
                                </Typography>
                                <div className="form-login">
                                    <TextField  label="Username" variant="outlined" onChange={handleChange}
                                        type="text"
                                        name="username"
                                        value={state.username || ''}
                                        placeholder='username' helperText="Harap disi." required />
                                    <TextField  type="password" onChange={handleChange} name="password"
                                        value={state.password || ''} label="Password" variant="outlined" helperText="Harap disi." required />
                                    <Button onClick={getKajian} variant="contained">Login</Button>
                                </div>
                            </CardContent>

                        </Card>
                    </div>

                </div>

            </div>



        </>
    );
}


