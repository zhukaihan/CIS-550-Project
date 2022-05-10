import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
require('dotenv').config()

const Auth0ProviderHist = ({children}) => {
    const history = useHistory();
    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
      };

    return <Auth0Provider
            domain={process.env.REACT_APP_auth0_domain}
            clientId={process.env.REACT_APP_auth0_cid}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
}
export default Auth0ProviderHist;
