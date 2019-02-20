import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {setAuthToken, login, signup} from '../../../src/actions/auth';

const createMockStore = configureMockStore([thunk]);

test('should set authorization token',()=>{
  const authToken = 'adlfjaldfkladfjdklad';
  const action = setAuthToken(authToken);
  expect(action).toEqual({
    type: 'SET_AUTH_TOKEN',
    authToken: authToken
  });
});

test('should set auth token return 200',(done)=>{
  const store = createMockStore({});
  const email = 'abc@123.com';
  const password = 'Test123!';
  console.log('auth token return 200');
  store.dispatch(login(email, password)).then((res)=>{
      
    const actions = store.getActions();
    const pendingAction = actions.filter(action => action.type === 'SET_LOGIN_PENDING');
    const successAction = actions.filter(action => action.type === 'SET_LOGIN_SUCCESS');
    const errorAction = actions.filter(action => action.type === 'SET_LOGIN_ERROR');
    const setToken = actions.filter(action => action.type === 'SET_AUTH_TOKEN');
    expect(successAction[1]).toEqual({
      type: 'SET_LOGIN_SUCCESS',
      isLoginSuccess : true
    });
    expect(setToken[0]).toEqual({
      type: 'SET_AUTH_TOKEN',
      authToken: expect.any(String)    
    });
    done();
  });
});

test('should set auth token return 400',(done)=>{
  const store = createMockStore({});
  const email = 'abc@123.com';
  const password = 'adsfadsf';

  console.log('400 about to dispatch');
  
  store.dispatch(login(email, password))
  .then((res)=>{
    done();
  })
  .catch((e)=>{
    const actions = store.getActions(); 
    const successAction = actions.filter(action => action.type === 'SET_LOGIN_SUCCESS');
    expect(successAction[2])
    .toEqual({
        type: 'SET_LOGIN_SUCCESS',
        isLoginSuccess : false
    });
  
  done();
  });
});

// test('should sign up new user',(done)=>{
  
//   const store = createMockStore({});

//   const min=100; 
//   const max=200;  
//   const random =Math.floor(Math.random() * (+max - +min)) + +min;

//   const email = 'abc'+random+'@123.com';
//   const password = 'Test123!';



//   store.dispatch(signup(email, password)).then((res)=>{
//     const actions = store.getActions(); 
//     const setToken = actions.filter(action => action.type === 'SET_AUTH_TOKEN');
//     expect(setToken[0]).toEqual({
//       type: 'SET_AUTH_TOKEN',
//       authToken: expect.any(String)    
//     });
//     done();
//   });
// });

test('should return username already taken',(done)=>{
  
  const store = createMockStore({});
  const email = 'abc@123.com';
  const password = 'Test123!';

  store.dispatch(signup(email, password)).then((res)=>{
  }).catch((e)=>{
    expect(e.data.code).toEqual(11000);
    done();
  });
});





// test('***should set auth token return test',(done)=>{
//     const store = createMockStore({});
//     const email = 'abc@123.com';
//     const password = 'Test123!';
//     const test = login(email, password);

//     console.log('test',store.dispatch(test));
//     store.dispatch(test).then((res)=>{
//         console.log('then',res);
//         done();
//     })
  
// });
  
