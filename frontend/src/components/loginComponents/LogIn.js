import React from 'react'
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
        <div className='login content'>
            <div className="login__content">
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

                    <Form className="login__form">
                        <label htmlFor="email">Adres email</label>
                        <ErrorMessage name='email' component="div" className='login__errorMsg'/>
                        <Field name="email" className="login__formControl"/>
                        <label htmlFor="username">Hasło</label>
                        <ErrorMessage name='password' component="div" className='login__errorMsg'/>
                        <Field type="password" name="password" className="login__formControl"/>
                        <button type="submit" className="login__button">Zaloguj się</button>
                    </Form>
                </Formik>
            </div>
            <div className="login__register">
                <h1>Nie masz konta?</h1>
                <Link to="/register" className="login__button">
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
