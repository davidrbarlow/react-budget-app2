import {setSelectedTransactionId, removeSelectedTransactionId, removeSelectedTransactionIds} from '../../actions/selectedRows';

test('setSelectedTransactionId', ()=>{
  const id = 'abc';
  const action = setSelectedTransactionId(id);

  expect(action).toEqual(
    {
      type: 'ADD_SELECTED_TRANSACTION',
      id
    })
});

test('removeSelectedTransactionId', ()=>{
  const id = 'abc';
  const action = removeSelectedTransactionId(id);

  expect(action).toEqual(
    {
      type: 'REMOVE_SELECTED_TRANSACTION',
      id
    })
});

test('removeSelectedTransactionIds', ()=>{
  const ids = ['abc','123'];
  const action = removeSelectedTransactionIds(ids);

  expect(action).toEqual(
    {
      type: 'REMOVE_SELECTED_TRANSACTIONS',
      ids
    })
});