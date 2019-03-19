import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import {Header} from '../../components/Header';

test('shoud render Header correctly',()=> {
  
  const wrapper = shallow(<Header logout={()=>{}}/>);
  expect(toJSON(wrapper)).toMatchSnapshot();
 
});