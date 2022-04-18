import Axios from "axios"
import routes from "../api"
import {
    adminEditProductInProgress,
    adminEditProductSuccess,
    adminEditProductError,
} from '../../actions/adminProduct'


export const adminEditProduct = (props) => {
    return async dispatch => {
        dispatch(adminEditProductInProgress());
        await Axios({
            method: 'post',
            url: routes.server + routes.admin.editProduct,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-EMAIL": localStorage.getItem('email')
            },
            data: {
                productId: props.productId,
                name: props.name,
                description: props.description,
                parameters: props.parameters,
                titleImagePath: props.titleImagePath,
                price: props.price,
                categoryName: props.categoryName
            }
        })
            .then((res) => {
                dispatch(adminEditProductSuccess(res.data.msg));
                return res.data.msg;
            })
            .catch((err) => {
                dispatch(adminEditProductError(err.response?.data));
            })
    };
};

