import Axios from "axios"
import routes from "../api"
import {
    adminOrdersInProgress,
    adminOrdersSuccess,
    adminOrdersError,
} from '../../actions/adminOrderAction'



export const adminAllOrders = (limits) => {
    console.log(limits);
    return async dispatch => {
        dispatch(adminOrdersInProgress());
        await Axios.post(routes.server + routes.admin.allOrders, {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            limit1: limits.beginning,
            limit2: limits.end,
        })
            .then((res) => {
                dispatch(adminOrdersSuccess(res.data.orders, res.data.rowsFound));
                return res;
            })
            .catch((err) => {
                 dispatch(adminOrdersError(err));
                 return err;
            })
    };
};

