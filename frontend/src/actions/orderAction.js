import {
    NEW_ORDER_IN_PROGRESS,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_ERROR,
    USER_ORDERS_IN_PROGRESS,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_ERROR,
    USER_ORDERS_FILTER,
    USER_ORDER_DETAILS_IN_PROGRESS,
    USER_ORDER_DETAILS_SUCCESS,
    USER_ORDER_DETAILS_ERROR,
} from './orderActionType';


export const newOrderInProgress = () => {
    return {
        type: NEW_ORDER_IN_PROGRESS,
    };
}

export const newOrderSuccess = (msg) => {
    return {
        type: NEW_ORDER_SUCCESS,
        msg: msg,
    };
}

export const newOrderError = error => {
    return {
        type: NEW_ORDER_ERROR,
        error: error
    };
}


export const userOrdersInProgress = () => {
    return {
        type: USER_ORDERS_IN_PROGRESS,
    };
}

export const userOrdersSuccess = (orders, rowsFound) => {
    return {
        type: USER_ORDERS_SUCCESS,
        orders: orders,
        rowsFound: rowsFound,
    };
}

export const userOrdersError = () => {
    return {
        type: USER_ORDERS_ERROR,
    };
}

export const userOrdersFilter = (filterName, filterData) => {
    return {
        type: USER_ORDERS_FILTER,
        filterName: filterName,
        filter: filterData
    };
}


export const userOrderDetailsInProgress = () => {
    return {
        type: USER_ORDER_DETAILS_IN_PROGRESS,
    };
}

export const userOrderDetailsSuccess = (order) => {
    return {
        type: USER_ORDER_DETAILS_SUCCESS,
        order: order,
    };
}

export const userOrderDetailsError = (err) => {
    return {
        type: USER_ORDER_DETAILS_ERROR,
        error: err
    };
}
