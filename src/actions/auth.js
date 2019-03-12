import axios from 'axios';
//import { resolve } from 'path';
//import { resolve } from 'url';
//import signupPage from '../components/SignupPage';

const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    const callLoginApi2 = async (email, password) => {
      try {
        const res = await callLoginApi(email, password);
        await dispatch(setLoginSuccess(true));
        await  dispatch(setAuthToken(res.headers['x-auth']));
        await  dispatch(setLoginPending(false));
      }
      catch(e) {
        dispatch(setLoginPending(false));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(true)); 
      };
    };

  return callLoginApi2(email, password);
  
  };
};
 


export function signup(email,password){
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    const callSignupApi2 = async (email, password) => {
      const res = await callSignupApi(email, password);
      
      try{
        //if (res.request.status===200)
        if (res.status===200)
       
        {
          await dispatch(setLoginSuccess(true));
          await  dispatch(setAuthToken(res.headers['x-auth']));
          dispatch(setLoginPending(false));
        }
        else {
          return Promise.reject(res);
        };
      }
      catch(res){
        dispatch(setLoginPending(false));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(true)); 
        return Promise.reject(res.data.errmsg.search("duplicate key"));
      };
    };
    return callSignupApi2(email, password);    
  };
};

const callSignupApi = (email, password) =>{
  return axios.post('http://localhost:3000/user/',{
    email,
    password
  }).then((res)=>{
    return(res)
  }).catch((e)=>{
    return(e.response);
  });
};


function setLoginPending(bool) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending : bool,
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess,
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError,
  };
};

export const setAuthToken = (authToken) => {
  return {
    type: SET_AUTH_TOKEN,
    authToken,
  };
};

const callLoginApi = (email, password) =>{
  return axios.post('http://localhost:3000/user/login',{
    email,
    password
  }).then((res)=>{
    return(res);
  }).catch((e)=>{
    return(e);
  });
};

export const setLogout = (uid) => ({
  type: 'SET_LOGOUT'
});

export const logout = (token) => {
  return dispatch => {
    const callLogoutApi2= async (token) => {  
      const res = await dispatch(setLogout(token));

      if (res.status===200){
      }
      else {
        return Promise.reject(res.data.errmsg.search("logout failed"));
      };
    };
    return callLogoutApi2(token);
    
  }
};

export const callLogoutApi = (token) => {
  return axios.post(`http://localhost:3000/user/logout/${token}`).then((res)=>{
    return(res);
  }).catch((e)=>{
    return(e);
  });
}



   

    // return callLoginApi(email, password).then((res)=>{
    //     dispatch(setLoginSuccess(true));
    //     dispatch(setAuthToken(res.headers['x-auth']));
    //     console.log('setAuthToken');
    // })
    // .then(()=>{dispatch(setLoginPending(false))})
    //     .catch((e)=>{
    //         console.log('in catch', e);
    //         dispatch(setLoginPending(false));
    //         dispatch(setLoginSuccess(false));
    //         dispatch(setLoginError(true));  
    //         return Promise.reject(e);
    // })


    // return callSignupApi(email, password).then((res)=>{
    //     if (res.request.status===200){
    //     console.log('sucess status', res)
    //     dispatch(setLoginSuccess(true));
    //     dispatch(setAuthToken(res.headers['x-auth']));
    //     dispatch(setLoginPending(false));
    //     //resolve();
    //     return;
    // }
    //    else {
    //        console.log('here else',res);     
    //     return Promise.reject(res.data.errmsg.search("duplicate key"));
    // }
      
    // });