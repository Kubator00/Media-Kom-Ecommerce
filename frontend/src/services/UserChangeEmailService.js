import Axios from "axios"
import routes from "./api"
import {
    userChangeEmailInProgress,
    userChangeEmailSuccess,
    userChangeEmailError, logOutUser
} from "../actions/userAction"


export const userChangeEmailService = (newEmail, password) => {
    return async dispatch => {
        dispatch(userChangeEmailInProgress());
        await Axios({
            method: 'put',
            url: routes.server + routes.users.change.email,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-EMAIL": localStorage.getItem('email')
            },
            data: {
                "newEmail": newEmail,
                "password": password
            }

        })
            .then((res) => {
                dispatch(userChangeEmailSuccess());
                dispatch(logOutUser());
                return res.data.msg;
            })
            .catch((err) => {
                console.log(err.response)
                dispatch(userChangeEmailError(err.response?.data));
            })
    };
}