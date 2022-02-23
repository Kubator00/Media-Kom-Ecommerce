import { FETCH_USER_SUCCESS, FETCH_USER_INPROGRESS, FETCH_USER_ERROR, USER_LOGOUT } from "../actions/usersActionType";
import Axios from "axios"
import { Redirect, Route } from "react-router-dom";
const initialState = {
    inprogress: false,
    error: null,
    user: {
        username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
        isAuth: localStorage.getItem('isAuth') === 'true' ? true : false,
        isAdmin: localStorage.getItem('isAdmin') === 'true' ? true : false,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    }
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            localStorage.setItem('isAuth', 'false');
            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('token');
            return { ...state, inprogress: false, user: { username: null, isAuth: false, token: null, isAdmin: null } }
        case FETCH_USER_INPROGRESS:
            return { ...state, inprogress: true };
        case FETCH_USER_SUCCESS:
            return { ...state, inprogress: false, user: action.user };
        case FETCH_USER_ERROR:
            return { ...state, inprogress: false, error: action.error };
        default:
            return state;
    }
};

export default usersReducer;