import { ActionTypes } from "../constants/action-types";
const intialState = {
  orders: [],
  orderHistory:[]
};

export const ordersReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDERS:
      return { ...state, orders: payload };
    default:
      return state;
  }
};

export const selectedOrdersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_ORDER:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_ORDER:
      return {};
    default:
      return state;
  }
};

export const ordersHistoryReducer = (state = intialState.orderHistory, { type, payload }) => {
  switch (type) {
    case 'SET_ORDER_HISTORY':
      return { ...state, orderHistory: payload };
    default:
      return state;
  }
};

