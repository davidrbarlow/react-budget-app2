import React from 'react';
import { shallow } from 'enzyme';
import { TransactionItemForm } from '../../components/TransactionItemForm';
import transactions from '../fixtures/transactions';
import toJSON from 'enzyme-to-json';
import moment from 'moment';


test('should render TransactionForm correctly', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<TransactionItemForm onSubmit={onSubmitSpy}/>);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render TransactionForm correctly with transaction data', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<TransactionItemForm transaction={transactions[0]} onSubmit={onSubmitSpy}/>);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<TransactionItemForm />);
  wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should set decription on input change', () => {
  const value = 'New Description';
  const wrapper = shallow(<TransactionItemForm />);
  wrapper.find('input').at(0).simulate('change', {
      target: {value}
  })
  //console.log(wrapper.find('input').get(0));
  expect(wrapper.state('description')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '23.50';
  const wrapper = shallow(<TransactionItemForm />);
  console.log(wrapper);
  wrapper.find('input').at(2).simulate('change', {
      target: {value}
  })
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '12.122';
  const wrapper = shallow(<TransactionItemForm />);
  wrapper.find('input').at(2).simulate('change', {
      target: {value}
  })
  expect(wrapper.state('amount')).toBe('');
});

test('should set cycle to', () => {
  const value = 'Monthly';
  const wrapper = shallow(<TransactionItemForm />);
  wrapper.find('select').at(0).simulate('change', {
      target: {value}
  })
  expect(wrapper.state('cycle')).toBe(value);
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<TransactionItemForm transaction={transactions[0]} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
      accountType: 'Manual',
      description: transactions[0].description,
      amount : transactions[0].amount,
      postedAt : transactions[0].postedAt,
      cycle : undefined,
  });
});

test('should set new date onDateChange', () => {
  const wrapper = shallow(<TransactionItemForm />);
  const now = moment();
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
  expect(wrapper.state('postedAt')).toEqual(now);
});

test('should set calendar focus on date change', () => {
  const focused = true;
  const wrapper = shallow(<TransactionItemForm />);
  const now = moment();
  //console.log(wrapper.find('withStyles(SingleDatePicker)').get(0));
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused})
  expect(wrapper.state('calendarFocused')).toEqual(focused);
});



