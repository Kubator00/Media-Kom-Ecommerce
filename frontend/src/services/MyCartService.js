import Axios from "axios"
import routes from "./api"
import {
    cartInProgress,
    cartSuccess,
    cartError,
} from "../actions/cartAction"

export const fetchCart = () => {
    return async dispatch => {
        dispatch(cartInProgress());
        console.log(routes.server + routes.users.cart)
        await Axios.post(routes.server + routes.users.cart, {
            username: localStorage.getItem('username'), token: localStorage.getItem('token')
        })
            .then((res) => {
                let sum = 0;
                if (res.data.length > 0)
                    sum = res.data.reduce((sum, a) => sum + a.price * a.amount, 0);
                dispatch(cartSuccess(res.data, sum));
                return res;
            })
            .catch(err => {
                console.log(err);
                dispatch(cartError(err));
                return err;
            })
    };
}

export const productAmount = (props) => {
    console.log(props);
    return async dispatch => {
        dispatch(cartInProgress());
        await Axios.post(routes.server + routes.cart.changeAmount,
            { 'username': localStorage.getItem('username'), 'token': localStorage.getItem('token'), 'productId': props.productId, 'amount': props.amount })
            .then((res) => {
                return dispatch(fetchCart());
            })
            .catch(err => {
                dispatch(cartError(err));
                return err;
            })
    }
};
