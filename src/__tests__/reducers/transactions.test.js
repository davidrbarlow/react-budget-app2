import transactions from '../fixtures/transactions';
import transactionsReducer from '../../reducers/transactions';


test('should set expenses', () => {
  console.log('test');
  const action = {
    type: 'SET_TRANSACTIONS',
    transactions: [transactions[1]]
  };
  const state = transactionsReducer(transactions, action);
  expect(state).toEqual([transactions[1]]);
})