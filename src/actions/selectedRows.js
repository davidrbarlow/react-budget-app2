export const setSelectedTransactionId = (id) => {
  return {
    type: 'ADD_SELECTED_TRANSACTION',
    id
  };
};

export const removeSelectedTransactionId = (id) => {
  return {
    type: 'REMOVE_SELECTED_TRANSACTION',
    id
  };
};

export const removeSelectedTransactionIds = (ids) => {
  return {
    type: 'REMOVE_SELECTED_TRANSACTIONS',
    ids
  };
};