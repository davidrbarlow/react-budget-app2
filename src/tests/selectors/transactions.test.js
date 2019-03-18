import moment from 'moment';

import selectTransactions from '../../selectors/transactions';
import transactions from '../fixtures/transactions';

test('should filter by text value',() => {
  const filters = {
      text: 'online',
      sortBy: 'date',
      startDate: undefined,
      endDate: undefined
  }
  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([transactions[2],transactions[0]])
});

test('should filter by text startDate',() => {
  const filters = {
      text: '',
      sortBy: 'date',
      startDate: moment(0),
      endDate: undefined
  }
  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([transactions[2],transactions[0]])
});

test('should filter by text endDate',() => {
  const filters = {
      text: '',
      sortBy: 'date',
      startDate: undefined,
      endDate: moment(0)
  }
  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([transactions[0],transactions[1]])
});

test('should sort by date',() => {
  const filters = {
      text: '',
      sortBy: 'date',
      startDate: undefined,
      endDate: undefined
  }
  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([transactions[2],transactions[0],transactions[1]])
});

test('should sort by date',() => {
  const filters = {
      text: '',
      sortBy: 'amount',
      startDate: undefined,
      endDate: undefined
  }
  const result = selectTransactions(transactions, filters);
  expect(result).toEqual([transactions[0],transactions[2],transactions[1]])
});
