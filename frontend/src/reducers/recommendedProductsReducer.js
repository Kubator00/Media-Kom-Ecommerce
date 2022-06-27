import {
    RECOMMENDED_PRODUCTS_IN_PROGRESS,
    RECOMMENDED_PRODUCTS_SUCCESS,
    RECOMMENDED_PRODUCTS_ERROR
} from '../actions/types/recommendedProductsActionType'


export const recommendedProductsReducer = (state = {
    inprogress: true,
    error: null,
    products: []
}, action) => {
    switch (action.type) {
        case RECOMMENDED_PRODUCTS_IN_PROGRESS:
            return {...state, inprogress: true};
        case RECOMMENDED_PRODUCTS_SUCCESS:
            return {
                ...state,
                inprogress: false,
                products: action.products
            };
        case RECOMMENDED_PRODUCTS_ERROR:
            return {...state, inprogress: false, error: action.error, products: []};
        default:
            return state;
    }
};