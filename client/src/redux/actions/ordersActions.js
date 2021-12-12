import { ActionTypes } from "../constants/action-types";

export const setOrder = (orders) => {
  return {
    type: ActionTypes.SET_ORDERS,
    payload: orders,
  };
};

export const setOrderHistory = (orderHistory) => {
  return {
    type: 'SET_ORDER_HISTORY',
    payload: orderHistory,
  };
};

export const selectedOrder = (order) => {
  return {
    type: ActionTypes.SELECTED_ORDER,
    payload: order,
  };
};
export const removeSelectedOrder = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_ORDER,
  };
};
