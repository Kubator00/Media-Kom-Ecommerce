import { USER_LOGIN } from "./usersActionType";
import { USER_LOGOUT } from "./usersActionType";
import { FETCH_USER_INPROGRESS } from "./usersActionType";
import { FETCH_USER_SUCCESS } from "./usersActionType";
import { FETCH_USER_ERROR } from "./usersActionType";

export const logOutUser = () => {
    return {
        type: USER_LOGOUT
    };
}

export const fetchUserInProgress = () => {
    return {
        type: FETCH_USER_INPROGRESS
    };
}

export const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        user: user
    };
}

export const fetchUserError = (error) => {
    return {
        type: FETCH_USER_ERROR,
        error: error
    };
}