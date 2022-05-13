import Axios from "axios"
import routes from "./api"
import {
    productsSearchInProgress,
    productsSearchSuccess,
    productsSearchError,
} from "../actions/searchAction"

export const productsSearch = (props) => {
    return async dispatch => {
        dispatch(productsSearchInProgress);
        await Axios.get(routes.server + routes.search, {
            params: {
                keyword: props.keyword ? props.keyword : null,
                category: props.category ? props.category : null,
                sort: props.filter?.sort ? props.filter.sort : null,
                priceFrom: props.filter?.price.from ? props.filter.price.from : 0,
                priceTo: props.filter?.price.to ? props.filter.price.to : null,
                beginning: props.limit?.beginning ? props.limit.beginning : null,
                numOfRows: props.limit?.numOfRows ? props.limit.numOfRows : null,
            }
        })
            .then((res) => {
                console.log(res.request);
                dispatch(productsSearchSuccess(res.data));
                return res.data;
            })
            .catch((err) => {
                dispatch(productsSearchError(err.response?.data));
            })
    }
}

