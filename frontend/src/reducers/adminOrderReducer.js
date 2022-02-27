import {
    ADMIN_ORDERS_IN_PROGRESS,
    ADMIN_ORDERS_SUCCESS,
    ADMIN_ORDERS_ERROR,
    ADMIN_ORDERS_RESET,
    ADMIN_ORDER_DETAILS_IN_PROGRESS,
    ADMIN_ORDER_DETAILS_SUCCESS,
    ADMIN_ORDER_DETAILS_ERROR,
} from "../actions/adminOrderActionTypes";



export const adminAllOrdersReducer = (state = { inprogress: false, error: null, orders: [], rowsFound: null, limits: { beginning: 0, end: 5, increase: 5 } }, action) => {
    switch (action.type) {
        case ADMIN_ORDERS_IN_PROGRESS:
            return { ...state, inprogress: true };
        case ADMIN_ORDERS_SUCCESS:
            return {
                ...state,
                inprogress: false,
                orders: [...state.orders, ...action.orders],
                rowsFound: action.rowsFound,
                limits: {
                    ...state.limits,
                    beginning: state.limits.beginning + state.limits.increase,
                    end: state.limits.end + state.limits.increase,
                }
            };
        case ADMIN_ORDERS_ERROR:
            return { ...state, inprogress: false, error: action.error };
        case ADMIN_ORDERS_RESET:
            return  { inprogress: false, error: null, orders: [], rowsFound: null, limits: { beginning: 0, end: 5, increase: 5 } };
        default:
            return state;
    }
};


export const adminOrderDetailsReducer = (state = { inprogress: false, error: null, order: null }, action) => {
    switch (action.type) {
        case ADMIN_ORDER_DETAILS_IN_PROGRESS:
            return { ...state, inprogress: true };
        case ADMIN_ORDER_DETAILS_SUCCESS:
            return { ...state, inprogress: false, order: action.order };
        case ADMIN_ORDER_DETAILS_ERROR:
            return { ...state, inprogress: false, error: action.error };
        default:
            return state;
    }
};



