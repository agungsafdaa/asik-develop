import React, { useState, useEffect } from 'react';

import { CircularProgress, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Breadcumbs from "../components/Sections/Breadcumbs";
function convertDateDBtoIndo(string) {
    const bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const tanggal = string.split("-")[2];
    const bulan = string.split("-")[1];
    const tahun = string.split("-")[0];

    return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
}

export default function DetailBerita() {
    const location = useLocation();
    let { id } = useParams();

    const { judul_berita, tanggal_berita, isi_berita } = location.state.detailBerita.attributes
    const thumbnail = 'https://asik.palembang.go.id' + location.state.detailBerita.attributes.gambar_berita.data[0].attributes.url

    return (
        <>



            <Breadcumbs />

            <div className="container">
                <div className="detail-berita">


                  
                    <div className="judul-inovasi">
                        <h2>
                            {judul_berita}
                        </h2>
                    </div>
                   
                    <img className="thumbnail-berita" src={thumbnail} alt={judul_berita}/>
                    <div className="tanggal-pelaksanaan">
                      <h4>  Di upload : {convertDateDBtoIndo(tanggal_berita)}</h4>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: isi_berita
                        }}></div>
                </div>
            </div>

        </>
    );
}


