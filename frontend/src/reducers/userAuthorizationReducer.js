import {
    VERIFY_TOKEN_IN_PROGRESS,
    VERIFY_TOKEN_SUCESS,
    VERIFY_TOKEN_ERROR,
} from "../actions/types/usersActionType";


const userAuthorizationReducer = (state = {
    inprogress: false,
    error: null,
}, action) => {
    switch (action.type) {
        case VERIFY_TOKEN_IN_PROGRESS:
            return {...state, inprogress: true, error: null};
        case VERIFY_TOKEN_SUCESS:
            return {...state, inprogress: false};
        case VERIFY_TOKEN_ERROR:
            return {...state, inprogress: false, error: action.error};
        default:
            return state;
    }
};


export default userAuthorizationReducer;