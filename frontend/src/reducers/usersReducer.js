import {
    USER_LOGIN_IN_PROGRSS,
    USER_LOGIN_SUCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_ERROR,
    VERIFY_TOKEN_IN_PROGRESS,
    VERIFY_TOKEN_SUCESS,
    VERIFY_TOKEN_FAILURE,
    VERIFY_TOKEN_ERROR,
    USER_LOGOUT
} from "../actions/usersActionType";

const initialState = {
    inprogress: false,
    error: null,
    user: {
        username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
        isAdmin: localStorage.getItem('isAdmin') ? parseInt(localStorage.getItem('isAdmin'), 10) : null,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    }
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('token');
            return { ...state, inprogress: false, user: { username: null, token: null, isAdmin: null } }
        case USER_LOGIN_SUCESS:
            return { ...state, user: action.user, inprogress: true, error: null };
        case USER_LOGIN_IN_PROGRSS:
            return { ...state, inprogress: false };
        case USER_LOGIN_FAILURE:
            return { ...state, inprogress: false, error: action.error };
        case USER_LOGIN_ERROR:
            return { ...state, inprogress: false, error: action.error };
        case VERIFY_TOKEN_IN_PROGRESS:
            return { ...state, inprogress: true, error: null };
        case VERIFY_TOKEN_SUCESS:
            return { ...state, inprogress: false };
        case VERIFY_TOKEN_FAILURE:
            return { ...state, inprogress: false, error: action.error };
        case VERIFY_TOKEN_ERROR:
            return { ...state, inprogress: false, error: action.error };
        default:
            return state;
    }
};

export default usersReducer;