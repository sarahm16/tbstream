import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { MenuItem, Menu, Button } from "@mui/material";

function PageLayout(props) {
    const [upload, setUpload] = useState(false);
    const { children }= props;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => setAnchorEl(null);

    let uploadEmails = ['carters@transblue.org', 'kaypet@transblue.org', 'jim.wescott@transblue.org'];

    useEffect(() => {
        let userEmail = localStorage.getItem('email');
        if(uploadEmails.indexOf(userEmail.toLowerCase()) > -1) {
            setUpload(true);
        }
    }, [])

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        5 Minute Friday
                    </Typography>

                    {upload && 
                        <Button
                            component='a'
                            href='/upload'
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            upload
                        </Button>
                    }
                    
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, p: 2, bgcolor: '#f5f5f5', minHeight: '100vh'}}>
                { children }
            </Box>
        </Box>
    )
}

export default PageLayout;