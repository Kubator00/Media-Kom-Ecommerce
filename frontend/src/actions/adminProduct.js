import {
    ADMIN_ADD_PRODUCT_IN_PROGRESS,
    ADMIN_ADD_PRODUCT_SUCCESS,
    ADMIN_ADD_PRODUCT_ERROR,
    ADMIN_EDIT_PRODUCT_IN_PROGRESS,
    ADMIN_EDIT_PRODUCT_SUCCESS,
    ADMIN_EDIT_PRODUCT_ERROR
} from "./adminProductType";


export const adminAddProductInProgress = () => {
    return {
        type: ADMIN_ADD_PRODUCT_IN_PROGRESS,
    };
}

export const adminAddProductSuccess = (msg, productId) => {
    return {
        type: ADMIN_ADD_PRODUCT_SUCCESS,
        msg: msg,
        productId: productId,
    };
}

export const adminAddProductError = error => {
    return {
        type: ADMIN_ADD_PRODUCT_ERROR,
        error: error
    };
}


export const adminEditProductInProgress = () => {
    return {
        type: ADMIN_EDIT_PRODUCT_IN_PROGRESS,
    };
}

export const adminEditProductSuccess = (msg) => {
    return {
        type: ADMIN_EDIT_PRODUCT_SUCCESS,
        msg: msg,
    };
}

export const adminEditProductError = error => {
    return {
        type: ADMIN_EDIT_PRODUCT_ERROR,
        error: error
    };
}

