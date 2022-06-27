import {
    CART_IN_PROGRESS,
    CART_SUCCESS,
    CART_ERROR,
    ADD_TO_CART_IN_PROGRESS,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_ERROR
} from './types/cartActionType';


export const cartInProgress = () => {
    return {
        type: CART_IN_PROGRESS,
    };
}

export const cartSuccess = (cart, totalAmount) => {
    return {
        type: CART_SUCCESS,
        cart: cart,
        totalAmount: totalAmount
    };
}

export const cartError = error => {
    return {
        type: CART_ERROR,
        error: error
    };
}

export const addToCartInProgress = () => {
    return {
        type: ADD_TO_CART_IN_PROGRESS,
    };
}

export const addToCartSuccess = (msg) => {
    return {
        type: ADD_TO_CART_SUCCESS,
        msg: msg
    };
}

export const addToCartError = error => {
    return {
        type: ADD_TO_CART_ERROR,
        error: error
    };
}