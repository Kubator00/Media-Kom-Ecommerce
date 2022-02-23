import React from "react";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import routes from "./services/api";
import Axios from "axios";
import verifyToken from "./services/VerifyToken";
import { useDispatch, connect } from 'react-redux';
import { fetchUserInProgress } from "./actions/userAction";

class ProdectedRoute extends React.Component {
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
            if (this.props.inProgress === false) {
                this.setState({ c: this.props.inProgress });
            }
        }

    }

    render() {
        const { component: Component, exact, path, ...rest } = this.props;

        if (this.state.c === true) {
            return <>Ładowanie...</>
        }

        if (!this.props.user.isAuth) {
            return <Redirect to={{
                pathname: '/login',
                state: { msg: 'Sesja wygasła' }
            }} />
        }

        return (
            < Route exact={exact} path={path}>
               <Component {...rest} />
            </Route>
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
        verifyUserToken: (props) => {
            dispatch(verifyToken(props));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdectedRoute);

