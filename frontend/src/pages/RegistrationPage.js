import 'antd/dist/antd.css';
import React from 'react';
// import OuterNavBar from './OuterNavBar';
import RegistrationForm from './RegistrationForm';



function Register() {

    return (
        <div>
            <div style={{ width: "50vw", margin: "0 auto", marginTop: "10vh" }}>
                <RegistrationForm />
            </div>
        </div>
    );
}

export default Register;
