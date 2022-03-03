import routes from "./api"
import {
    deliveryTypesInProgress,
    deliveryTypesSucess,
    deliveryTypesError,
} from "../actions/deliveryAction"
import Axios from "axios"

export const fetchDeliveryTypes = () => {
    return async dispatch => {
        dispatch(deliveryTypesInProgress);
        await Axios.post(routes.server + routes.delivery.types)
            .then((res) => {
                dispatch(deliveryTypesSucess(res.data.deliveryTypes));
                return res;
            })
            .catch((err) => {
                dispatch(deliveryTypesError(err));
                return err;
            });
    };
}