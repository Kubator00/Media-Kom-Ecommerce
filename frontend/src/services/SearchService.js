import Axios from "axios"
import routes from "./api"
import {
    productsSearchInProgress,
    productsSearchSuccess,
    productsSearchError,
} from "../actions/searchAction"

export const productsSearch = (props) => {
    console.log(props)
    return async dispatch => {
        dispatch(productsSearchInProgress);
        await Axios.post(routes.server + routes.search, {
            keyword: props.keyword ? props.keyword : null,
            category: props.category ? props.category : null,
            filter: props.filter ? props.filter : null,
            limit: props.limit ? props.limit : null
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

