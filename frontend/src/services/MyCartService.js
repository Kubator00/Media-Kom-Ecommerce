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
        await Axios({
            method: 'post',
            url: routes.server + routes.users.cart,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-USERNAME": localStorage.getItem('username')
            }
        })
            .then((res) => {
                let sum = 0;
                console.log(res.data);
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

export const addToCart = (productId, amount) => {
    console.log(productId);
    return async dispatch => {
        dispatch(addToCartInProgress());
        await Axios({
            method: 'post',
            url: routes.server + routes.cart.add,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-USERNAME": localStorage.getItem('username')
            },
            data: {
                amount: amount,
                productId: productId
            }
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

export const changeProductAmount = (productId, amount) => {
    return async dispatch => {
        dispatch(cartInProgress());
        await Axios({
            method: 'post',
            url: routes.server + routes.cart.changeAmount,
            headers: {
                "X-USER-TOKEN": localStorage.getItem('token'),
                "X-USERNAME": localStorage.getItem('username')
            },
            data: {
                productId: productId,
                amount: amount
            }
        })
            .then(() => {
                return dispatch(fetchCart());
            })
            .catch(err => {
                dispatch(cartError(err));
                return err;
            })
    }
};