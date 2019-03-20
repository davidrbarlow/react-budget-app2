import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { SignupPage } from '../../components/SignupPage';

let wrapper;

beforeEach(()=> {
  wrapper = shallow(<SignupPage />);
});

test('shoud render Signup Page correctly',()=> { 
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('shoud set email valid true',()=> { 
  const value = 'abc@123.com';
  wrapper.find('input').at(0).simulate('change', {
    target: {value}
  });
  expect(wrapper.state('emailValidPass')).toBe(true);
});

test('shoud set email valid false',()=> { 
  const value = 'abc@123';
  wrapper.find('input').at(0).simulate('change', {
    target: {value}
  });
  expect(wrapper.state('emailValidPass')).toBe(false);
});

test('shoud set password length, number, upper, special to true',()=> { 
  const value = 'Test123!';
 // console.log(wrapper.find('input').get(1))
  wrapper.find('input').at(1).simulate('change', {
    target: {value}
  });
  expect(wrapper.state('pwLengthPass')).toBe(true);
  expect(wrapper.state('pwUpperPass')).toBe(true);
  expect(wrapper.state('pwNumberPass')).toBe(true);
  expect(wrapper.state('pwSpecialPass')).toBe(true);
});

test('shoud set password length, number, upper, special to false',()=> { 
  const value = 'asdf';
 // console.log(wrapper.find('input').get(1))
  wrapper.find('input').at(1).simulate('change', {
    target: {value}
  });
  expect(wrapper.state('pwLengthPass')).toBe(false);
  expect(wrapper.state('pwUpperPass')).toBe(false);
  expect(wrapper.state('pwNumberPass')).toBe(false);
  expect(wrapper.state('pwSpecialPass')).toBe(false);
});

test('shoud set password match true',()=> { 
  const password = 'Test123!';
  const password2 = 'Test123!';
 // console.log(wrapper.find('input').get(1))
  wrapper.find('input').at(1).simulate('change', {
    target: {value : password}
  });
  wrapper.find('input').at(2).simulate('change', {
    target: {value : password2}
  });
  expect(wrapper.state('pwMatchPass')).toBe(true);
});

test('shoud set password match false',()=> { 
  const password = 'Test123!';
  const password2 = 'Test123';
 // console.log(wrapper.find('input').get(1))
  wrapper.find('input').at(1).simulate('change', {
    target: {value : password}
  });
  wrapper.find('input').at(2).simulate('change', {
    target: {value : password2}
  });
  expect(wrapper.state('pwMatchPass')).toBe(false);
});


test('should call onSubmit prop for valid form submission', () => {
  const checkEmailPwPass = jest.fn(() => (Promise.resolve({signup : () => {}})));
  wrapper.instance().checkEmailPwPass = checkEmailPwPass;
  wrapper.update();
  const state = {email : 'abc123@test.com' , password: 'Test123!'}
  wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
  });
  expect(checkEmailPwPass).toHaveBeenCalled();
});