import Axios from "axios"
import routes from "./api"
import {
    userOrderDetailsInProgress,
    userOrderDetailsSuccess,
    userOrderDetailsError
} from "../actions/orderAction"


export const userOrderDetails = (orderId) => {
    return async dispatch => {
        dispatch(userOrderDetailsInProgress());
        await Axios.post(routes.server + routes.orders.details, {
            username: localStorage.getItem('username'), token: localStorage.getItem('token'), orderId: orderId
        })
            .then((res) => {
                if (res.data.status == 'user_id_error')
                    return dispatch(userOrderDetailsError('user_id_error'));
                return dispatch(userOrderDetailsSuccess(res.data.order));
            })
            .catch((err) => {
                return dispatch(userOrderDetailsError(err));
            })
    };
};

