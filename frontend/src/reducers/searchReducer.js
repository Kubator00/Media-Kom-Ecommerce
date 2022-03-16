import {
    PRODUCTS_SEARCH_IN_PROGRESS,
    PRODUCTS_SEARCH_SUCCESS,
    PRODUCTS_SEARCH_ERROR,
    PRODUCTS_SEARCH_REDIRECT,
    KEYWORD_SET,
    CATEGORY_SET,
} from "../actions/searchActionType";

export const searchProductsReducer = (state = { inprogress: false, keyword: '', category: '', error: null, products: [], redirect: false }, action) => {
    switch (action.type) {
        case PRODUCTS_SEARCH_IN_PROGRESS:
            return { ...state, inprogress: true };
        case PRODUCTS_SEARCH_SUCCESS:
            return { ...state, inprogress: false, products: action.products };
        case PRODUCTS_SEARCH_ERROR:
            return { ...state, inprogress: false, error: action.error };
        case PRODUCTS_SEARCH_REDIRECT:
            return { ...state, redirect: action.redirect };
        case KEYWORD_SET:
            return { ...state, keyword: action.keyword };
        case CATEGORY_SET:
            return { ...state, category: action.category };
        default:
            return state;
    }
};
