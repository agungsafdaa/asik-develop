import React from "react";
import styled from "styled-components";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Contact() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
    <Wrapper>
      <div className="footer-bg">
        <div className="container">
          <div className="footer-section">
            <Grid container spacing={2}>
              <Grid item lg={3} xs={12} md={12}>
                <div className="heading-footer">
                  <h5>Jumlah Pengunjung</h5>
                </div>
                <div className="content-footer">
                  <ul>
                    <li>
                      Total: 903 pengunjung (4.301 hit)</li>
                    <li>
                      Hari ini: 7 pengunjung (59 hit)</li>
                    <li>
                      Kemarin: 11 pengunjung (76 hit)
                    </li>
                    <li>
                      Minggu ini: 18 pengunjung (135 hit)
                    </li>
                    <li>
                      Bulan ini: 35 pengunjung (285 hit)</li>
                  </ul>
                </div>
              </Grid>
              <Grid item lg={3} xs={12} md={12}>
                <div className="heading-footer">
                  <h5>Link Terkait</h5>
                </div>
                <div className="content-footer">
                  <ul>
                    <li>
                      Pemerintah Kota Palembang



                    </li>
                    <li>
                      Balitbangda Provinsi Sumatera Selatan</li>
                    <li>
                      Bappeda Litbang Kota Palembang
                    </li>
                    <li>
                      Geoportal Kota Palembang
                    </li>

                  </ul>
                </div>
              </Grid>
              <Grid item lg={3} xs={12} md={12}>
                <div className="heading-footer">
                  <h5>Link Nasional</h5>
                </div>
                <div className="content-footer">
                  <ul>
                    <li>
                      Kementerian Riset dan Teknologi Republik Indonesia

                    </li>
                    <li>
                      Dewan Riset Nasional</li>

                  </ul>
                </div>
              </Grid>
              <Grid item lg={3} xs={12} md={12}>
                <div className="heading-footer">
                  <h5>Kelitbangan Kota Palembang
                  </h5>
                </div>
                <div className="content-footer">
                  <ul>
                    <li>
                      Inovasi Daerah
                    </li>
                    <li>
                      Kajian</li>
                    <li>
                      Regulasi
                    </li>
                    <li>
                      Program Kerja
                    </li>
                  </ul>
                </div>
              </Grid>

              <Grid item lg={3} xs={12} md={12}>
                <div className="heading-footer">
                  <h5>Kelitbangan Kota Palembang
                  </h5>
                </div>
                <div className="content-footer">
                  <ul>
                    <li>
                      Inovasi Daerah
                    </li>
                    <li>
                      Kajian</li>
                    <li>
                      Regulasi
                    </li>
                    <li>
                      Program Kerja
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item lg={9} xs={12} md={12}>
              <div className="copyright">
                 <div className="bappeda-litbang-copyright">
                  <Typography>
                    Bappeda Litbang Kota Palembang     © {getCurrentYear()}
                  </Typography>
                  <Typography>
                    Jl. Merdeka No.74, 22 Ilir, Kota Palembang
                  </Typography>
                  <Typography>
                    Sumatera Selatan 30131
                  </Typography>
                  <Typography>
                  0711-353522
                  </Typography>
                </div>
            </div>
              </Grid>
            </Grid>
         
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
