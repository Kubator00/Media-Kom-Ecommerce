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
                dispatch(newOrderSuccess(res.data));
                return res;
            })
            .catch((err) => {
                dispatch(newOrderError(err));
                return err;
            })
    }
}

export const userOrders = (beginning, numOfRows) => {
    return async dispatch => {
        dispatch(userOrdersInProgress());
        await Axios.post(routes.server + routes.users.orders, {
            username: localStorage.getItem('username'), token: localStorage.getItem('token'),
            beginning: beginning, numOfRows: numOfRows
        })
            .then((res) => {
                dispatch(userOrdersSuccess(res.data.orders, res.data.rowsFound));
                return res.data.orders;
            })
            .catch((err) => {
                dispatch(userOrdersError(err));
                return err;
            })
    };
};




