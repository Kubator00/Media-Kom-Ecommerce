import {
    RECOMMENDED_PRODUCTS_IN_PROGRESS,
    RECOMMENDED_PRODUCTS_SUCCESS,
    RECOMMENDED_PRODUCTS_ERROR
} from "./types/recommendedProductsActionType";


export const recommendedProductsInProgress = () => {
    return {
        type: RECOMMENDED_PRODUCTS_IN_PROGRESS,
    };
}

export const recommendedProductsSuccess = (products) => {
    return {
        type: RECOMMENDED_PRODUCTS_SUCCESS,
        products: products,
    };
}

export const recommendedProductsError = (error) => {
    return {
        type: RECOMMENDED_PRODUCTS_ERROR,
        error: error
    };
}

