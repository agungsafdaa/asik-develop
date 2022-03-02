import React from "react";
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom'
import DashboardNavbar from '../components/Dashboard/Navbar'
import Typography from '@mui/material/Typography';
import Home from '../components/Dashboard/Page/home'
import AddInovasi from '../components/Dashboard/Page/addInovasi'
import EditInovasi from '../components/Dashboard/Page/editInovasi'
export default function Dashboard(props) {
    const drawerWidth = 240;
    const location = useLocation();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const logout = () => {
        localStorage.removeItem("token");
        return navigate("/");
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className="dashboard-menu">
            <Toolbar />
            <div className="logo">
                                <img src="/assets/images/palembang.png" alt="Pemkot Palembang" />
                                <h6>Asik Bapeda Palembang</h6>
                            </div>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <InboxIcon style={{color:"#fff;"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </ListItem>
            <Divider />

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <>
            <div className="dashboard">
                <Grid container>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <AppBar
                            position="fixed"
                            className="dashboard-navbar"
                            sx={{
                                width: { sm: `calc(100% - ${drawerWidth}px)` },
                                ml: { sm: `${drawerWidth}px` },
                            }}
                        >
                            <Toolbar className="navbar"> 
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    sx={{ mr: 2, display: { sm: 'none' } }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" noWrap component="div">
                                    Responsive drawer
                                </Typography>

                                  <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Profile</Typography>

                                </MenuItem>
                                <MenuItem onClick={handleClickOpen}>
                                    <Typography textAlign="center">Logout</Typography>

                                </MenuItem>
                                {/* confirmation logout */}
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                      Konfirmasi
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                        Apakah anda yakin ingin keluar?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Batal</Button>
                                        <Button onClick={logout} autoFocus>
                                            Keluar
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                {/* end logout */}
                            </Menu>
                        </Box>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <Box
                        component="nav"
                        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                        aria-label="mailbox folders"
                    >
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}
                        >
                            {drawer}
                        </Drawer>
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Box>
                    {/* <Grid item lg={2}>

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

                    </Grid> */}
                    <Grid item lg={10} xs={12}>
       


                        <div className="content-dashboard">
                            {location.pathname === '/dashboard' ? <Home /> : location.pathname === '/editInovasi' ? <EditInovasi /> : location.pathname === '/tambahInovasi' ? <AddInovasi /> : ""}
                        </div>
                    </Grid>
                </Grid>



            </div>


        </>
    );
}


