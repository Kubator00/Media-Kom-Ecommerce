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
        await Axios({
            method: 'post',
            url: routes.server + routes.orders.details,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-EMAIL": localStorage.getItem('email')
            },
            data: {
                orderId: orderId
            }
        })
            .then((res) => {
                res.data['cartAmount'] = res.data.products.reduce((sum, element) => sum + element.productPrice * element.productAmount, 0);
                res.data['totalAmount'] = res.data.cartAmount + res.data.deliveryPrice;
                dispatch(userOrderDetailsSuccess(res.data));
                return res.data;
            })
            .catch((err) => {
                dispatch(userOrderDetailsError(err.response?.data));
            })
    };
};

