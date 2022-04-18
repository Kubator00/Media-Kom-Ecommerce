import routes from "./api"
import {
    loginInProgress,
    loginSuccess,
    loginFailure,
    loginError
} from "../actions/userAction"
import Axios from "axios"

const logInUser = (props) => {
    const { email, password } = props;
    return async dispatch => {
        dispatch(loginInProgress());
        await Axios.post(routes.server + routes.users.login, {
            email: email,
            password: password
        })
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem('email', res.data.email);
                    localStorage.setItem('name', res.data.name);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('isAdmin', res.data.isAdmin);
                    dispatch(loginSuccess(res.data));
                }
                else {
                    dispatch(loginFailure(res.data));
                }
                return res.data;
            })
            .catch(err => {
                dispatch(loginError(err.response?.data));
            });

    };
};

export default logInUser;