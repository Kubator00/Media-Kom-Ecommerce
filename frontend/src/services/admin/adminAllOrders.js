import Axios from "axios"
import routes from "../api"
import {
    adminOrdersInProgress,
    adminOrdersSuccess,
    adminOrdersError,
} from '../../actions/adminOrderAction'



export const adminAllOrders = (beginning, numOfRows) => {
    return async dispatch => {
        dispatch(adminOrdersInProgress());
        await Axios.post(routes.server + routes.admin.allOrders, {
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            beginning: beginning,
            numOfRows: numOfRows,
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

