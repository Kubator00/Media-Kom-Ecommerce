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
                "X-USERNAME": localStorage.getItem('username')
            },
            data: {
                orderId: orderId
            }
        })
            .then((res) => {
                console.log(res.data);
                res.data['cartAmount'] = res.data.products.reduce((sum, element) => sum + element.price * element.amount, 0);
                res.data['totalAmount'] = res.data.cartAmount + res.data.deliveryPrice;
                return dispatch(userOrderDetailsSuccess(res.data));
            })
            .catch((err) => {
                console.log(err);
                return dispatch(userOrderDetailsError(err));
            })
    };
};

