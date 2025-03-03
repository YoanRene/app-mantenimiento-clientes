// src/components/layout/Navbar.tsx
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar: React.FC = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const username = localStorage.getItem('username');
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('rememberedUsername');
        window.location.href = '/login';
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                I want to grow with Innovasoft
            </Typography>
            <Divider />
            <List>
                <ListItem key="home" disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="clients" disablePadding>
                    <ListItemButton component={Link} to="/clients">
                        <ListItemText primary="Clients" />
                    </ListItemButton>
                </ListItem>
                {isAuthenticated ? (
                    <ListItem key="logout" disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                ) : (
                    <>
                        <ListItem key="login" disablePadding>
                            <ListItemButton component={Link} to="/login">
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="register" disablePadding>
                            <ListItemButton component={Link} to="/register">
                                <ListItemText primary="Register" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
            {isAuthenticated && (
                <>
                    <Divider />
                    <Typography variant="body1" sx={{ p: 2 }}>
                        Logged in as: {username}
                    </Typography>
                </>
            )}
        </Box>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Title (aligned to the left) */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                    I want to grow with Innovasoft
                </Typography>

                {/* Desktop Menu (Hidden on mobile, aligned to the left) */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/clients">Clients</Button>
                    {isAuthenticated ? (
                        <>
                            <Typography variant="body1" color="inherit" sx={{ ml: 2, mr: 2 }}>
                                {username}
                            </Typography>
                            <IconButton color="inherit" onClick={handleLogout}>
                                <LogoutIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>
                    )}
                </Box>

                {/* Hamburger Menu Icon (for mobile, aligned to the right) */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{ ml: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;