import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import cartReducer from "./cartReducer";
import { newOrderReducer, userOrdersReducer, userOrderDetailsReducer } from "./orderReducer";
import { adminAllOrdersReducer, adminOrderDetailsReducer } from "./adminOrderReducer";
import { searchProductsReducer } from "./searchReducer";
export default combineReducers({
    usersReducer,
    cartReducer,
    newOrderReducer,
    userOrdersReducer,
    userOrderDetailsReducer,
    adminAllOrdersReducer,
    adminOrderDetailsReducer,
    searchProductsReducer,
})