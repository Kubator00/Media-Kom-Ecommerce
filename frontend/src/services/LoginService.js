import routes from "./api"
import {
    loginInProgress,
    loginSuccess,
    loginFailure,
    loginError
} from "../actions/userAction"
import Axios from "axios"

const logInUser = (props) => {
    const { username, password } = props;
    return async dispatch => {
        dispatch(loginInProgress());
        await Axios.post(routes.server + routes.users.login, {
            username: username,
            password: password
        })
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('isAdmin', res.data.isAdmin);
                    dispatch(loginSuccess(res.data));
                }
                else {
                    dispatch(loginFailure(res.data));
                }
                return res.data;
            })
            .catch(error => {
                dispatch(loginError(error));
                return error;
            });

    };
};

export default logInUser;