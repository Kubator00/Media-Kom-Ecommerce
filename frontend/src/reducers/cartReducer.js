import {
    CART_IN_PROGRESS,
    CART_SUCCESS,
    CART_ERROR,
    ADD_TO_CART_IN_PROGRESS,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_ERROR
} from "../actions/types/cartActionType";

const initialState = {
    inprogress: false,
    msg: null,
    error: null,
    cart: [],
    totalAmount: 0,
};


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_IN_PROGRESS:
            return { ...state, inprogress: true };
        case CART_SUCCESS:
            return { ...state, inprogress: false, cart: action.cart, totalAmount: action.totalAmount };
        case CART_ERROR:
            return { ...state, inprogress: false, error: action.error };
        case ADD_TO_CART_IN_PROGRESS:
            return { ...state, inprogress: true, error: null };
        case ADD_TO_CART_SUCCESS:
            return { ...state, inprogress: false, msg: action.msg, error: null };
        case ADD_TO_CART_ERROR:
            return { ...state, inprogress: false, error: action.error };
        default:
            return state;
    }
};

export default cartReducer;