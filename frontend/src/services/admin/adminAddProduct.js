import Axios from "axios"
import routes from "../api"
import {
    adminAddProductInProgress,
    adminAddProductSuccess,
    adminAddProductError,
} from '../../actions/adminProduct'


export const adminAddProduct = (props) => {
    return async dispatch => {
        dispatch(adminAddProductInProgress());
        await Axios({
            method: 'post',
            url: routes.server + routes.admin.addProduct,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-EMAIL": localStorage.getItem('email')
            },
            data: {
                name: props.name,
                description: props.description,
                parameters: props.parameters,
                titleImagePath: props.titleImagePath,
                price: props.price,
                categoryName: props.categoryName
            }
        })
            .then((res) => {
                console.log(res)
                dispatch(adminAddProductSuccess(res.data.msg, res.data.productId));
                return res;
            })
            .catch((err) => {
                dispatch(adminAddProductError(err.response?.data));
            })
    };
};

