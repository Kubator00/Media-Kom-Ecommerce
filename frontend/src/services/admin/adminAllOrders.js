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
        await Axios({
            method: 'post',
            url: routes.server + routes.admin.allOrders,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-USERNAME": localStorage.getItem('username')
            },
            data: {
                beginning: beginning,
                numOfRows: numOfRows,
            }
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

