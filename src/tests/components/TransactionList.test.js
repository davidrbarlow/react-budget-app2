import React from 'react';
import { shallow } from 'enzyme';
import { TransactionList } from '../../components/TransactionList';
import transactions from '../fixtures/transactions';
import { wrap } from 'module';
import toJSON from 'enzyme-to-json';

const pageEdits = {
  addTransaction : false,
}

test('should render TransactionList with Transcations ',() => {
  const wrapper = shallow(<TransactionList transactions={transactions} pageEdits={pageEdits} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});