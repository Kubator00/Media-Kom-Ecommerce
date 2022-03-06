import {
    NEW_ORDER_IN_PROGRESS,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_ERROR,
    USER_ORDERS_IN_PROGRESS,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_ERROR,
    USER_ORDER_DETAILS_IN_PROGRESS,
    USER_ORDER_DETAILS_SUCCESS,
    USER_ORDER_DETAILS_ERROR,
} from "../actions/orderActionType";


export const newOrderReducer = (state = { inprogress: false, error: null, msg: '' }, action) => {
    switch (action.type) {
        case NEW_ORDER_IN_PROGRESS:
            return { ...state, inprogress: true };
        case NEW_ORDER_SUCCESS:
            return { ...state, inprogress: false, msg: action.msg };
        case NEW_ORDER_ERROR:
            return { ...state, inprogress: false, error: action.error };
        default:
            return state;
    }
};

export const userOrdersReducer = (state = { inprogress: false, error: null, rowsFound: 0, orders: null }, action) => {

    switch (action.type) {
        case USER_ORDERS_IN_PROGRESS:
            return { ...state, inprogress: true };
        case USER_ORDERS_SUCCESS:
            console.log({ ...state, inprogress: false, rowsFound: action.rowsFound, orders: action.orders });
            return { ...state, inprogress: false, rowsFound: action.rowsFound, orders: action.orders };
        case USER_ORDERS_ERROR:
            return { ...state, inprogress: false, error: action.error };
        default:
            return state;
    }
};


export const userOrderDetailsReducer = (state = { inprogress: false, error: null, order: null }, action) => {

    switch (action.type) {
        case USER_ORDER_DETAILS_IN_PROGRESS:
            return { ...state, inprogress: true };
        case USER_ORDER_DETAILS_SUCCESS:
            return { ...state, inprogress: false,  order: action.order };
        case USER_ORDER_DETAILS_ERROR:
            return { ...state, inprogress: false, error: action.error };
        default:
            return state;
    }
};




