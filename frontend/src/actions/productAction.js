import{
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_FETCH_IN_PROGRESS,
    PRODUCT_FETCH_ERROR,
} from './types/productActionType'

export const productFetchInProgress = () => {
    return {
        type: PRODUCT_FETCH_IN_PROGRESS,
    };
}

export const productFetchSuccess = (productDetails,productParameters) => {
    return {
        type: PRODUCT_FETCH_SUCCESS,
        productDetails: productDetails,
        productParameters: productParameters,
    };
}

export const productFetchError = (error) => {
    return {
        type: PRODUCT_FETCH_ERROR,
        error: error
    };
}
