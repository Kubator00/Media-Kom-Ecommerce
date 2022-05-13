import Axios from "axios"
import routes from "./api"
import {
    userInfoInProgress,
    userInfoSuccess,
    userInfoError
} from "../actions/userAction"

export const userAccountDetailsService = () => {
    return async dispatch => {
        dispatch(userInfoInProgress());
        await Axios({
            method: 'post',
            url: routes.server + routes.users.account,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-EMAIL": localStorage.getItem('email')
            },
        })
            .then((res) => {
                dispatch(userInfoSuccess(res.data.account));
                return res.data;
            })
            .catch((err) => {
                dispatch(userInfoError(err.response?.data));
            })
    }
}