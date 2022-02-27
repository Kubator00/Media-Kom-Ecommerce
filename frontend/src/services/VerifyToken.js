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
        await Axios.post(routes.server + routes.users.token, {
            username: localStorage.username,
            token: localStorage.token,
        })
            .then((res) => {
                if (!res.data) {
                    dispatch(logOutUser());
                    dispatch(verifyTokenFailure('Sesja wygasła'));
                }
                else {
                    dispatch(verifyTokenSucess());
                }
            })
            .catch(err => {
                dispatch(verifyTokenError(err));
            })
    };
}
export default verifyToken;