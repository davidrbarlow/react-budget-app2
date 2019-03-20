const defaultState = {
  addTransaction: false,
  editTransactionId: '',
  //editTransaction: false
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
    default:
      return state;
  }
}