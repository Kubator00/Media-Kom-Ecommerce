import routes from "./api"
import {
    fetchUserInProgress,
    fetchUserSuccess,
    fetchUserError
} from "../actions/userAction"
import Axios from "axios"

const logInUser = (props) => {
    console.log(props);
    const { username, password } = props;
    return dispatch => {
        dispatch(fetchUserInProgress());
        console.log(routes.server + routes.users.login);
        Axios.post(routes.server + routes.users.login, {
            username: username,
            password: password
        })
            .then((res) => {
                console.log(res);
                if (res.data.isAuth == true) {
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('isAuth', 'true');
                    localStorage.setItem('isAdmin', res.data.isAdmin ? 'true' : 'false');
                    dispatch(fetchUserSuccess(res.data));
                }
                else {
                    localStorage.setItem('isAuth', 'failed');
                    dispatch(fetchUserError(res.data));
                }
                return res.data;
            })
            .catch(error => {
                localStorage.setItem('isAuth', 'error');
                dispatch(fetchUserError(error));
                return error;
            });

    };
};

export default logInUser;