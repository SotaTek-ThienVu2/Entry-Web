import { ActionTypes } from "../constants/action-types";
const intialState = {
  orders: [],
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
