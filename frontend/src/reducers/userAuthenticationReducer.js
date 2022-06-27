import {
    USER_LOGIN_IN_PROGRSS,
    USER_LOGIN_SUCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT,
    USER_REGISTER_IN_PROGRSS,
    USER_REGISTER_SUCESS,
    USER_REGISTER_ERROR
} from "../actions/types/usersActionType";

const initialState = {
    inprogress: false,
    msg: '',
    error: null,
    user: {
        name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
        isAdmin: localStorage.getItem('isAdmin') ? parseInt(localStorage.getItem('isAdmin'), 10) : null,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    }
};

const userAuthenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('token');
            return { ...state, inprogress: false, user: { username: null, token: null, isAdmin: null } }
        case USER_LOGIN_IN_PROGRSS:
            return { ...state, inprogress: true };
        case USER_LOGIN_SUCESS:
            return { ...state, user: action.user, inprogress: false, error: null };
        case USER_LOGIN_ERROR:
            return { ...state, inprogress: false, error: action.error };
        case USER_REGISTER_IN_PROGRSS:
            return { ...state, inprogress: true };
        case USER_REGISTER_SUCESS:
            return { ...state, inprogress: false, msg: action.msg };
        case USER_REGISTER_ERROR:
            return { ...state, inprogress: false, error: action.error };
        default:
            return state;
    }
};


export default userAuthenticationReducer;