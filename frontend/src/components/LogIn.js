import React, { Component } from 'react'
import { Link, Redirect, Route } from "react-router-dom";
import './LogIn.css'
import { useState, useEffect } from 'react'
import Axios from "axios"
import { connect } from "react-redux";
import logInUser from '../services/LoginService'

const MyInput = (props) => {
    const { label, type, name, value, className, onChange } = props;
    return (
        <div>
            <label htmlFor={name}>{label}: </label>
            <input
                name={name}
                id={name}
                type={type}
                value={value}
                className={className}
                onChange={onChange}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.usersReducer.user,
        inProgress: state.usersReducer.inprogress,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logInUser: user => {
            dispatch(logInUser(user));
        }
    }
}


class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: "",
                password: "",
            },
            isAuth: this.props.user.isLogIn,
            msg: props.location.state ? props.location.state.msg : undefined,
        }
        console.log(props);
        console.log(props.location.state);
    }
    changeHandler = event => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [event.target.name]: event.target.value
            }
        }));

    };

    logInHandler = (e) => {
        e.preventDefault();
        this.props.logInUser(this.state.user);
    };

    componentDidUpdate() {
        console.log(this.props.user);
        if (this.props.user.isAuth == 'true') {
            this.setState({ isAuth: this.props.user.isLogIn });
        }
    }
    render() {
        if (localStorage.getItem('isAuth') == 'true') {
            return <Redirect to="/myaccount" />;
        }

        return (
            <>

                <h1>Zaloguj się</h1>
                {this.state.msg && this.state.msg}
                <form onSubmit={this.logInHandler}>
                    <div class="form-group">
                        <MyInput label="Nazwa uzytkownika" type="text" name="username" className="form-control" required onChange={this.changeHandler} />

                        <MyInput label="Hasło" type="text" name="password" className="form-control" required onChange={this.changeHandler} />

                        <button type="submit">
                            Zaloguj sie
                        </button>

                    </div>
                </form>

            </>
        );

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(LogIn);