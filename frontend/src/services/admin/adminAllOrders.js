import Axios from "axios"
import routes from "../api"
import {
    adminOrdersInProgress,
    adminOrdersSuccess,
    adminOrdersError,
} from '../../actions/admin/adminOrderAction'


export const adminAllOrders = (props) => {
    console.log(props.limit)
    return async dispatch => {
        dispatch(adminOrdersInProgress());
        await Axios({
            method: 'post',
            url: routes.server + routes.admin.allOrders,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-EMAIL": localStorage.getItem('email')
            },
            data: {
                limit: {
                    beginning: props.limit.beginning,
                    numOfRows: props.limit.numOfRows,
                },
                filter: {
                    status: props.filter?.status ? props.filter.status : null
                }
            }
        })
            .then((res) => {
                res.data.orders.forEach(element => {
                    element.totalAmount = element.products.reduce((sum, a) => sum + a.productPrice * a.productAmount, 0);
                });
                dispatch(adminOrdersSuccess(res.data.orders, res.data.rowsFound));
                return res;
            })
            .catch((err) => {
                dispatch(adminOrdersError(err.response?.data));
            })
    };
};

