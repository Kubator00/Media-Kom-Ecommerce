import {
    USER_LOGOUT,
    USER_LOGIN_IN_PROGRSS,
    USER_LOGIN_SUCESS,
    USER_LOGIN_ERROR,
    VERIFY_TOKEN_IN_PROGRESS,
    VERIFY_TOKEN_SUCESS,
    VERIFY_TOKEN_ERROR,
    USER_REGISTER_IN_PROGRSS,
    USER_REGISTER_SUCESS,
    USER_REGISTER_ERROR,
    USER_INFO_IN_PROGRESS,
    USER_INFO_SUCCESS,
    USER_INFO_ERROR,
    USER_CHANGE_EMAIL_IN_PROGRESS,
    USER_CHANGE_EMAIL_SUCCESS,
    USER_CHANGE_EMAIL_ERROR,
    USER_CHANGE_PASSWORD_ERROR,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_CHANGE_PASSWORD_IN_PROGRESS
} from "./types/usersActionType";

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
    return {
        type: USER_LOGIN_SUCESS,
        user: user
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
    return {
        type: VERIFY_TOKEN_SUCESS
    };
}

export const verifyTokenError = (error) => {
    return {
        type: VERIFY_TOKEN_ERROR,
        error: error,
    };
}


export const registerInProgress = () => {
    return {
        type: USER_REGISTER_IN_PROGRSS
    };
}

export const registerSuccess = (msg) => {
    return {
        type: USER_REGISTER_SUCESS,
        msg: msg
    };
}

export const registerError = (error) => {
    return {
        type: USER_REGISTER_ERROR,
        error: error
    };
}


export const userInfoInProgress = () => {
    return {
        type: USER_INFO_IN_PROGRESS
    };
}

export const userInfoSuccess = (accountDetails) => {
    return {
        type: USER_INFO_SUCCESS,
        name: accountDetails.name,
        surname: accountDetails.surname,
        email: accountDetails.email
    };
}

export const userInfoError = (error) => {
    return {
        type: USER_INFO_ERROR,
        error: error
    };
}

export const userChangeEmailInProgress = () => {
    return {
        type: USER_CHANGE_EMAIL_IN_PROGRESS
    };
}

export const userChangeEmailSuccess = (msg) => {
    return {
        type: USER_CHANGE_EMAIL_SUCCESS,
        msg: msg,
    };
}

export const userChangeEmailError = (error) => {
    return {
        type: USER_CHANGE_EMAIL_ERROR,
        error: error
    };
}

export const userChangePasswordInProgress = () => {
    return {
        type: USER_CHANGE_PASSWORD_IN_PROGRESS
    };
}

export const userChangePasswordSuccess = (msg) => {
    return {
        type: USER_CHANGE_PASSWORD_SUCCESS,
        msg: msg,
    };
}

export const userChangePasswordError = (error) => {
    return {
        type: USER_CHANGE_PASSWORD_ERROR,
        error: error
    };
}