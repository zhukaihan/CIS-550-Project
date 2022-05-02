import { message, Typography } from 'antd';
import React, { useState } from 'react';
import { Button, Form, FormGroup, FormInput } from "shards-react";
import { loginUser } from '../fetcher';
const { Title } = Typography;


function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [wrongPassword, setWrongPassword] = useState(0);
    //const [isLocked, setLocked] = useState(false);
    const [blockedUsers, setBlockedUsers] = useState([]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const submit = () => {
        //event.preventDefault();
        console.log(email, password);
         loginUser(email, password).then((res) => {
            console.log(res);
            if (res.loggedIn) {
                message.success('Logged in successfully!', 2,
                () => window.location.assign(`/profile`))
                .then(
                    console.log(`email: ${email}`),
                    sessionStorage.setItem('email',email)
                )
                .then(
                    sessionStorage.setItem('password',password)
                )
            } else {
                message.error('Invalid username and/or password');
            }
        })
    }


    return (
        <div >
            <Title level={2}>Sign In</Title>

            <Form>
                <FormGroup>
                    <label>Email</label>
                    <FormInput id='emailInput' value={email} onChange={handleEmailChange} placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <label>Password</label>
                    <FormInput id='pwInput' type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                </FormGroup>
                <Button id='loginSubmit' onClick={submit}>Submit</Button>
            </Form>
            <hr></hr>
            <FormGroup>
                <label>Don't have an account?</label>
                <a href='/registration'> Create one!</a>
            </FormGroup>
            <FormGroup>
                <label>Forgot Password?</label>
                <a href='/resetpassword'> Reset</a>
            </FormGroup>

        </div>
    );
}

export default LoginForm