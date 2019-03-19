import reducer from '../../reducers/auth';

test('should set token for login',()=>{
    const action ={
        type: 'SET_AUTH_TOKEN',
        authToken: '1230uaslkdfjalsdfj'
    };
    const state = reducer({}, action);
    expect(state.uid).toEqual(action.uid);
});

test('should set login pending to true',()=>{
    const action ={
        type: 'SET_LOGIN_PENDING',
        isLoginPending: true
    };
    const state = reducer({}, action);
    expect(state.isLoginPending).toEqual(action.isLoginPending);
});

test('should set login success to true',()=>{
    const action ={
        type: 'SET_LOGIN_SUCCESS',
        isLoginPending: true
    };
    const state = reducer({}, action);
    expect(state.isLoginSuccess).toEqual(action.isLoginSuccess);
});

test('should set login error to true',()=>{
    const action ={
        type: 'SET_LOGIN_ERROR',
        isLoginPending: true
    };
    const state = reducer({}, action);
    expect(state.loginError).toEqual(action.loginError);
});

test('should set logout',()=>{
    const action ={
        type: 'SET_LOGOUT',
        isLoginPending: true
    };
    const state = reducer({}, action);
    expect(state).toEqual({});
});



// test('should clear uid for logout',()=>{
//     const action = {
//         type: 'SET_AUTH_TOKEN'
//     };
//     const state = reducer({authToken: '1230uaslkdfjalsdfj'}, action);
//     expect(state).toEqual({});
// });