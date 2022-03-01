import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

import Breadcumbs from "../components/Sections/Breadcumbs";

export default function StrukturOrganisasi() {
    const [loading, setLoading] = useState(false)
    const [strukturOrganisasi, setStrukturOrganisasi] = useState([])
    // console.log(strukturOrganisasi)
    const getSelandang = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/struktur-organisasi/"
            const response = await axios.get(url);
            if (response.status === 200) {

                setStrukturOrganisasi(response.data.data.attributes.Deskripsi)

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
                        Struktur Organisasi
                    </h3>

                    {loading === true ? <CircularProgress /> :
                        <>
                         <div
                                dangerouslySetInnerHTML={{
                                    __html: strukturOrganisasi
                                }}></div>
                           
                            {/* <div className="list-pegawai">
                                <iframe src="https://asik.palembang.go.id/uploads/struktur_litbang_c46251b164.pdf" title="komposisi pegawai" />

                            </div> */}

                        </>
                    }
                </div>
            </div>

        </>
    );
}


