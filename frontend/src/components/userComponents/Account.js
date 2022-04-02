import React from 'react'
import { Link, Redirect, Route } from "react-router-dom";
import './Account.css'
import { useState, useEffect } from 'react'
import { connect } from "react-redux";
import routes from "../../services/api"
import Axios from "axios"
import { logOutUser } from "../../actions/userAction";

class UserAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            username: '',
        }
    }

    // async read_data() {
    //     await Axios.post(routes.server + routes.users.account, {
    //         username: this.props.user.username,
    //         token: this.props.user.token,
    //     })
    //         .then(result => {
    //             if (result.data.isAuth == true) {
    //                 this.setState({ isAuth: result.data.isAuth, username: result.data.username });
    //             }
    //         });

    // }

    // async componentDidMount() {
    //     await this.read_data();
    //     if (this.state.isAuth != true)
    //         this.props.logOutUser();

    // }

    render() {
        return (
            <div class="home-container">
                Nazwa uzytkownika: {this.state.username}
            </div>
        );

    }
}


const mapStateToProps = (state) => {
    return {
        user: state.usersReducer.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logOutUser: () => {
            dispatch(logOutUser());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);