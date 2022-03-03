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
        console.log("BEKA");
        console.log(localStorage.getItem('username'));
        console.log(localStorage.getItem('token'));
        console.log(routes.server + routes.users.token);
        dispatch(verifyTokenInProgress());
        await Axios.post(routes.server + routes.users.token, {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
        })
            .then((res) => {
                console.log('DUPA');
                console.log(res);
                if (!res.data) {
                    dispatch(logOutUser());
                    dispatch(verifyTokenFailure('Sesja wygasła'));
                }
                else {
                    dispatch(verifyTokenSucess());
                }
                return res.data;
            })
            .catch(err => {
                console.log("LIPA");
                dispatch(logOutUser());
                dispatch(verifyTokenError(err));
                return err;
            })
    };
}
export default verifyToken;