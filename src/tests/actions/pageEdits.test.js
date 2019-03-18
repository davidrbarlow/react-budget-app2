import { toggleAddTransaction, editTransactionId} from '../../actions/pageEdits';

test('editTransactionId', ()=>{
  const id = 'abc';
  const action = editTransactionId(id);

  expect(action).toEqual(
    {
      type: 'EDIT_TRANSACTION_ID',
      id
    })
});

test('toggleAddTransaction', ()=>{
  const id = 'abc';
  const action = toggleAddTransaction();

  expect(action).toEqual(
    {
      type: 'TOGGLE_ADD_TRANSACTION',
    })
});