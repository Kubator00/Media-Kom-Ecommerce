import {
    ADMIN_ADD_PRODUCT_IN_PROGRESS,
    ADMIN_ADD_PRODUCT_SUCCESS,
    ADMIN_ADD_PRODUCT_ERROR,
    ADMIN_EDIT_PRODUCT_IN_PROGRESS,
    ADMIN_EDIT_PRODUCT_SUCCESS,
    ADMIN_EDIT_PRODUCT_ERROR
} from "../actions/adminProductType";

export const adminAddProductReducer = (state = {
    inprogress: false,
    error: null,
    msg: null,
    productId: null,
}, action) => {
    switch (action.type) {
        case ADMIN_ADD_PRODUCT_IN_PROGRESS:
            return {...state, inprogress: true};
        case ADMIN_ADD_PRODUCT_SUCCESS:
            return {...state, inprogress: false, msg: action.msg, productId: action.productId};
        case ADMIN_ADD_PRODUCT_ERROR:
            return {...state, inprogress: false, error: action.error};
        default:
            return state;
    }
}

export const adminEditProductReducer = (state = {
    inprogress: false,
    error: null,
    msg: null,
}, action) => {
    console.log(action)
    switch (action.type) {
        case ADMIN_EDIT_PRODUCT_IN_PROGRESS:
            return {...state, inprogress: true};
        case ADMIN_EDIT_PRODUCT_SUCCESS:
            return {...state, inprogress: false, msg: action.msg};
        case ADMIN_EDIT_PRODUCT_ERROR:
            return {...state, inprogress: false, error: action.error};
        default:
            return state;
    }
}