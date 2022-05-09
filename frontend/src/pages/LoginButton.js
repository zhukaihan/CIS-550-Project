import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Button} from 'react-bootstrap';

function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  //Returns a button that once clicked, redirects the user to an Auth0 Universal Log In Page
  return !(sessionStorage['email'] || isAuthenticated) && (
    <Button onClick={()=> loginWithRedirect()}>Log in 
    </Button>
  );
}
export default LoginButton;