import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyInput from './MyInput';
import './LogIn.css'
import register from '../services/RegisterService';
import { Link } from "react-router-dom";

const Register = () => {

    const [user, setUser] = useState(
        {
            email: "",
            username: "",
            newPassword: "",
            newPasswordRepeat: ""
        }
    );
    const [err, setErr] = useState(
        {
            email: "",
            username: "",
            newPassword: "",
            newPasswordRepeat: ""
        }
    );

    const inProgress = useSelector(state => state.usersReducer.inprogress);
    const error = useSelector(state => state.usersReducer.err);
    const msg = useSelector(state => state.usersReducer.msg);
    const dispatch = useDispatch();


    const changeHandler = (event) => {
        setUser(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const registerHandler = (event) => {
        event.preventDefault();
        dispatch(register(user.email, user.username, user.newPassword));
    }

    if (msg)
        return (
            <div class="login-container">
               <div>
                    {msg}
                    <Link to="/login" class="login-button">
                        Zaloguj się
                    </Link>
                </div>
            </div>
        );
    return (
        <div class="login-container">
            <div class="login-login-content">
                <h3> Zarejestruj się </h3>
                {error&&error}
                <form onSubmit={registerHandler} class="login-login-form" >
                    <MyInput label="Adres email" type="text" name="email" className="login-login-form-control" required onChange={changeHandler} />
                    <MyInput label="Nazwa uzytkownika" type="text" name="username" className="login-login-form-control" required onChange={changeHandler} />
                    <MyInput label="Hasło" type="password" name="newPassword" className="login-login-form-control" autocomplete="password" required onChange={changeHandler} />
                    <MyInput label="Powtórz hasło" type="password" name="newPasswordRepeat" className="login-login-form-control" autocomplete=" password" required onChange={changeHandler} />
                    <button type="submit" class="login-button">
                        Zarejestruj się
                    </button>
                </form>
            </div>
        </div>
    );
};



export default Register;