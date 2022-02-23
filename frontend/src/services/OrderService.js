import Axios from "axios"
import routes from "./api"
import {
    newOrderInProgress,
    newOrderSuccess,
    newOrderError,
    userOrdersInProgress,
    userOrdersSuccess,
    userOrdersError
} from "../actions/orderAction"


export const newOrder = (props) => {
    return async dispatch => {
        dispatch(newOrderInProgress());
        await Axios.post(routes.server + routes.orders.new, {
            username: localStorage.getItem('username'), token: localStorage.getItem('token'), orderData: props
        })
            .then((res) => {
                if (res.status)
                    return dispatch(newOrderSuccess('Zamówienie zostało złożone pomyślnie'));
            })
            .catch((err) => {
                return dispatch(newOrderError(err));
            })
    }
}

export const userOrders = () => {
    return async dispatch => {
        dispatch(userOrdersInProgress());
        console.log(routes.server + routes.users.orders);
        await Axios.post(routes.server + routes.users.orders, {
            username: localStorage.getItem('username'), token: localStorage.getItem('token')
        })
            .then((res) => {
                console.log(res.data.orders);
                dispatch(userOrdersSuccess(res.data.orders));
            })
            .catch((err) => {
                return dispatch(userOrdersError(err));
            })
    };
};




