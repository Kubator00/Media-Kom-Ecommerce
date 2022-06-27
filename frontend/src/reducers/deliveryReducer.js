import {
    DELIVERY_TYPES_IN_PROGRESS,
    DELIVERY_TYPES_SUCESS,
    DELIVERY_TYPES_ERROR
} from '../actions/types/deliveryActionType';


export const deliveryTypesReducer = (state = { inprogress: false, error: null, deliveryTypes: [] }, action) => {
    switch (action.type) {
        case DELIVERY_TYPES_IN_PROGRESS:
            return { ...state, inprogress: true };
        case DELIVERY_TYPES_SUCESS:
            return { ...state, inprogress: false, deliveryTypes: action.deliveryTypes };
        case DELIVERY_TYPES_ERROR:
            return { ...state, inprogress: false, error: action.error };
        default:
            return state;
    }
};

