import React from 'react';
import { Link, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser } from "../actions/userAction";
import { useDispatch } from 'react-redux';

function Logout(){
    const dispatch = useDispatch()
    dispatch(logOutUser());
    // localStorage.setItem('isLoggedIn','false');
    // localStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('username');
    return <Redirect to="/" />;
}

export default Logout