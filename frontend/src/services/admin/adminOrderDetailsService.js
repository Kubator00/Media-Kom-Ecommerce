import Axios from "axios"
import routes from "../api"
import {
    adminOrderDetailsInProgress,
    adminOrderDetailsSuccess,
    adminOrderDetailsError,
} from "../../actions/adminOrderAction"


export const adminOrderDetails = (orderId) => {
    return async dispatch => {
        dispatch(adminOrderDetailsInProgress());
        await Axios.post(routes.server + routes.admin.details, {
            username: localStorage.getItem('username'), token: localStorage.getItem('token'), orderId: orderId
        })
            .then((res) => {
                res.data.order['cartAmount'] = res.data.order.products.reduce((sum, element) => sum + element.price, 0);
                return dispatch(adminOrderDetailsSuccess(res.data.order));
            })
            .catch((err) => {
                return dispatch(adminOrderDetailsError(err));
            })
    };
};


export const changeOrderStatus = (orderId, newStatus) => {
    return async dispatch => {
        dispatch(adminOrderDetailsInProgress());
        console.log(routes.server + routes.admin.newStatus);
        await Axios.post(routes.server + routes.admin.newStatus, {
            username: localStorage.getItem('username'), token: localStorage.getItem('token'), orderId: orderId, newStatus: newStatus
        })
            .then(() => {
                return dispatch(adminOrderDetails   (orderId));
            })
            .catch((err) => {
                return dispatch(adminOrderDetailsError(err));
            })
    };
}