import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";
import reducers from './reducers/index';

const middlewares = [thunk];
const store = createStore(reducers, applyMiddleware(...middlewares));
export default store;