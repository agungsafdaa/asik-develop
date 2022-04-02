import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Breadcumbs from "../components/Sections/Breadcumbs";
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
  } from "react-share";
function convertDateDBtoIndo(string) {
    const bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const tanggal = string.split("-")[2];
    const bulan = string.split("-")[1];
    const tahun = string.split("-")[0];

    return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
}

export default function DetailBerita() {
    const location = useLocation();
    const [loading, setLoading] = useState(false)
    const [berita, setBerita] = useState([])
    const [share, setShare] = useState(false)
    let { id } = useParams();
    console.log(location.state, id, berita)

    const getBerita = async () => {
        setLoading(true)
        try {
            let url = "https://asik.palembang.go.id/api/beritas?filters[judul_berita][$contains]=" + id + "&populate=*"
            const response = await axios.get(url);
            if (response.status === 200) {

                setBerita(response.data.data)
                setShare(true)
                setLoading(false)
            }
        } catch (error) {
            throw error;
        }
    }
    let { judul_berita, tanggal_berita, isi_berita } = berita.length !== 0 ? berita[0].attributes : ""
    const thumbnail = berita.length !== 0 ? 'https://asik.palembang.go.id' + berita[0].attributes.gambar_berita.data[0].attributes.url : ""
    useEffect(() => {

        getBerita()



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>



            <Breadcumbs />

            <div className="container">
                {berita.length !== 0 ? loading === true ? <CircularProgress /> : <>
                    <div className="detail-berita">



                        <div className="judul-inovasi">
                            <h2>
                                {judul_berita}
                            </h2>
                        </div>

                        <img className="thumbnail-berita" src={thumbnail} loading="lazy" alt={judul_berita}/>
                        <div className="tanggal-pelaksanaan">
                            <h4>  Di upload : {convertDateDBtoIndo(tanggal_berita)}</h4>
                            <FacebookShareButton url={"https://asik-develop.vercel.app/detail-berita/Rapat%20Pematangan%20Sistem%20Informasi%20Kelitbangan%20(ASIK)%20Terkait%20Modul-Modul%20Yang%20Akan%20Dimasukkan%20Ke%20Dalam%20Pemeliharaan%20dan%20Peningkatan%20Website%20ASIK%20Melalui%20Zoom%20Meeting"}>Share</FacebookShareButton>
                        </div>
                        <div className="share-button">
                       
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: isi_berita
                            }}></div>
                    </div>
                </> : ""}

            </div>

        </>
    );
}


