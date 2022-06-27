import Axios from "axios"
import routes from "../api"
import {
    adminEditProductInProgress,
    adminEditProductSuccess,
    adminEditProductError,
} from '../../actions/adminProduct'


export const adminDeleteProduct = (productId) => {
    return async dispatch => {
        dispatch(adminEditProductInProgress());
        await Axios({
            method: 'delete',
            url: routes.server + routes.admin.deleteProduct,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-EMAIL": localStorage.getItem('email')
            },
            data: {
                productId: productId,
            }
        })
            .then((res) => {
                console.log(res)
                dispatch(adminEditProductSuccess(res.data.msg));
                return res;
            })
            .catch((err) => {
                dispatch(adminEditProductError(err.response?.data));
            })
    };
};

