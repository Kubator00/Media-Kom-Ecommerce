import React, {useEffect} from 'react'
import './AccountSettings.css'
import {useDispatch, useSelector} from "react-redux";
import {userAccountDetailsService} from "../../services/UserAccountDetailsService";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import {userChangeEmailService} from "../../services/UserChangeEmailService"
import {userChangePasswordService} from "../../services/UserChangePasswordService"


const UserAccount = () => {
    const accountDetails = useSelector(state => (state.userAccountDetailsReducer.data));
    const changeEmail = {
        error: useSelector(state => state.userChangeEmailReducer.error),
    }
    const changePassword = {
        error: useSelector(state => state.userChangePasswordReducer.error),
    }

    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(userAccountDetailsService());
    }, [])


    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Ustawienia konta</h1>
            </div>

            <div className="settings-accountData">

                    <h2>Twoje dane</h2>
                    <p>Imię: {accountDetails.name}</p>
                    <p>Nazwisko: {accountDetails.surname}</p>
                    <p>Adres e-mail: {accountDetails.email}</p>
            </div>

            <div className="settings-formContainer">
                <h2>Zmiana adresu email</h2>
                {changeEmail.error && <h3 style={{"color": "red"}}>{changeEmail.error}</h3>}
                <Formik
                    initialValues={{
                        newEmail: "",
                        password: "",
                    }}
                    onSubmit={(values) => {
                        dispatch(userChangeEmailService(values.newEmail, values.password))
                    }}
                    validationSchema={validateChangeEmail}
                >
                    <Form class="settings-form">
                        <label htmlFor="newEmail">Nowy adres email</label>
                        <ErrorMessage name='newEmail' component="div" class='settings-errorMsg'/>
                        <Field name="newEmail" class="settings-form-control" autocomplete='off'/>

                        <label htmlFor="password">Hasło</label>
                        <ErrorMessage name='password' component="div" class='settings-errorMsg'/>
                        <Field type="password" name="password" class="settings-form-control"/>

                        <button type="submit" class="settings-button">Zmień adres</button>
                    </Form>
                </Formik>
            </div>
            <div className="settings-formContainer">
                <h2>Zmiana hasła</h2>
                {changePassword.error && <h3 style={{"color": "red"}}>{changePassword.error}</h3>}
                <Formik
                    initialValues={{
                        newPassword: "",
                        newPasswordConfirmation: "",
                        oldPassword: ""
                    }}
                    onSubmit={(values) => {
                        dispatch(userChangePasswordService(values.newPassword, values.oldPassword))
                    }}
                    validationSchema={validateChangePassword}
                >
                    <Form class="settings-form">
                        <label htmlFor="newPassword">Nowe hasło</label>
                        <ErrorMessage name='newPassword' component="div" class='settings-errorMsg'/>
                        <Field type="password" name="newPassword" class="settings-form-control" autocomplete='off'/>

                        <label htmlFor="newPasswordConfirmation">Powtórz nowe hasło</label>
                        <ErrorMessage name='newPasswordConfirmation' component="div" class='settings-errorMsg'/>
                        <Field type="password" name="newPasswordConfirmation" class="settings-form-control"/>

                        <label htmlFor="oldPassword">Obecne hasło</label>
                        <ErrorMessage name='oldPassword' component="div" class='settings-errorMsg'/>
                        <Field type="password" name="oldPassword" class="settings-form-control"/>

                        <button type="submit" class="settings-button">Zmień hasło</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );


}

const validateChangeEmail = yup.object().shape({
    newEmail: yup.string()
        .email("Adres e-mail jest nieprawidłowy")
        .required("Pole jest wymagane"),
    password: yup.string()
        .min(3, 'Hasło musi posiadać co najmniej 3 znaki')
        .max(16, 'Hasło musi się składać z maksymalnie 16 znaków')
        .required('Pole jest wymagane'),
})

const validateChangePassword = yup.object().shape({
    newPassword: yup.string()
        .min(3, 'Hasło musi posiadać co najmniej 3 znaki')
        .max(16, 'Hasło musi się składać z maksymalnie 16 znaków')
        .required('Pole jest wymagane'),
    newPasswordConfirmation: yup.string()
        .oneOf([yup.ref('newPassword')], 'Hasła się nie zgadzają'),
    oldPassword: yup.string()
        .min(3, 'Hasło musi posiadać co najmniej 3 znaki')
        .max(16, 'Hasło musi się składać z maksymalnie 16 znaków')
        .required('Pole jest wymagane'),
})

export default UserAccount;