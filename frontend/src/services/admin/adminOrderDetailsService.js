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
                console.log(res.data.products);
                res.data['cartAmount'] = res.data.products.reduce((sum, element) => sum + element.productPrice * element.productAmount, 0);
                res.data['totalAmount'] = res.data.cartAmount + res.data.deliveryPrice;
                return dispatch(adminOrderDetailsSuccess(res.data));
            })
            .catch((err) => {
                return dispatch(adminOrderDetailsError(err));
            })
    };
};


export const changeOrderStatus = (orderId, newStatus) => {
    return async dispatch => {
        dispatch(adminOrderDetailsInProgress());
        await Axios({
            method: 'post',
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
            .then(() => {
                return dispatch(adminOrderDetails(orderId));
            })
            .catch((err) => {
                return dispatch(adminOrderDetailsError(err));
            })
    };
}