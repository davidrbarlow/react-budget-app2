

export const toggleAddTransaction = () => {
  return {
    type: 'TOGGLE_ADD_TRANSACTION',
  };
};


export const editTransactionId = (id) => {
  return {
    type: 'EDIT_TRANSACTION_ID',
    id
  };
};

export const setActivePage = (activePage) => {
  return {
    type: 'ACTIVE_PAGE',
    activePage
  };
};








