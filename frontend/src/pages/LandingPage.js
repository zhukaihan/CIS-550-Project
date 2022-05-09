import 'antd/dist/antd.css';
import React from 'react';
import LoginForm from './LoginForm';
import {useAuth0} from '@auth0/auth0-react';


function Landing() {
    const {isAuthenticated} = useAuth0()
    console.log(`email is ${sessionStorage['email']}, auth is ${isAuthenticated}`)
    if (sessionStorage['email'] || isAuthenticated) {
        window.location.href = '/prices'
    } else {
        return (
            <div>
                <div style={{ width: "25vw", margin: "0 auto", marginTop: "10vh", marginRight: '5vw', float: 'right' }}>
                    <LoginForm />
                </div>
    
            </div>
        );
    }
}

export default Landing;
