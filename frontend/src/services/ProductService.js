import routes from "./api"
import Axios from "axios"
import {
    productFetchInProgress,
    productFetchSuccess,
    productFetchError
} from "../actions/productAction"


export const productFetch = (productId) => {
   
    return async dispatch => {
        dispatch(productFetchInProgress());
        await Axios.post(routes.server + routes.products.details, {
            productId: productId,
        })
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    dispatch(productFetchSuccess(res.data.product,res.data.productParameters));
                    return res.data;
                }
            })
            .catch(err => {
                dispatch(productFetchError(err.response?.data));
            });

    };
};

