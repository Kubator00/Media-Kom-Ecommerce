import { CART_IN_PROGRESS, CART_SUCCESS, CART_ERROR } from "../actions/cartActionType";

const initialState = {
    inprogress: false,
    error: null,
    cart: [],
    totalAmount: 0,
};


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_IN_PROGRESS:
            return { ...state, inprogress: true };
        case CART_SUCCESS:
            return { ...state, inprogress: false, cart: action.cart, totalAmount:action.totalAmount };
        case CART_ERROR:
            return { ...state, inprogress: false, error: action.error };
        default:
            return state;
    }
};

export default cartReducer;