import {
    DELIVERY_TYPES_IN_PROGRESS,
    DELIVERY_TYPES_SUCESS,
    DELIVERY_TYPES_ERROR
} from './deliveryActionType'


export const deliveryTypesInProgress = () => {
    return {
        type: DELIVERY_TYPES_IN_PROGRESS,
    };
}


export const deliveryTypesSucess = (deliveryTypes) => {
    return {
        type: DELIVERY_TYPES_SUCESS,
        deliveryTypes: deliveryTypes
    };
}

export const deliveryTypesError = (error) => {
    return {
        type: DELIVERY_TYPES_ERROR,
        error: error,
    };
}
