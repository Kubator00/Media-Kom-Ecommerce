import {
    PRODUCTS_SEARCH_IN_PROGRESS,
    PRODUCTS_SEARCH_SUCCESS,
    PRODUCTS_SEARCH_ERROR,
    PRODUCTS_SEARCH_REDIRECT,
    KEYWORD_SET,
    CATEGORY_SET,
} from './searchActionType'

export const productsSearchInProgress = () => {
    return {
        type: PRODUCTS_SEARCH_IN_PROGRESS,
    };
}

export const productsSearchSuccess = (res) => {
    return {
        type: PRODUCTS_SEARCH_SUCCESS,
        products: res.products,
        rowsFound: res.rowsFound
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

export const setKeyword = (keyword) => {
    return {
        type: KEYWORD_SET,
        keyword: keyword,
    };
}

export const setCategory = (category) => {
    return {
        type: CATEGORY_SET,
        category: category,
    };
}