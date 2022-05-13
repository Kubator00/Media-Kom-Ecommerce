import Axios from "axios"
import routes from "./api"
import {
    userChangePasswordInProgress, userChangePasswordSuccess, userChangePasswordError, logOutUser
} from "../actions/userAction"


export const userChangePasswordService = (newPassword, oldPassword) => {
    return async dispatch => {
        dispatch(userChangePasswordInProgress());
        await Axios({
            method: 'post',
            url: routes.server + routes.users.change.password,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-EMAIL": localStorage.getItem('email')
            },
            data: {
                "newPassword": newPassword,
                "password": oldPassword
            }

        })
            .then((res) => {
                dispatch(userChangePasswordSuccess());
                dispatch(logOutUser());
                return res.data.msg;
            })
            .catch((err) => {
                dispatch(userChangePasswordError(err.response?.data));
            })
    };
}