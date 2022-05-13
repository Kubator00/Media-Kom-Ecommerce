import routes from "./api"
import Axios from "axios"
import {
    productFetchInProgress,
    productFetchSuccess,
    productFetchError
} from "../actions/productAction"


export const productFetch = (id) => {

    return async dispatch => {
        dispatch(productFetchInProgress());
        //routes.server + routes.products.details?id=id
        await Axios.get(routes.server + routes.products.details, {params: {id: id}})
            .then((res) => {
                if (res.data) {
                    dispatch(productFetchSuccess(res.data.product, res.data.productParameters));
                    return res.data;
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(productFetchError(err.response?.data));
            });

    };
};

