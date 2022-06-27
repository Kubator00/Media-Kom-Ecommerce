import {
    ADMIN_ORDERS_IN_PROGRESS,
    ADMIN_ORDERS_SUCCESS,
    ADMIN_ORDERS_ERROR,
    ADMIN_ORDERS_RESET,
    ADMIN_ORDER_DETAILS_IN_PROGRESS,
    ADMIN_ORDER_DETAILS_SUCCESS,
    ADMIN_ORDER_DETAILS_ERROR, ADMIN_ORDER_FILTER,
} from "../actions/types/admin/adminOrderActionTypes";


export const adminAllOrdersReducer = (state = {
    inprogress: false,
    error: null,
    orders: null,
    rowsFound: null,
    limits: {beginning: 0, end: 10, increase: 10},
    filter: {status: []}
}, action) => {
    switch (action.type) {
        case ADMIN_ORDERS_IN_PROGRESS:
            return {...state, inprogress: true};
        case ADMIN_ORDERS_SUCCESS:
            return {
                ...state,
                inprogress: false,
                orders: action.orders,
                rowsFound: action.rowsFound,
                limits: {
                    ...state.limits,
                    beginning: state.limits.beginning + state.limits.increase,
                    end: state.limits.end + state.limits.increase,
                },
            };
        case ADMIN_ORDERS_ERROR:
            return {...state, inprogress: false, error: action.error};
        case ADMIN_ORDERS_RESET:
            return {
                inprogress: false,
                error: null,
                orders: [],
                rowsFound: null,
                limits: {beginning: 0, end: 10, increase: 10},
                filter: state.filter,
            };
        case ADMIN_ORDER_FILTER:
            let filterName = action.filterName;
            const tmp = state.filter;
            tmp[filterName] = action.filter;
            return {...state, tmp}
        default:
            return state;
    }
};


export const adminOrderDetailsReducer = (state = {inprogress: false, error: null, order: null}, action) => {
    switch (action.type) {
        case ADMIN_ORDER_DETAILS_IN_PROGRESS:
            return {...state, inprogress: true};
        case ADMIN_ORDER_DETAILS_SUCCESS:
            return {...state, inprogress: false, order: action.order};
        case ADMIN_ORDER_DETAILS_ERROR:
            return {...state, inprogress: false, error: action.error};
        default:
            return state;
    }
};



