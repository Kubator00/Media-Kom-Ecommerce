import React from "react";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import routes from "./services/api";
import Axios from "axios";
import verifyToken from "./services/VerifyToken";
import {  connect } from 'react-redux';
import { fetchUserInProgress } from "./actions/userAction";

class AdminRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            c: true,
        }
    }
     componentDidMount() {
         this.props.verifyUserToken({ username: localStorage.getItem('username'), token: localStorage.getItem('token') })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.c === true) {
            if (this.props.inProgress === false){
                this.setState({ c: this.props.inProgress });
            }
        }
    }

    render() {
        if (this.state.c === true) {
            return <>Ładowanie...</>
        }
        return (
            < Route {...this.props.rest} render={(props) => {
                if (this.props.user.isAuth == true ) return <this.props.component {...props} />;
                else return (
                    <Redirect to={{
                        pathname: '/login',
                        state: { msg: 'Sesja wygasła' }
                    }}/>
                );
            }
            }
            />
        );
    };
}


const mapStateToProps = (state) => {
    return {
        user: state.usersReducer.user,
        inProgress: state.usersReducer.inprogress,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        verifyUserToken:  (props) => {
             dispatch(verifyToken(props));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute);

