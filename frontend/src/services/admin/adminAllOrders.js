import Axios from "axios"
import routes from "../api"
import {
    adminOrdersInProgress,
    adminOrdersSuccess,
    adminOrdersError,
} from '../../actions/adminOrderAction'

export const adminAllOrders = (props) => {
    return async dispatch => {
        dispatch(adminOrdersInProgress());
        await Axios.post(routes.server + routes.admin.allOrders, {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            limit1: props.limit1,
            limit2: props.limit2,,
        })
            .then((res) => {
                dispatch(adminOrdersSuccess(res.data.orders, res.data.rowsFound));
            })
            .catch((err) => {
                return dispatch(adminOrdersError(err));
            })
    };
};

