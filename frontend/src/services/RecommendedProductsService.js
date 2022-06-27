import routes from "./api"
import {
    recommendedProductsSuccess,
    recommendedProductsInProgress,
    recommendedProductsError
} from "../actions/recommendedProductsAction"
import Axios from "axios"

const recommendedProductsService = () => {
    return async dispatch => {
        dispatch(recommendedProductsInProgress());
        await Axios.get(routes.server + routes.products.recommended)
            .then((res) => {
                dispatch(recommendedProductsSuccess(res.data.products));
                return res.data.products;
            })
            .catch(err => {
                dispatch(recommendedProductsError(err.response?.data));
            })
    }
};

export default recommendedProductsService;