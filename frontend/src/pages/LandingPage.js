import 'antd/dist/antd.css';
import React from 'react';
import LoginForm from './LoginForm';




function Landing() {

    return (
        <div>
            <div style={{ width: "25vw", margin: "0 auto", marginTop: "10vh", marginRight: '5vw', float: 'right' }}>
                <LoginForm />
            </div>

        </div>
    );
}

export default Landing;
