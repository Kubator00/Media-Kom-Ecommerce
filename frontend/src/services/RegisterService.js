import routes from "./api"
import {
    registerInProgress,
    registerSuccess,
    registerError
} from "../actions/userAction"
import Axios from "axios"

const register = (email, username, password) => {
    console.log(password);
    return async dispatch => {
        dispatch(registerInProgress());
        await Axios.post(routes.server + routes.users.register, {
            email: email,
            username: username,
            password: password
        })
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    dispatch(registerSuccess(res.data));
                    return res.data;
                }
            })
            .catch(error => {
                dispatch(registerError("Wystąpił błąd przy rejestacji"));
                return error;
            });

    };
};

export default register;