import React from 'react';
import { shallow } from 'enzyme';
import { TransactionList } from '../../components/TransactionList';
import transactions from '../fixtures/transactions';
//import { wrap } from 'module';
import toJSON from 'enzyme-to-json';


const pageEdits = {
  addTransaction : false,
};

test('should render TransactionList with Transcations ',() => {
  const wrapper = shallow(<TransactionList transactions={transactions} pageEdits={pageEdits} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should display add transaction row', () => {
  const pageEdits = {
    addTransaction : true,
  };

  const wrapper = shallow(<TransactionList transactions={transactions} pageEdits={pageEdits} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
 // wrapper.find('span').at(0).to.equal('No Transactions');
  
});

test('should display no transactions if no transactions', () => {
  const transcations = [];
  const wrapper = shallow(<TransactionList transactions={transcations} pageEdits={pageEdits} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
 // wrapper.find('span').at(0).to.equal('No Transactions');
  
});



