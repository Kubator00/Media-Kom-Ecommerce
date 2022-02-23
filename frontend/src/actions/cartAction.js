import { CART_IN_PROGRESS } from './cartActionType';
import { CART_SUCCESS } from './cartActionType';
import { CART_ERROR } from './cartActionType';


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