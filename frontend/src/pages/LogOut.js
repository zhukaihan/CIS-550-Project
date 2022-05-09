import {useAuth0} from '@auth0/auth0-react';

function LogOut() {
  const {logout} = useAuth0()
  if (sessionStorage['email']) {
    sessionStorage.clear();
    window.location.href = "/";
  } else {
    logout();
  }
}

export default LogOut