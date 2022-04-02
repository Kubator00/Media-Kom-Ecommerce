import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './LogIn.css'
import './Register.css'
import register from '../../services/RegisterService';
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";



const Register = () => {

    const inProgress = useSelector(state => state.usersReducer.inprogress);
    const error = useSelector(state => state.usersReducer.error);
    const msg = useSelector(state => state.usersReducer.msg);
    const dispatch = useDispatch();

    const registerHandler = (data) => {
        const { email, name, surname, password } = data;
        dispatch(register(email, name, surname, password));
    }

    if (inProgress)
        return <div>Ładowanie...</div>
    if (msg)
        return (
            <div class="register-container-complete">
                {msg}
                <Link to="/login" class="login-button">
                    Zaloguj się
                </Link>
            </div>
        );
    return (
        <div class="login-container">
            <div class="login-login-content">
                <h3> Zarejestruj się </h3>
                {error && error}
                <Formik
                    initialValues={{
                        email: "",
                        name: "",
                        surname: "",
                        password: "",
                        passwordConfirmation: ""
                    }}
                    onSubmit={(values) => { registerHandler(values) }}
                    validationSchema={validate}
                >
                    <Form class="login-login-form" >
                        <label htmlFor="email">Adres email</label>
                        <ErrorMessage name='email' component="div" class='login-errorMsg' />
                        <Field name="email" class="login-login-form-control" autocomplete='off' />

                        <label htmlFor="name">Imię</label>
                        <ErrorMessage name='name' component="div" class='login-errorMsg' />
                        <Field name="name" class="login-login-form-control" autocomplete='off' />

                        <label htmlFor="surname">Nazwisko</label>
                        <ErrorMessage name='surname' component="div" class='login-errorMsg' />
                        <Field name="surname" class="login-login-form-control" autocomplete='off' />

                        <label htmlFor="password">Hasło</label>
                        <ErrorMessage name='password' component="div" class='login-errorMsg' />
                        <Field type='password' name="password" class="login-login-form-control" autocomplete='off' />

                        <label htmlFor="passwordConfirmation">Powtórz hasło</label>
                        <ErrorMessage name='passwordConfirmation' component="div" class='login-errorMsg' />
                        <Field type='password' name="passwordConfirmation" class="login-login-form-control" autocomplete='off' />

                        <button type="submit" class="login-button">Zarejestruj się</button>
                    </Form>
                </Formik>




            </div>
        </div>
    );
};



export default Register;

const validate = yup.object().shape({
    email: yup.string()
        .email("Adres e-mail jest nieprawidłowy")
        .required("Pole jest wymagane"),
    name: yup.string()
        .min(2, "Imię powinno się składać z conajmniej 2 znaków")
        .max(20, "Imię powinno się składać z maksymalnie 20 znaków")
        .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "Wpisz poprawne imię")
        .required("Pole jest wymagane"),
    surname: yup.string()
        .min(3, "Nazwisko powinno się składać z conajmniej 3 znaków")
        .max(30, "Nazwisko powinno się składać z maksymalnie 30 znaków")
        .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "Wpisz poprawne nazwisko")
        .required("Pole jest wymagane"),
    password: yup.string()
        .min(3, 'Hasło musi posiadać co najmniej 3 znaki')
        .max(16, 'Hasło musi się składać z maksymalnie 16 znaków')
        .required('Pole jest wymagane'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password')], 'Hasła się nie zgadzają')
})
