import {
    PRODUCTS_SEARCH_IN_PROGRESS,
    PRODUCTS_SEARCH_SUCCESS,
    PRODUCTS_SEARCH_ERROR,
    PRODUCTS_SEARCH_REDIRECT
} from './searchActionType'

export const productsSearchInProgress = () => {
    return {
        type: PRODUCTS_SEARCH_IN_PROGRESS,
    };
}

export const productsSearchSuccess = (products) => {
    return {
        type: PRODUCTS_SEARCH_SUCCESS,
        products: products
    };
}

export const productsSearchError = (err) => {
    return {
        type: PRODUCTS_SEARCH_ERROR,
        error: err
    };
}

export const productRedirect = (state) => {
    return {
        type: PRODUCTS_SEARCH_REDIRECT,
        redirect: state
    };
}
