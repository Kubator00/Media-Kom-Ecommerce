import Axios from "axios"
import routes from "./api"
import {
    cartInProgress,
    cartSuccess,
    cartError,
    addToCartInProgress,
    addToCartSuccess,
    addToCartError
} from "../actions/cartAction"

export const fetchCart = () => {
    return async dispatch => {
        dispatch(cartInProgress());
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

export const addToCart = (productId,amount) => {
    console.log(productId);
    return async dispatch => {
        dispatch(addToCartInProgress());
        console.log(routes.server + routes.cart.add);
        await Axios.post(routes.server + routes.cart.add, {
            username: localStorage.getItem('username'), token: localStorage.getItem('token'),
            amount: amount, productId: productId
        })
            .then((res) => {
                dispatch(fetchCart());
                dispatch(addToCartSuccess(res.data));
                return res;
            })
            .catch(err => {
                dispatch(addToCartError(err));
                return err;
            })
    };
}

export const changeProductAmount = (props) => {
    return async dispatch => {
        dispatch(cartInProgress());
        await Axios.post(routes.server + routes.cart.changeAmount,
            { 'username': localStorage.getItem('username'), 'token': localStorage.getItem('token'), 'productId': props.productId, 'amount': props.amount })
            .then(() => {
                return dispatch(fetchCart());
            })
            .catch(err => {
                dispatch(cartError(err));
                return err;
            })
    }
};