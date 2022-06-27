import { combineReducers } from "redux";
import userAuthenticationReducer from "./userAuthenticationReducer";
import cartReducer from "./cartReducer";
import { newOrderReducer, userOrdersReducer, userOrderDetailsReducer } from "./orderReducer";
import { adminAllOrdersReducer, adminOrderDetailsReducer } from "./adminOrderReducer";
import { searchProductsReducer } from "./searchReducer";
import { deliveryTypesReducer } from "./deliveryReducer";
import { productReducer } from "./productReducer";
import {adminAddProductReducer, adminEditProductReducer} from "./adminProductReducer";
import {userAccountDetailsReducer, userChangeEmailReducer,userChangePasswordReducer} from "./userAccountDetailsReducer";
import userAuthorizationReducer from "./userAuthorizationReducer";
import {recommendedProductsReducer} from "./recommendedProductsReducer";

export default combineReducers({
    userAuthenticationReducer,
    userAuthorizationReducer,
    cartReducer,
    newOrderReducer,
    userOrdersReducer,
    userOrderDetailsReducer,
    adminAllOrdersReducer,
    adminOrderDetailsReducer,
    searchProductsReducer,
    deliveryTypesReducer,
    productReducer,
    adminAddProductReducer,
    adminEditProductReducer,
    userAccountDetailsReducer,
    userChangeEmailReducer,
    userChangePasswordReducer,
    recommendedProductsReducer
})