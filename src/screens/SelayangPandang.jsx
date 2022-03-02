import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

import Breadcumbs from "../components/Sections/Breadcumbs";


export default function SelayangPandang() {
    const [loading, setLoading] = useState(false)
    const [selayangPandang, setSelayangPandang] = useState([])

    const getSelandang = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/selayang-pandang"
            const response = await axios.get(url);
            if (response.status === 200) {

                setSelayangPandang(response.data.data.attributes)

                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        getSelandang()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>



            <Breadcumbs />
           
            <div className="container">
                <div className="tentang-lembaga">
                    <h3>
                        Selayang Pandang
                    </h3>

                    {loading === true ? <CircularProgress /> :
                        <>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: selayangPandang.Deskripsi
                                }}></div>
                            <div className="list-pegawai">
                              
                            </div>

                        </>
                    }
                </div>
            </div>

        </>
    );
}


