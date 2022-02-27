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
        error: state.usersReducer.error,
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

    }

    changeHandler = event => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [event.target.name]: event.target.value
            }
        }));
    };

    logInHandler = (event) => {
        event.preventDefault();
        this.props.logInUser(this.state.user);
    };

    componentDidUpdate() {
        if (this.props.user.token) {
            console.log(this.props.user);
            this.setState({ isAuth: true });
        }
    }
    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to="/myaccount" />;
        }

        return (
            <>

                <h1>Zaloguj się</h1>
                {this.state.msg && this.state.msg}<br></br>
                {this.props.error && this.props.error}
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