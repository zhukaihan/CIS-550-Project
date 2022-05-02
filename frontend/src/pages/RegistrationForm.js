import { message, Steps, Typography } from 'antd';
import React, { useState } from 'react';
import { Button, Form, FormGroup, FormInput } from "shards-react";
import { registerUser} from '../fetcher';
const { Title } = Typography;
const { Step } = Steps;



function RegistrationForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [code, setCode] = useState('')
    const [current, setCurrent] = React.useState(0);

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }



    const submit = async () => {
        console.log(`creating new user with ${email}, ${username}, ${password}`)
        registerUser(username, email, password).then((res) => {
            console.log(res)
            if (res.err) {
                message.error(res.err.message)
            } else if (res.message) {
                message.success('Success! redirecting to login ', 2, function () { window.location = '/' })

            }
        })

    }

    const steps = [
        {
            title: 'Fill Details',
            content: <Form style={{ marginTop: '2vh', marginBottom: '2vh' }}>
                <Title level={3}>Enter User Details</Title>
                <FormGroup>
                    <label>Username</label>
                    <FormInput id='usernameInput' value={username} onChange={handleUsernameChange} placeholder="Username" />
                </FormGroup>
                <FormGroup>
                    <label>Email</label>
                    <FormInput id='emailInput'value={email} onChange={handleEmailChange} placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <label>Password</label>
                    <FormInput id='pwInput' type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                </FormGroup>
            </Form>
        },
    ];


    return (
        <div >
            <Title level={2}>Register</Title>

            <Form style={{ marginTop: '2vh', marginBottom: '2vh' }}>
                <Title level={3}>Enter User Details</Title>
                <FormGroup>
                    <label>Username</label>
                    <FormInput id='usernameInput' value={username} onChange={handleUsernameChange} placeholder="Username" />
                </FormGroup>
                <FormGroup>
                    <label>Email</label>
                    <FormInput id='emailInput'value={email} onChange={handleEmailChange} placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <label>Password</label>
                    <FormInput id='pwInput' type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                </FormGroup>
            </Form>
            <div style={{ marginBottom: '5vh' }} className="steps-action">
                <Button id='registerBtn' style={{ float: 'right' }} type="primary" onClick={() => submit()}>
                    Done
                </Button>
            </div>
            <br></br>
            <hr></hr>
            <FormGroup>
                <label>Already have an account?</label>
                <a href='/'> Sign in</a>
            </FormGroup>
            <FormGroup>
                <label>Forgot Password?</label>
                <a href='/resetpassword'> Reset</a>
            </FormGroup>

        </div>
    );
}

export default RegistrationForm