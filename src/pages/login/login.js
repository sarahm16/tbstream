import React from 'react';
import './login.css';
import LoginLogic from './loginLogic';
// import logoSmall from '../../images/logoSmall.png';
import { Button, Divider } from '@mui/material';

const Login = () => {
    const { msalLogin } = LoginLogic();

    return(
        <div className='login-bg'>
            <div className='login-wrapper centered-component'>
                {/* <img src={logoSmall} alt='Transblue Logo' /> */}
                <h3 className='text-center'>5 Minute Friday</h3>
                <Divider sx={{my: '16px'}} />
                <p className='text-muted'>Press the login button below to log in to your Microsoft account</p>
                <Divider sx={{my: '16px'}} />
                <Button
                    onClick={msalLogin}
                    variant='contained'
                    fullWidth
                >
                    login
                </Button>
            </div>
        </div>
    )
}

export default Login;