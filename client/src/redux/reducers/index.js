import { combineReducers } from "redux";
import { ordersReducer, selectedOrdersReducer } from "./ordersReducer";
const reducers = combineReducers({
  allOrders: ordersReducer,
  order: selectedOrdersReducer,
});
export default reducers;
