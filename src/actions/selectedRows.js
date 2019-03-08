export const setSelectedTransactionId = (id) => {
  return {
    type: 'ADD_SELECTED_TRANSACTIONS',
    id
  };
};

export const removeSelectedTransactionId = (id) => {
  return {
    type: 'REMOVE_SELECTED_TRANSACTIONS',
    id
  };
};