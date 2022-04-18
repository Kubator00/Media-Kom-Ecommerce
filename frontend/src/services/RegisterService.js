import routes from "./api"
import {
    registerInProgress,
    registerSuccess,
    registerError
} from "../actions/userAction"
import Axios from "axios"

const register = ( email, name, surname, password ) => {
    return async dispatch => {
        dispatch(registerInProgress());
        await Axios.post(routes.server + routes.users.register, {
            email: email,
            name: name,
            surname: surname,
            password: password
        })
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    dispatch(registerSuccess(res.data));
                    return res.data;
                }
            })
            .catch(err => {
                dispatch(registerError(err.response?.data));
            });

    };
};

export default register;