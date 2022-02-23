import Axios from "axios"
import routes from "./api"
import {
    fetchUserInProgress,
    fetchUserSuccess,
    fetchUserError,
    logOutUser
} from "../actions/userAction"
import store from '../store';

const verifyToken = (props) => {
    return async dispatch => {
        dispatch(fetchUserInProgress());
        const state = store.getState();
        await Axios.post(routes.server + routes.users.myaccount, {
            username: props.username,
            token: props.token,
        })
            .then((res) => {
                if (!res.data.isAuth) {
                    console.log(`Auth error, logout...`);
                    dispatch(logOutUser());
                    return;
                }
                else {
                    const user = { ...state.usersReducer.user, isAuth: res.data.isAuth };
                    dispatch(fetchUserSuccess(user));
                    return user;
                }
            })
            .catch(err => {
                dispatch(fetchUserError(err));
                return err;
            })
    };
}
export default verifyToken;