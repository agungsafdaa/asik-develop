import React from "react";
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Sidebar from '../components/Dashboard/Navbar'
import Indikator from '../components/Dashboard/Page/Indikator'


export default function TambahIndikator(props) {
    const drawerWidth = 240;
    return (
        <>
            <div className="dashboard">
                <Grid container>
                    <Sidebar/>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                    >
                        <Toolbar />
                        <div className="content-dashboard">
                          <Indikator/> 
                        </div>
                    </Box>
                </Grid>
            </div>
        </>
    );
}


