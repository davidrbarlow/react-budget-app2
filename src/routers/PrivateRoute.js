import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
//import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
    }) => (
       
    <Route {...rest} component={(props)=>(
        isAuthenticated ? (
            <div>
                <Component {...props}/>
            </div>
        ) : (
            <Redirect to="/"/>
        )

    )}/>
);

const mapStateToProps = (state) => {
    const props = { isAuthenticated: !!state.auth.authToken };
  console.log('%%%%%%%%%%%%%%%%%%%%', props);
  return props;  
};
// const mapStateToProps = (state) => ({
//     isAuthenticated: !!state.auth.authToken,
    
// });

export default connect(mapStateToProps)(PrivateRoute);

// export const PrivateRoute = ({
//     isAuthenticated,
//     component: Component,
//     ...rest
//     }) => (
//     <Route {...rest} component={(props)=>(
//         isAuthenticated ? (
//             <div>
//                 <Component {...props}/>
//             </div>
//         ) : (
//             <Redirect to="/"/>
//         )

//     )}/>
// );