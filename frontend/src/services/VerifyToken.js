import Axios from "axios"
import routes from "./api"
import {
    verifyTokenInProgress,
    verifyTokenSucess,
    verifyTokenFailure,
    verifyTokenError,
    logOutUser
} from "../actions/userAction"

const verifyToken = () => {
    return async dispatch => {
        dispatch(verifyTokenInProgress());
        await Axios({
            method: 'post',
            url: routes.server + routes.users.token,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-EMAIL": localStorage.getItem('email')
            },
        })
            .then((res) => {
                if (res.data) {
                    dispatch(verifyTokenSucess());
                    return res.data;
                }
                dispatch(logOutUser());
                dispatch(verifyTokenFailure('Sesja wygasła'));
                return res.data;
            })
            .catch(err => {
                dispatch(logOutUser());
                dispatch(verifyTokenError(err.response?.data));
            })
    };
}
export default verifyToken;