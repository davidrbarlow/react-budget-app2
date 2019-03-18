import fitlersReducer from '../../reducers/filters';
import moment from 'moment';

const filters = {  
  text: '',
  sortBy: 'date', 
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

test('should set text filter ', () => {
  const action = {
    type: 'SET_TEXT_FILTER',
    text: 'online'
  };
  const state = fitlersReducer(filters, action);
  expect(state.text).toEqual('online');
});

test('should set sort by to amount ', () => {
  const action = {
    type: 'AMOUNT_SORT'
  };
  const state = fitlersReducer(filters, action);
  expect(state.sortBy).toEqual('amount');
});

test('should set sort by to date ', () => {
  const action = {
    type: 'DATE_SORT'
  };
  const state = fitlersReducer(filters, action);
  expect(state.sortBy).toEqual('date');
});

test('should set start date ', () => {
  const action = {
    type: 'SET_START_DATE',
    startDate: moment(10000)
  };
  const state = fitlersReducer(filters, action);
  expect(state.startDate).toEqual(moment(10000));
});

test('should set end date ', () => {
  const action = {
    type: 'SET_END_DATE',
    endDate: moment(10000)
  };
  const state = fitlersReducer(filters, action);
  expect(state.endDate).toEqual(moment(10000));
});

