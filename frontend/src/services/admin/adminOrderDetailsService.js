import Axios from "axios"
import routes from "../api"
import {
    adminOrderDetailsInProgress,
    adminOrderDetailsSuccess,
    adminOrderDetailsError,
} from "../../actions/admin/adminOrderAction"


export const adminOrderDetails = (orderId) => {
    return async dispatch => {
        dispatch(adminOrderDetailsInProgress());
        await Axios({
            method: 'post',
            url: routes.server + routes.admin.details,
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
                return dispatch(adminOrderDetailsSuccess(res.data));
            })
            .catch((err) => {
                return dispatch(adminOrderDetailsError(err.response?.data));
            })
    };
};


export const changeOrderStatus = (orderId, newStatus) => {
    return async dispatch => {
        dispatch(adminOrderDetailsInProgress());
        await Axios({
            method: 'put',
            url: routes.server + routes.admin.newStatus,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-EMAIL": localStorage.getItem('email')
            },
            data: {
                orderId: orderId,
                newStatus: newStatus
            }
        })
            .then((res) => {
                dispatch(adminOrderDetails(orderId));
                return res;
            })
            .catch((err) => {
                dispatch(adminOrderDetailsError(err.response?.data));
            })
    };
}