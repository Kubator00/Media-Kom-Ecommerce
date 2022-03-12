import Axios from "axios"
import routes from "./api"
import {
    productsSearchInProgress,
    productsSearchSuccess,
    productsSearchError,
} from "../actions/searchAction"

export const productsSearch = (keyword, category) => {
    return async dispatch => {
        dispatch(productsSearchInProgress);
        await Axios.post(routes.server + routes.search, {
            keyword: keyword ? keyword : null,
            category: category ? category : null,
        })
            .then((res) => {
                if (res)
                    return dispatch(productsSearchSuccess(res.data));
            })
            .catch((err) => {
                return dispatch(productsSearchError(err));
            })
    }
}

