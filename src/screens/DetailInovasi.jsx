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

export default function SelayangPandang() {
    const location = useLocation();
  
    const { Nama_inovasi, Hasil_inovasi, Bentuk_inovasi, Tujuan_inovasi, Waktu_implementasi, Waktu_uji_coba,
        Inisiator_inovasi, Jenis_inovasi, Jejaring_inovasi, Jumlah_kajian_yang_mendukung_inovasi, Jumlah_peningkatan_PAD,
        Jumlah_peningkatan_investasi, Jumlah_peningkatan_perkapita, Kecepatan_inovasi, Kemanfaatan_inovasi, Kemudahan_informasi_layanan,
        Kualitas_inovasi_daerah,
        Kemudahan_proses_inovasi_yang_dihasilkan, Keterlibatan_aktor_inovasi, Ketersediaan_SDM_inovasi_daerah, 
        Kualitas_peningkatan_perizinan, Monitoring_dan_evaluasi_daerah, Nama_opd, Nilai_Capaian_LAKIP, Nilai_IPM, Online_sistem, Opini_BPK,
        Pedoman_teknis_inovasi, Pelaksana_inovasi_daerah, Penggunaan_IT, Penghargaan_bagi_inovator, Penurunan_angka_kemiskinan, Penyelesaian_layanan_pengaduan,
        Program_Inovasi_perangkat_RKPD, Rancang_bangun_pokok_inovasi, Regulasi_Inovasi_daerah, Repikasi, Roadmap_SIDa, Sosialisasi_inovasi_daerah, Tahapan_inovasi,
        Tingkat_lembaga_kelitbangan, Tingkat_pengangguran_terbuka, Urusan_inovasi, Visi_dan_misi_Pemda, Manfaat_inovasi,
        Apbd_tepat_waktu, Bimtek_inovasi, Covid19, Dukungan_anggaran } = location.state.detailInovasi.attributes

    return (
        <>



            <Breadcumbs />

            <div className="container">
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
                                    {Inisiator_inovasi}
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
                                    {Jenis_inovasi}
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
                                    {Covid19}
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
                                    {convertDateDBtoIndo(Waktu_uji_coba)}
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
                                    {convertDateDBtoIndo(Waktu_implementasi)}
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
                                    {Urusan_inovasi}
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
                                    __html: Manfaat_inovasi
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
                                    __html: Manfaat_inovasi
                                }}>
                            </div>
                        </div>
                        <div className="lampiran">
                            <h3>
                                Lampiran Kelengkapan Data
                            </h3>
                            <div className="lampiran-file">
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Visi & Misi </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Visi_dan_misi_Pemda.data !== null ? <a type="button" href={Visi_dan_misi_Pemda.data !== null ? Visi_dan_misi_Pemda.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                        
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Tingkat lembaga kelitbangan </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Tingkat_lembaga_kelitbangan.data !== null ? <a type="button" href={Tingkat_lembaga_kelitbangan.data !== null ? Tingkat_lembaga_kelitbangan.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                        
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>APBD Tepat Waktu</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Apbd_tepat_waktu.data !== null ?  <a type="button" href={Apbd_tepat_waktu.data !== null ? Apbd_tepat_waktu.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                       
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Jumlah peningkatan perkapita</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Jumlah_peningkatan_perkapita.data !== null ?    <a type="button" href={Jumlah_peningkatan_perkapita.data !== null ? Jumlah_peningkatan_perkapita.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                     
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Tingkat pengangguran terbuka </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Tingkat_pengangguran_terbuka.data !== null ?    <a type="button" href={Tingkat_pengangguran_terbuka.data !== null ? Tingkat_pengangguran_terbuka.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                     
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Jumlah peningkatan PAD </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Jumlah_peningkatan_PAD.data !== null ?    <a type="button" href={Jumlah_peningkatan_PAD.data !== null ? Jumlah_peningkatan_PAD.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                     
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Opini BPK </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Opini_BPK.data !== null ?   <a type="button" href={Opini_BPK.data !== null ? Opini_BPK.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                      
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Nilai Capaian LAKIP</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Nilai_Capaian_LAKIP.data !== null ?  <a type="button" href={Nilai_Capaian_LAKIP.data !== null ? Nilai_Capaian_LAKIP.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                       
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Penurunan angka kemiskinan </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Penurunan_angka_kemiskinan.data !== null ? <a type="button" href={Penurunan_angka_kemiskinan.data !== null ? Penurunan_angka_kemiskinan.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                        
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Nilai IPM </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Nilai_IPM.data !== null ?  <a type="button" href={Nilai_IPM.data !== null ? Nilai_IPM.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada "}
                                       
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Penghargaan bagi inovator </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Penghargaan_bagi_inovator.data !== null ?  <a type="button" href={Penghargaan_bagi_inovator.data !== null ? Penghargaan_bagi_inovator.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada data"}
                                       
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Regulasi Inovasi daerah </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Regulasi_Inovasi_daerah.data !== null ?    <a type="button" href={Regulasi_Inovasi_daerah.data !== null ? Regulasi_Inovasi_daerah.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "TRidak ada"}
                                      
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Ketersediaan SDM inovasi daerah</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Ketersediaan_SDM_inovasi_daerah.data !== null ?  <a type="button" href={Ketersediaan_SDM_inovasi_daerah.data !== null ? Ketersediaan_SDM_inovasi_daerah.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                       
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Jumlah kajian yang mendukung inovasi</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Jumlah_kajian_yang_mendukung_inovasi.data !== null ?  <a type="button" href={Jumlah_kajian_yang_mendukung_inovasi.data !== null ? Jumlah_kajian_yang_mendukung_inovasi.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                       
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Roadmap_SIDa</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Roadmap_SIDa.data !== null ?     <a type="button" href={Roadmap_SIDa.data !== null ? Roadmap_SIDa.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                    
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Dukungan anggaran </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Dukungan_anggaran.data !== null ? <a type="button" href={Dukungan_anggaran.data !== null ? Dukungan_anggaran.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                        
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Penggunaan IT</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Penggunaan_IT.data !== null ?    <a type="button" href={Penggunaan_IT.data !== null ? Penggunaan_IT.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                     
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Bimtek inovasi </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Bimtek_inovasi.data !== null ?    <a type="button" href={Bimtek_inovasi.data !== null ? Bimtek_inovasi.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                     
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Program Inovasi perangkat RKPD</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Program_Inovasi_perangkat_RKPD.data !== null ?     <a type="button" href={Program_Inovasi_perangkat_RKPD.data !== null ? Program_Inovasi_perangkat_RKPD.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                    
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Keterlibatan aktor inovasi </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Keterlibatan_aktor_inovasi.data !== null ?   <a type="button" href={Keterlibatan_aktor_inovasi.data !== null ? Keterlibatan_aktor_inovasi.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                       
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Pelaksana inovasi daerah</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Pelaksana_inovasi_daerah.data !== null ?   <a type="button" href={Pelaksana_inovasi_daerah.data !== null ? Pelaksana_inovasi_daerah.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                      
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Jejaring inovasi </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Jejaring_inovasi.data !== null ?  <a type="button" href={Jejaring_inovasi.data !== null ? Jejaring_inovasi.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                       
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Sosialisasi inovasi daerah</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Sosialisasi_inovasi_daerah.data !== null ?  <a type="button" href={Sosialisasi_inovasi_daerah.data !== null ? Sosialisasi_inovasi_daerah.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                       
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Pedoman teknis inovasi </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Pedoman_teknis_inovasi.data !== null ?  <a type="button" href={Pedoman_teknis_inovasi.data !== null ? Pedoman_teknis_inovasi.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                       
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Kemudahan informasi layanan </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Kemudahan_informasi_layanan.data !== null ?    <a type="button" href={Kemudahan_informasi_layanan.data !== null ? Kemudahan_informasi_layanan.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a>: "Tidak ada"}
                                      
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Kemudahan proses inovasi yang dihasilkan</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Kemudahan_proses_inovasi_yang_dihasilkan.data !== null ? <a type="button" href={Kemudahan_proses_inovasi_yang_dihasilkan.data !== null ? Kemudahan_proses_inovasi_yang_dihasilkan.data.attributes.url : "Tidak ada"} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                        
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Penyelesaian layanan pengaduan</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Penyelesaian_layanan_pengaduan.data !== null  ?      <a type="button" href={Penyelesaian_layanan_pengaduan.data !== null ? Penyelesaian_layanan_pengaduan.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada "}
                                   
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Online sistem</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Online_sistem.data !== null ?   <a type="button" href={Online_sistem.data !== null ? Online_sistem.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                      
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Repikasi</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Repikasi.data !== null ?  <a type="button" href={Repikasi.data !== null ? Repikasi.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada"}
                                       
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Kecepatan_inovasi </Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Kecepatan_inovasi.data !== null ?   <a type="button" href={Kecepatan_inovasi.data !== null ? Kecepatan_inovasi.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada data"}
                                      
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Kemanfaatan inovasi</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Kemanfaatan_inovasi.data !== null ? <a type="button" href={Kemanfaatan_inovasi.data !== null ? Kemanfaatan_inovasi.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada data"}
                                        
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Monitoring dan evaluasi daerah</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Monitoring_dan_evaluasi_daerah.data !== null ? <a type="button" href={Monitoring_dan_evaluasi_daerah.data !== null ? Monitoring_dan_evaluasi_daerah.data.attributes.url : ""} className="see-all-button see-file" target="_blank" rel="noreferrer">
                                            Lihat File
                                        </a> : "Tidak ada data"}
                                   
                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hasil-inovasi">
                                    <div className="label-inovasi">
                                        <Typography>Kualitas inovasi daerah</Typography>

                                    </div>
                                    <div>:</div>
                                    <div>
                                        {Kualitas_inovasi_daerah !== null ? <iframe width="250" height="215" src={"https://www.youtube.com/embed/" + Kualitas_inovasi_daerah} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> :  <h3 className="text-center">  Tidak ada file </h3> }

                                        <div className="label">
                                            <Typography>Regulasi/kebijakan yang ditetapkan untuk mendukung Inovasi Daerah</Typography>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>

                </div>
            </div>

        </>
    );
}


