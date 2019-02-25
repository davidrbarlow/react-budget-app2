const transactionsReducerDefaultState = [];

export default (state = transactionsReducerDefaultState, action)=>{
  switch (action.type){
    case 'ADD_TRANSACTION':
    console.log('adding trans in reducer');
      return [
          ...state,
      action.transaction];
    case 'REMOVE_TRANSACTION':
      return state.filter((transaction)=>{return action.id !== transaction.id });
    case 'EDIT_TRANSACTION':
      return state.map((transaction)=>{
        if (transaction.id === action.id){
          return {
            ...transaction,
            ...action.updates
          };
        } else {
          return transaction;
        };
      });
    case 'SET_TRANSACTIONS':
        return action.transactions;
    default:
        return state;
  }


}