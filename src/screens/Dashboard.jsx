import React from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom'
import DashboardNavbar from '../components/Dashboard/Navbar'
import Home from '../components/Dashboard/Page/home'
import AddInovasi from '../components/Dashboard/Page/addInovasi'
import EditInovasi from '../components/Dashboard/Page/editInovasi'
export default function Dashboard() {
    const location = useLocation();

    return (
        <>
            <div className="dashboard">
                <Grid container>

                    <Grid item lg={2}>

                        <nav className="dashboard-menu" aria-label="main mailbox folders">
                            <div className="logo">
                                <img src="/assets/images/palembang.png" alt="Pemkot Palembang" />
                                <h6>Asik Bapeda Palembang</h6>
                            </div>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Dashboard" />
                                    </ListItemButton>
                                </ListItem>

                            </List>
                        </nav>
                        <Divider />

                    </Grid>
                    <Grid item lg={10}>
                        <DashboardNavbar />

                       
                        <div className="content-dashboard">
                            {location.pathname === '/dashboard' ? <Home /> : location.pathname === '/editInovasi' ? <EditInovasi /> : location.pathname === '/tambahInovasi' ? <AddInovasi /> : ""}
                        </div>
                    </Grid>
                </Grid>



            </div>


        </>
    );
}


