import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/auth.js';

const Header = () => (
    <div className="header">
     Budget App
     <button className="header-button">Logout</button>
    </div>
);

const mapDispatchToProps = (dispatch) => {
    return{
        logout: (token) => dispatch(logout(token))
    };
} ;

const mapStateToProps = (state) => {
    return {
        auth: state.auth.authToken,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);