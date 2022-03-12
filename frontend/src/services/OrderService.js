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
        await Axios({
            method: 'post',
            url: routes.server + routes.orders.new,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-USERNAME": localStorage.getItem('username')
            },
            data: {
                orderData: props
            }
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
        await Axios({
            method: 'post',
            url: routes.server + routes.users.orders,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-USERNAME": localStorage.getItem('username')
            },
            data: {
                beginning: beginning,
                numOfRows: numOfRows
            }
        })
            .then((res) => {
                res.data.orders.forEach(element => {
                    element.totalAmount = element.products.reduce((sum, a) => sum + a.price * a.amount, 0);
                });
                dispatch(userOrdersSuccess(res.data.orders, res.data.rowsFound));
                return res.data.orders;
            })
            .catch((err) => {
                dispatch(userOrdersError(err));
                return err;
            })
    };
};




