import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom'
import { Helmet } from "react-helmet";
import Breadcumbs from "../components/Sections/Breadcumbs";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {

    FacebookShareButton,

    WhatsappShareButton,

} from "react-share";
function convertDateDBtoIndo(string) {
    const bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const tanggal = string.split("-")[2];
    const bulan = string.split("-")[1];
    const tahun = string.split("-")[0];

    return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
}

export default function DetailKajian() {

    const [loading, setLoading] = useState(false)
    const [berita, setBerita] = useState([])

    let { id } = useParams();


    const getBerita = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/kajians?filters[Judul][$contains]=" + id + "&populate=*"
            const response = await axios.get(url);
            if (response.status === 200) {

                setBerita(response.data.data)

                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }
    let { Judul, Tahun, Abstrak } = berita.length !== 0 ? berita[0].attributes : ""
    const thumbnail = berita.length !== 0 ? 'https://asik.palembang.go.id' + berita[0].attributes.Gambar.data.attributes.url : ""
    
    useEffect(() => {

        getBerita()



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>


            <Helmet>
                <title>{Judul}</title>
                <meta name="og:title" content={Judul} />

                <meta name="og:description" content={Abstrak} />
                <meta name="og:image" content={thumbnail} />
            </Helmet>

            <Breadcumbs />

            <div className="container">
                {loading === true ? <div className="loading-center"><CircularProgress/> </div> : <>
                    <div className="detail-berita">



                        <div className="judul-inovasi">
                            <h2>
                                {Judul}
                            </h2>
                        </div>

                        <img className="thumbnail-berita" src={thumbnail} loading="lazy" alt={Judul} />
                       
                        <div className="share-button">

                            <FacebookShareButton url={"https://asik-develop.vercel.app/detail-berita/" + id}>
                                <button className="btn btn-facebook"><FacebookIcon  /><span>Facebook</span></button>
                            </FacebookShareButton>
                         
                            <WhatsappShareButton url={"https://asik-develop.vercel.app/detail-berita/" + id}>
                            <button className="btn    btn-whatsaapp"><WhatsAppIcon  /><span>Whatsapp</span></button>   
                            </WhatsappShareButton>
                        </div>
                        <div className="tanggal-pelaksanaan">
                            <h4> Tahun {Tahun}</h4>

                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: Abstrak
                            }}></div>
                    </div>
                </> }

            </div>

        </>
    );
}


