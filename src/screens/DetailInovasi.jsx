import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Typography } from '@mui/material';
import {useParams } from 'react-router-dom'
import Breadcumbs from "../components/Sections/Breadcumbs";
function convertDateDBtoIndo(string) {
    const bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const tanggal = string.split("-")[2];
    const bulan = string.split("-")[1];
    const tahun = string.split("-")[0];

    return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
}

export default function SelayangPandang() {
 
    const [loading, setLoading] = useState(false)
    const [inovasi, setInovasi] = useState([])

    let { id } = useParams();
    const getBerita = async () => {
        setLoading(true)
        try {
            let url = `https://asik.palembang.go.id/api/inovasis?filters[Nama_inovasi][$contains]=${id}`
            const response = await axios.get(url);
            if (response.status === 200) {

                setInovasi(response.data.data)

                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }
    const { Nama_inovasi, Hasil_inovasi, Bentuk_inovasi, Tujuan_inovasi, Waktu_implementasi, Waktu_uji_coba,
        Inisiator_inovasi, Jenis_inovasi, Nama_opd,  Rancang_bangun_pokok_inovasi, Urusan_inovasi, Manfaat_inovasi,
   Covid19,Tahapan_inovasi } = inovasi.length !== 0 ? inovasi[0].attributes : ""
         
    useEffect(() => {

        getBerita()



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>



            <Breadcumbs />

            <div className="container">
                {loading === true ?  <div className="loading-center"><CircularProgress/> </div> : <>
                <div className="detail-inovasi">
                    <div className="judul-inovasi">
                        <h2>
                            {Nama_inovasi}
                        </h2>
                    </div>
                    <div className="tanggal-pelaksanaan">

                    </div>

                    <>
                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Bentuk Inovasi </Typography>
                            </div>
                            <div>:</div>
                            <div>
                                <Typography>
                                    {Bentuk_inovasi}
                                </Typography>
                            </div>
                        </div>
                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Tahapan Inovasi </Typography>
                            </div>
                            <div>:</div>
                            <div>
                                <Typography>
                                    {Tahapan_inovasi}
                                </Typography>
                            </div>
                        </div>

                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Inisiator Inovasi </Typography>
                            </div>
                            <div>:</div>
                            <div>
                                <Typography>
                                    {Inisiator_inovasi ? Inisiator_inovasi : "Tidak ada"}
                                </Typography>
                            </div>
                        </div>
                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Jenis Inovasi </Typography>
                            </div>
                            <div>:</div>
                            <div>
                                <Typography>
                                    {Jenis_inovasi ? Jenis_inovasi : "Tidak ada"}
                                </Typography>
                            </div>
                        </div>

                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Covid19 </Typography>
                            </div>
                            <div>:</div>
                            <div>
                                <Typography>
                                    {Covid19 ? Covid19 : "Tidak ada"}
                                </Typography>
                            </div>
                        </div>

                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Waktu uji coba </Typography>
                            </div>
                            <div>:</div>
                            <div>
                                <Typography>
                                    {Waktu_uji_coba ? convertDateDBtoIndo(Waktu_uji_coba) : "Tidak ada"}
                                </Typography>
                            </div>
                        </div>

                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Waktu Implementasi</Typography>
                            </div>
                            <div>:</div>
                            <div>
                                <Typography>
                                    {Waktu_implementasi ? convertDateDBtoIndo(Waktu_implementasi) : "Tidak ada"}
                                </Typography>
                            </div>
                        </div>

                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Urusan Inovasi </Typography>
                            </div>
                            <div>:</div>
                            <div>
                                <Typography>
                                    {Urusan_inovasi ? Urusan_inovasi : "Tidak ada"}
                                </Typography>
                            </div>
                        </div>
                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Nama OPD </Typography>
                            </div>
                            <div>:</div>
                            <div>
                                <Typography>
                                    {Nama_opd}
                                </Typography>
                            </div>
                        </div>

                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Rancang Bangun Inovasi </Typography>
                            </div>
                            <div>:</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: Rancang_bangun_pokok_inovasi
                                }}>
                            </div>
                        </div>

                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Tujuan Inovasi </Typography>
                            </div>
                            <div>:</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: Tujuan_inovasi
                                }}>
                            </div>
                        </div>
                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Hasil Inovasi </Typography>
                            </div>
                            <div>:</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: Hasil_inovasi
                                }}>
                            </div>
                        </div>
                        <div className="hasil-inovasi">
                            <div className="label-inovasi">
                                <Typography>Manfaat Inovasi </Typography>
                            </div>
                            <div>:</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: Manfaat_inovasi ? Manfaat_inovasi : "Tidak ada"
                                }}>
                            </div>
                        </div>
                      
                   
                    </>

                </div></>}
               
            </div>

        </>
    );
}


