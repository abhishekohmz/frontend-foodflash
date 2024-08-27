import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { serverUrl } from '../service/serverUrl';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
} from 'mdb-react-ui-kit';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function LoginSignup() {
    const [topRightModal, setTopRightModal] = useState(false);
    const toggleOpen = () => setTopRightModal(!topRightModal);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        mobile: ""
    });

    const handleInput = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    console.log(formData);

    const signup = async (e) => {
        e.preventDefault();
        console.log('sign up function executed');

        try {
            const response = await fetch(`${serverUrl}/signup`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const responseData = await response.json();

            if (responseData.success) {
                window.location.replace('/customer/account/login');
            } else {
                alert(responseData.errors);
            }
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed, fill the all fields and try again');
        }
    };

    const login = async (e) => {
        e.preventDefault(); 
        console.log('login function executed');

        let responseData;
        await fetch(`${serverUrl}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((resp) => resp.json())
        .then((data) => responseData = data);

        if (responseData.success) {
            sessionStorage.setItem('auth-token', responseData.token);
            sessionStorage.setItem('user-details', JSON.stringify(responseData.user));
            window.location.replace('/');
        } else {
            alert(responseData.errors);
        }
    };

    return (
        <div>
            <Container className='signup-login'>
                <h1>Login or Create an Account</h1>
                <Row>
                    <Col md={6}>
                        <div className="signup">
                            <h5>NEW USER</h5>
                            <hr />
                            <p>By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</p>
                            <button className='signup-btn' onClick={toggleOpen}>Create an Account</button>

                            <div>
                                <MDBModal
                                    animationDirection='top'
                                    open={topRightModal}
                                    staticBackdrop
                                    tabIndex='-1'
                                    onClose={() => setTopRightModal(false)}
                                >
                                    <MDBModalDialog side='true'>
                                        <MDBModalContent>
                                            <MDBModalHeader>
                                                <h4>Registration</h4>
                                                <button
                                                    className='btn-close'
                                                    onClick={toggleOpen}
                                                ></button>
                                            </MDBModalHeader>
                                            <MDBModalBody>
                                                <form className="form" onSubmit={signup}>
                                                    <input
                                                        onChange={handleInput}
                                                        name="first_name"
                                                        value={formData.first_name}
                                                        className="signup-itemfield-firstname"
                                                        type="text"
                                                        placeholder='First Name'
                                                        id="first_name"
                                                    />
                                                    <input
                                                        onChange={handleInput}
                                                        name="last_name"
                                                        value={formData.last_name}
                                                        className="signup-itemfield-lastname"
                                                        type="text"
                                                        placeholder='Last Name'
                                                        id="last_name"
                                                    />
                                                    <input
                                                        onChange={handleInput}
                                                        name="email"
                                                        value={formData.email}
                                                        className="signup-itemfield-email"
                                                        type="email"
                                                        placeholder='E-mail address'
                                                        id="email"
                                                    />
                                                    <div className="signup-itemfield-mobile">
                                                        <p>+91</p>
                                                        <input
                                                            onChange={handleInput}
                                                            name='mobile'
                                                            value={formData.mobile}
                                                            type="tel"
                                                            maxLength="10"
                                                        />
                                                    </div>
                                                    <input
                                                        onChange={handleInput}
                                                        name='password'
                                                        value={formData.password}
                                                        className="signup-itemfield-password"
                                                        type="password"
                                                        placeholder='Password'
                                                        autoComplete="current-password"
                                                    />
                                                    <div>
                                                        <div>
                                                            <p><span>*</span> By clicking the Register button you are accepting the <br />Terms and Conditions of Freshtohome</p>
                                                        </div>
                                                    </div>
                                                    <div className='register-btn'>
                                                        <button type="submit">Register</button>
                                                    </div>
                                                </form>
                                            </MDBModalBody>
                                        </MDBModalContent>
                                    </MDBModalDialog>
                                </MDBModal>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="login">
                            <h5>REGISTERED USER</h5>
                            <hr />
                            <p>If you have an account with us, please login</p>
                            <form className='form' onSubmit={login}>
                                <div className="login-inputfield">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        onChange={handleInput}
                                        value={formData.email}
                                        className='form-control'
                                        type="email"
                                        required
                                        name='email'
                                        id='email'
                                    />
                                </div>
                                <div className="login-inputfield">
                                    <label htmlFor="password">Password *</label>
                                    <input
                                        onChange={handleInput}
                                        value={formData.password}
                                        className='form-control'
                                        autoComplete='password'
                                        type="password"
                                        required
                                        name='password'
                                        id='password'
                                    />
                                </div>
                                <div className="login-inputfield">
                                    <p>By clicking the login button you are accepting the terms and conditions of freshtohome.com</p>
                                </div>
                                <div>
                                    <button type="submit">Login</button>
                                </div>
                            </form>
                            <Link style={{ textDecoration: "none" }}>Forgot Your Password?</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LoginSignup;
