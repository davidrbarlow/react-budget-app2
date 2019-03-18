
import pageEditsReducer from '../../reducers/pageEdits';

const  pageEdits = {
  addTransaction: false,
  editTransaction: ''
}

test('should toggle add pageEdit status ', () => {
  const action = {
    type: 'TOGGLE_ADD_TRANSACTION',
  };

  const state = pageEditsReducer(pageEdits, action);
  expect(state.addTransaction).toEqual(true);
});

test('should update edit transaction id ', () => {
  const action = {
    type: 'EDIT_TRANSACTION_ID',
    id: 'abc'
  };

  const state = pageEditsReducer(pageEdits, action);
  expect(state.editTransactionId).toEqual('abc');
});

// test('should set transactions', () => {
//   const action = {
//     type: 'SET_TRANSACTIONS',
//     transactions: [transactions[1]]
//   };
//   const state = transactionsReducer(transactions, action);
//   expect(state).toEqual([transactions[1]]);
// });