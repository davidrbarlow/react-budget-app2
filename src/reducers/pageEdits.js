const defaultState = {
  addTransaction: false,
  editTransactionId: '',
  activePage: 'dashboard'
};

export default  (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_TRANSACTION':
      return {
        ...state,
        addTransaction: !state.addTransaction
      };
    case 'EDIT_TRANSACTION_ID':
    return {
      ...state,
      editTransactionId: action.id
    };
    case 'ACTIVE_PAGE':
      return {
        ...state,
        activePage: action.activePage
      };
    default:
      return state;
  }
}