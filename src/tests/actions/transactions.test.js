import { addTransaction, editTransaction, removeTransaction } from '../../actions/transactions';

test('should setup remove transaction object', () => {
  const action = removeTransaction('123abc');
  expect(action).toEqual({
    type: 'REMOVE_TRANSACTION',
    id: '123abc'
  })
});

test('should setup edit transaction object', () => {
  const action = editTransaction('123abc', {description: 'testing desc'});
  expect(action).toEqual({
    type: 'EDIT_TRANSACTION',
    id: '123abc',
    updates: {description: 'testing desc'}
  })
});

test('should setup add transaction object', () => {
  const transactionData = {
    description: 'Rent',
    amount: 1234,
    postedAt: 0,
    cycle: 'Monthly'
  };
  const action = addTransaction(transactionData);
  expect(action).toEqual({
    type: 'ADD_TRANSACTION',
    transaction: {
      ...transactionData
    }
  })
});

test('should default add transaction object', () => {
  
  const action = addTransaction();
  expect(action).toEqual({
    type: 'ADD_TRANSACTION',
    transaction: expect.toBeUndefined
  })
});
