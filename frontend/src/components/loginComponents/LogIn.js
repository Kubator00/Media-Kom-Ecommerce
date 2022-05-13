import React, { useEffect } from 'react'
import { Link, Navigate, useLocation } from "react-router-dom";
import './LogIn.css'
import { useSelector, useDispatch } from "react-redux";
import logInUser from '../../services/LoginService'
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";


function LogIn() {
    let location = useLocation();
    const user = useSelector(state => state.usersReducer.user);
    const error = useSelector(state => state.usersReducer.error);
    const inProgress = useSelector(state => state.usersReducer.inprogress);
    const locationData = location?.state;
    const msg = locationData ? locationData.msg : '';

    const dispatch = useDispatch();
    const logInHandler = async (props) => {
        dispatch(logInUser(props));
    };

    useEffect(() => {
        console.log(inProgress);
    });

    if (localStorage.getItem('token'))
        return <Navigate to="/" />;

    if (inProgress)
        return <div>Ładowanie...</div>;

    return (
        <div class="login-container">
            <div class="login-login-container">
                <div class="login-login-content">
                    <h3>Zaloguj się</h3>
                    {msg && <h4 style={{"color":"green"}}>{msg}</h4>}<br/>
                    {error && <h4 style={{"color":"red"}}>{error}</h4>}
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={(values) => { logInHandler(values) }}
                        validationSchema={validate}
                    >

                        <Form class="login-login-form" >
                            <label htmlFor="email">Adres email</label>
                            <ErrorMessage name='email' component="div" class='login-errorMsg' />
                            <Field name="email" class="login-login-form-control" />
                            <label htmlFor="username">Hasło</label>
                            <ErrorMessage name='password' component="div" class='login-errorMsg' />
                            <Field type="password" name="password" class="login-login-form-control" />
                            <button type="submit" class="login-button">Zaloguj się</button>
                        </Form>
                    </Formik>
                </div>
            </div>
            <div class="login-register-container">
                <h3>Nie masz konta?</h3>
                <Link to="/register" class="login-button">
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
