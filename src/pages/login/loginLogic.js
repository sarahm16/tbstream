import * as msal from "@azure/msal-browser";
import { useNavigate } from "react-router-dom";

function LoginLogic() {
    const navigate = useNavigate();

    const msalConfig = {
        auth: {
            clientId: process.env.REACT_APP_MSAL_CLIENTID
            //clientId: process.env.REACT_APP_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID
        }
    };
    
    const msalInstance = new msal.PublicClientApplication(msalConfig);

    async function msalLogin() {
        try {
            // need to get users role and which location they're logging in from
            const loginResponse = await msalInstance.loginPopup({}); 
            console.log(loginResponse);

            localStorage.setItem('account', JSON.stringify(loginResponse.account));
            localStorage.setItem('access token', loginResponse.accessToken);
            localStorage.setItem('email', loginResponse.account.username);
            localStorage.setItem('userName', loginResponse.account.name)

            navigate('/thumbnails');
            
        } catch (err) {
            alert('Incorrect login, please try again')
        }
    }

    return {
        msalLogin
    }

}

export default LoginLogic;