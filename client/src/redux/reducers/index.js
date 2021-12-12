import { combineReducers } from "redux";
import { ordersReducer, selectedOrdersReducer, ordersHistoryReducer } from "./ordersReducer";
const reducers = combineReducers({
  allOrders: ordersReducer,
  order: selectedOrdersReducer,
  orderHistory: ordersHistoryReducer,
});
export default reducers;
