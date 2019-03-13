import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/auth.js';


class Header extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);

    }

    handleLogout = () => {
        const token = this.props.authToken;
        console.log('authToken is ',this.props.authToken);
        this.props.logout(token);
    }

    render() {
        return (
            <div className="header">
            Budget App
            <button className="header-button" onClick={this.handleLogout}>Logout</button>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logout: (token) => dispatch(logout(token))
    };
} ;

const mapStateToProps = (state) => {
    return {
        authToken: state.auth.authToken,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);