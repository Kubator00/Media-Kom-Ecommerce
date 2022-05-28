import React, {useEffect} from 'react'
import {Link, Navigate, useLocation} from "react-router-dom";
import './LogIn.css'
import {useSelector, useDispatch} from "react-redux";
import logInUser from '../../services/LoginService'
import * as yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from "formik";

function LogIn() {
    let location = useLocation();
    const error = useSelector(state => state.userAuthenticationReducer.error);
    const inProgress = useSelector(state => state.userAuthenticationReducer.inprogress);
    const locationData = location?.state;
    const msg = locationData ? locationData.msg : '';

    const dispatch = useDispatch();
    const logInHandler = async (props) => {
        dispatch(logInUser(props));
    };

    if (localStorage.getItem('token'))
        return <Navigate to="/"/>;

    if (inProgress)
        return <div>Ładowanie...</div>;

    return (
        <div className={'login-container page-content'}>
            <div className="login-login-container">
                <div className="login-login-content">
                    <h1>Zaloguj się</h1>
                    {msg && <h4 style={{"color": "green"}}>{msg}</h4>}<br/>
                    {error && <h4 style={{"color": "red"}}>{error}</h4>}
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={(values) => {
                            logInHandler(values)
                        }}
                        validationSchema={validate}
                    >

                        <Form className="login-login-form">
                            <label htmlFor="email">Adres email</label>
                            <ErrorMessage name='email' component="div" className='login-errorMsg'/>
                            <Field name="email" className="login-login-form-control"/>
                            <label htmlFor="username">Hasło</label>
                            <ErrorMessage name='password' component="div" className='login-errorMsg'/>
                            <Field type="password" name="password" className="login-login-form-control"/>
                            <button type="submit" className="login-button">Zaloguj się</button>
                        </Form>
                    </Formik>
                </div>
            </div>
            <div className="login-register-container">
                <h1>Nie masz konta?</h1>
                <Link to="/register" className="login-button">
                    Zarejestruj się
                </Link>
            </div>
        </div>
    );


}

export default LogIn;

const validate = yup.object().shape({
    email: yup.string()
        .email('Email jest nieprawidłowy')
        .required('Pole jest wymagane'),
    password: yup.string()
        .min(3, 'Hasło musi posiadać co najmniej 3 znaki')
        .max(16, 'Hasło musi się składać z maksymalnie 16 znaków')
        .required('Pole jest wymagane'),
})
