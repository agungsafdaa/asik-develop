import React, { useState, useEffect } from 'react';

import { CircularProgress, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'
import Breadcumbs from "../components/Sections/Breadcumbs";
function convertDateDBtoIndo(string) {
    const bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const tanggal = string.split("-")[2];
    const bulan = string.split("-")[1];
    const tahun = string.split("-")[0];

    return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
}

export default function Detailpaparan() {
    const location = useLocation();
    console.log(location)
    // const { Nama_inovasi, Hasil_inovasi, Bentuk_inovasi, Tujuan_inovasi, Waktu_implementasi, Waktu_uji_coba,
    //     Inisiator_inovasi, Jenis_inovasi, Jejaring_inovasi, Jumlah_kajian_yang_mendukung_inovasi, Jumlah_peningkatan_PAD,
    //     Jumlah_peningkatan_investasi, Jumlah_peningkatan_perkapita, Kecepatan_inovasi, Kemanfaatan_inovasi, Kemudahan_informasi_layanan,
    //     Kemudahan_proses_inovasi_yang_dihasilkan, Keterlibatan_aktor_inovasi, Ketersediaan_SDM_inovasi_daerah, Kualitas_inovasi_daerah,
    //     Kualitas_peningkatan_perizinan, Monitoring_dan_evaluasi_daerah, Nama_opd, Nilai_Capaian_LAKIP, Nilai_IPM, Online_sistem, Opini_BPK,
    //     Pedoman_teknis_inovasi, Pelaksana_inovasi_daerah, Penggunaan_IT, Penghargaan_bagi_inovator, Penurunan_angka_kemiskinan, Penyelesaian_layanan_pengaduan,
    //     Program_Inovasi_perangkat_RKPD, Rancang_bangun_pokok_inovasi, Regulasi_Inovasi_daerah, Repikasi, Roadmap_SIDa, Sosialisasi_inovasi_daerah, Tahapan_inovasi,
    //     Tingkat_lembaga_kelitbangan, Tingkat_pengangguran_terbuka, Urusan_inovasi, Visi_dan_misi_Pemda, Manfaat_inovasi,
    //     Apbd_tepat_waktu, Bimtek_inovasi, Covid19, Dukungan_anggaran } = location.state.detailInovasi.attributes

    return (
        <>



            <Breadcumbs />

            <div className="container">
                <div className="detail-inovasi">
                    <div className="judul-inovasi">
                        <h2>
                         
                        </h2>
                    </div>
                    <div className="tanggal-pelaksanaan">

                    </div>
                   
                    <iframe src={'https://view.officeapps.live.com/op/embed.aspx?src=https://asik.palembang.go.id' + location.state.detailPaparan.ppt_file.data.attributes.url} width='100%' height='600px' frameborder='0'/>

                </div>
            </div>

        </>
    );
}


