import {
    USER_LOGOUT,
    USER_LOGIN_IN_PROGRSS,
    USER_LOGIN_SUCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_ERROR,
    VERIFY_TOKEN_IN_PROGRESS,
    VERIFY_TOKEN_SUCESS,
    VERIFY_TOKEN_FAILURE,
    VERIFY_TOKEN_ERROR
} from "./usersActionType";

export const logOutUser = () => {
    return {
        type: USER_LOGOUT
    };
}


export const loginInProgress = () => {
    return {
        type: USER_LOGIN_IN_PROGRSS
    };
}

export const loginSuccess = (user) => {
    console.log(user);
    return {
        type: USER_LOGIN_SUCESS,
        user: user
    };
}
export const loginFailure = (msg) => {
    return {
        type: USER_LOGIN_FAILURE,
        error: msg
    };
}

export const loginError = (error) => {
    return {
        type: USER_LOGIN_ERROR,
        error: error
    };
}


export const verifyTokenInProgress = () => {
    return {
        type: VERIFY_TOKEN_IN_PROGRESS
    };
}
export const verifyTokenSucess = () => {
    console.log('ccc');
    return {
        type: VERIFY_TOKEN_SUCESS
    };
}
export const verifyTokenFailure = () => {
    return {
        type: VERIFY_TOKEN_FAILURE
    };
}
export const verifyTokenError = (error) => {
    return {
        type: VERIFY_TOKEN_ERROR,
        error: error,
    };
}



