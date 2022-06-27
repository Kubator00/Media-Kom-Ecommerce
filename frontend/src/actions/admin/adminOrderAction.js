import {
    ADMIN_ORDERS_IN_PROGRESS,
    ADMIN_ORDERS_SUCCESS,
    ADMIN_ORDERS_ERROR,
    ADMIN_ORDER_DETAILS_IN_PROGRESS,
    ADMIN_ORDER_DETAILS_SUCCESS,
    ADMIN_ORDER_DETAILS_ERROR,
    ADMIN_ORDERS_RESET,
    ADMIN_ORDER_FILTER
} from '../types/admin/adminOrderActionTypes'


export const adminOrdersInProgress = () => {
    return {
        type: ADMIN_ORDERS_IN_PROGRESS,
    };
}

export const adminOrdersSuccess = (orders, rowsFound) => {
    return {
        type: ADMIN_ORDERS_SUCCESS,
        orders: orders,
        rowsFound: rowsFound,
    };
}

export const adminOrdersError = (err) => {
    return {
        type: ADMIN_ORDERS_ERROR,
        error: err
    };
}

export const adminOrdersReset = () => {
    return {
        type: ADMIN_ORDERS_RESET,
    }
}


export const adminOrderDetailsInProgress = () => {
    return {
        type: ADMIN_ORDER_DETAILS_IN_PROGRESS,
    };
}

export const adminOrderDetailsSuccess = (order) => {
    return {
        type: ADMIN_ORDER_DETAILS_SUCCESS,
        order: order,
    };
}

export const adminOrderDetailsError = (err) => {
    return {
        type: ADMIN_ORDER_DETAILS_ERROR,
        error: err
    };
}


export const adminOrderFilter = (filterName,filterData)=>{
    return{
        type: ADMIN_ORDER_FILTER,
        filterName: filterName,
        filter: filterData
    };
}