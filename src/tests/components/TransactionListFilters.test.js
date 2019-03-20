import React from 'react';
import { shallow } from 'enzyme';
import { TransactionListFilters } from '../../components/TransactionListFilters';
import { filters, altFilters } from '../fixtures/filters';
import toJSON from 'enzyme-to-json';
import moment from 'moment';

let setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate, wrapper;

beforeEach(()=> {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow (
    <TransactionListFilters
    filters={filters}
    setTextFilter={setTextFilter}
    sortByDate={sortByDate}
    sortByAmount={sortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    />
  )
});

test('should render TransactionlistFilters correctly', () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render TransactionlistFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  })
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should handle text change', () =>{
  const value='Loan';
  wrapper.find('input').at(0).simulate('change', {target : {value}
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () =>{
  wrapper.setProps({
    filters: altFilters
  });
  const value='date';
  wrapper.find('select').at(0).simulate('change', {target : {value}
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () =>{
  const value='amount';
  wrapper.find('select').at(0).simulate('change', {target : {value}
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () =>{
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8,'years');
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () =>{
  const calendarFocused = 'startDate';
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});