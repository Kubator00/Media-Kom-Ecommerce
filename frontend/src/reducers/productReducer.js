import {
    PRODUCT_FETCH_IN_PROGRESS,
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_FETCH_ERROR
} from '../actions/productActionTypes'


export const productReducer = (state = { inprogress: true, error: null, productDetails: {}, productParameters: [] }, action) => {
    switch (action.type) {
        case PRODUCT_FETCH_IN_PROGRESS:
            return { ...state, inprogress: true };
        case PRODUCT_FETCH_SUCCESS:
            return { ...state, inprogress: false, productDetails: action.productDetails, productParameters: action.productParameters };
        case PRODUCT_FETCH_ERROR:
            return { ...state, inprogress: false, error: action.error, productDetails: null };
        default:
            return state;
    }
};