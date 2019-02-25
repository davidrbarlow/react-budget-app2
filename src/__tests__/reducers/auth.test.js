import reducer from '../../reducers/auth';

test('should set token for login',()=>{
    const action ={
        type: 'SET_AUTH_TOKEN',
        authToken: '1230uaslkdfjalsdfj'
    };
    const state = reducer({}, action);
    expect(state.uid).toBe(action.uid);
});


// test('should clear uid for logout',()=>{
//     const action = {
//         type: 'SET_AUTH_TOKEN'
//     };
//     const state = reducer({authToken: '1230uaslkdfjalsdfj'}, action);
//     expect(state).toEqual({});
// });