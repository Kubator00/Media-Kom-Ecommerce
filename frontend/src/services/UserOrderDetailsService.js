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
                res.data.order['cartAmount'] = res.data.order.products.reduce((sum, element) => sum + element.price, 0);
                return dispatch(userOrderDetailsSuccess(res.data.order));
            })
            .catch((err) => {
                console.log(err);
                return dispatch(userOrderDetailsError(err));
            })
    };
};

