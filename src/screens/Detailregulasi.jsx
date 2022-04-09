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

export default function DetailRegulasi() {

    const [loading, setLoading] = useState(false)
    const [berita, setBerita] = useState([])

    let { id } = useParams();
   
    const getBerita = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/regulasis?filters[judul_regulasi][$contains]=" + id + "&populate=*"
            const response = await axios.get(url);
            if (response.status === 200) {

                setBerita(response.data.data)

                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }
    let { judul_regulasi, tahun, abstrak } = berita.length !== 0 ? berita[0].attributes : ""
    const pdf = berita.length !== 0 ? 'https://asik.palembang.go.id' + berita[0].attributes.file_regulasi.data.attributes.url : ""

    useEffect(() => {

        getBerita()



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>


            <Helmet>
                <title>{judul_regulasi}</title>
                <meta name="og:title" content={judul_regulasi} />

                <meta name="og:description" content={judul_regulasi} />

            </Helmet>

            <Breadcumbs />

            <div className="container">
                {berita.length !== 0 ? loading === true ? <CircularProgress /> : <>
                    <div className="detail-berita">



                        <div className="judul-inovasi">
                            <h2>
                                {judul_regulasi}
                            </h2>
                        </div>


                        {/* <div className="tanggal-pelaksanaan">
                            <h4>  Di upload : {convertDateDBtoIndo(tanggal_berita)}</h4>

                        </div> */}
                        <div className="share-button">

                            <FacebookShareButton url={"https://asik-develop.vercel.app/detail-berita/" + id}>
                                <button className="btn btn-facebook"><FacebookIcon /><span>Facebook</span></button>
                            </FacebookShareButton>

                            <WhatsappShareButton url={"https://asik-develop.vercel.app/detail-berita/" + id}>
                                <button className="btn    btn-whatsaapp"><WhatsAppIcon /><span>Whatsapp</span></button>
                            </WhatsappShareButton>
                        </div>
                        <embed src={"https://drive.google.com/viewerng/viewer?embedded=true&url="+ pdf } width="1000" height="575"/>
                        <iframe src={pdf} title={judul_regulasi}/>
                        <iframe
          src='https://asik.palembang.go.id/uploads/11_f2270e63f6.pdf'
          width="500"
          height="678"          
        />
                        <a href={pdf}>download</a>
                  
                    </div>
                </> : ""}

            </div>

        </>
    );
}


