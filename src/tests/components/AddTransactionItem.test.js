import React from 'react';
import { shallow } from 'enzyme';
import { AddTransactionItem } from '../../components/AddTransactionItem';
import transactions from '../fixtures/transactions';
import toJSON from 'enzyme-to-json';


test('should display add transaction row', () => {
  const pageEdits = {
    addTransaction : true,
  };

  const handleStateSpy = jest.fn();
  // const startAddTransactionSpy = jest.fn();
  // cosnt toggleAddTransactionSpy = jest.fn();

  const wrapper = shallow(<AddTransactionItem handleState={handleStateSpy} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
  //expect(handleStateSpy).toHaveBeenCalled();
 // wrapper.find('span').at(0).to.equal('No Transactions');
  
});

