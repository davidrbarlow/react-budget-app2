import transactions from '../fixtures/transactions';
import transactionsReducer from '../../reducers/transactions';


test('should set transactions', () => {
  const action = {
    type: 'SET_TRANSACTIONS',
    transactions: [transactions[1]]
  };
  const state = transactionsReducer(transactions, action);
  expect(state).toEqual([transactions[1]]);
});


test('should add transactions', () => {
  const transaction = {
    "_id" : "abcd",
    "amount" : 5000,
    "postedAt" : 0,
    "balance" : 5000,
    "description" : "Test transaction",
    "accountType" : "Bank",
  }
  const action = {
    type: 'ADD_TRANSACTION',
    transaction
  };
  const state = transactionsReducer(transactions, action);
  expect(state).toEqual([...transactions, transaction]);
});


test('should remove transaction', () => {
  const id = transactions[0]._id;
  const action = {
    type: 'REMOVE_TRANSACTION',
    id
  };
  const state = transactionsReducer(transactions, action);
  expect(state).toEqual([transactions[1], transactions[2]]);
});


test('should not remove transaction', () => {
  const id = -1;
  const action = {
    type: 'REMOVE_TRANSACTION',
    id
  };
  const state = transactionsReducer(transactions, action);
  expect(state).toEqual(transactions);
});

test('should remove transaction', () => {
  const ids = [transactions[1]._id, transactions[2]._id];
  const action = {
    type: 'REMOVE_TRANSACTIONS',
    ids
  };
  const state = transactionsReducer(transactions, action);
  expect(state).toEqual([transactions[0]]);
});

test('should edit transaction', () =>{
  const updates = {description: 'test description'};
  const action ={
    type:'EDIT_TRANSACTION',
    id: transactions[1]._id,
    updates
  }

  const state = transactionsReducer(transactions, action);
  expect(state[1].description).toEqual(transactions[1].description);
});