import {
    USER_INFO_IN_PROGRESS,
    USER_INFO_SUCCESS,
    USER_INFO_ERROR,
    USER_CHANGE_EMAIL_IN_PROGRESS,
    USER_CHANGE_EMAIL_SUCCESS,
    USER_CHANGE_EMAIL_ERROR, USER_CHANGE_PASSWORD_IN_PROGRESS, USER_CHANGE_PASSWORD_SUCCESS, USER_CHANGE_PASSWORD_ERROR
} from "../actions/types/usersActionType";

export const userAccountDetailsReducer = (state = {
    inprogress: false,
    error: null,
    data: {
        name: null,
        surname: null,
        email: null
    }
}, action) => {
    switch (action.type) {
        case USER_INFO_IN_PROGRESS:
            return {...state, inprogress: true};
        case USER_INFO_SUCCESS:
            return {
                ...state,
                data: {name: action.name, surname: action.surname, email: action.email},
                inprogress: false,
                error: null
            };
        case USER_INFO_ERROR:
            return {...state, inprogress: false, error: action.error};
        default:
            return state;
    }
}

export const userChangeEmailReducer = (state = {
    inprogress: false,
    error: null,
    msg: null,
}, action) => {
    switch (action.type) {
        case USER_CHANGE_EMAIL_IN_PROGRESS:
            console.log(action)
            return {...state, inprogress: true};
        case USER_CHANGE_EMAIL_SUCCESS:
            return {
                ...state,
                msg: action.msg,
                inprogress: false,
                error: null
            };
        case USER_CHANGE_EMAIL_ERROR:
            return {...state, inprogress: false, error: action.error};
        default:
            return state;
    }
}


export const userChangePasswordReducer = (state = {
    inprogress: false,
    error: null,
    msg: null,
}, action) => {
    switch (action.type) {
        case USER_CHANGE_PASSWORD_IN_PROGRESS:
            console.log(action)
            return {...state, inprogress: true};
        case USER_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                msg: action.msg,
                inprogress: false,
                error: null
            };
        case USER_CHANGE_PASSWORD_ERROR:
            return {...state, inprogress: false, error: action.error};
        default:
            return state;
    }
}

