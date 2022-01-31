import React from "react";
import styled from "styled-components";
// Components
import Typography from "@mui/material/Typography";


export default function Header(props) {
    console.log(props)
    return (
        <>
            <Wrapper className="hero-element-media">
            </Wrapper>
            <div className="container">
                <div className="tentang-lembaga">
                    <h3>
                        Judul
                    </h3>
                    <Typography>

                        Berdasarkan Peraturan Walikota Palembang Nomor 2 Tahun 2020 Tentang Kedudukan, Susunan Organisasi, Tugas dan Fungsi Serta Tata Kerja Badan Perencanaan Pembangunan Daerah, Penelitian, dan Pengembangan Kota Palembang Bagian Keempat Bidang Penelitian dan Pengembangan Pasal 10 :</Typography>
                    <br />
                    <Typography>
                        Bidang Penelitian dan Pengembangan, mempunyai tugas melaksanakan penelitian dan pengembangan di bidang penyelenggaraan urusan pemerintahan yang menjadi kewenangan pemerintah kota sesuai dengan ketentuan peraturan perundang-undangan.
                        Bidang Penelitian dan Pengembangan, mempunyai fungsi:

                    </Typography>
                    <div className="tugas">
                    <ol className="list-alfabet">
                                <li>
                                    penyusunan kebijakan teknis penelitian dan pengembangan pemerintah kota;    </li>
                                <li>
                                    penyusunan perencanaan program dan anggaran penelitian dan pengembangan pemerintah kota;    </li>
                                <li>
                                    pelaksanaan penelitian dan pengembangan di pemerintah kota;     </li>
                                <li>
                                    pelaksanaan pengkajian kebijakan lingkup urusan pemerintah kota;
                                </li>
                                <li>
                                    fasilitasi dan pelaksanaan inovasi daerah;
                                </li>
                                <li>
                                    pemantuan, evaluasi dan pelaporan atas pelaksanaan penelitian dan pengembangan di kota;
                                </li>
                                <li>
                                    koordinasi dan sinkronsasi pelaksanaan penelitian dan pengembangan lingkup pemerintah kota;
                                </li>
                                <li>
                                    H.pelaksanaan administrasi penelitian dan pengembangan kota; dan
                                </li>
                                <li>
                                    pelaksanaan tugas lain yang diberikan oleh kepala Badan.
                                </li>
                            </ol>
                    </div>
                </div>
            </div>

        </>
    );
}


const Wrapper = styled.section`
 
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;







