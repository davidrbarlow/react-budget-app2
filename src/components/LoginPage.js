import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import {Link} from 'react-router-dom';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.autoComplete = 'yes';
        this.errorMessage = 'Username/Password is incorrect!'

    };

    onEmailChange = (e) =>{
        const email = e.target.value;
        this.setState(()=>({email}));
    };

    onPasswordChange = (e) =>{
        const password = e.target.value;
        this.setState(()=>({password}));
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        let { email, password } = this.state;
        this.props.login(email, password);
        this.setState({
        email: '',
        password: ''
        });
        document.getElementById("login-form").reset();
  }


render(){
    //let {email, password} = this.state;
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    return(
        <div className="login-container">
            <div className="login-content-box">
                <div className="login-header">
                    <h1>Budget</h1>
                    <p>It's time to get your expenses under control.</p>
                    <div className="text-login">
                    { isLoginPending && <div className="text-login__status">Please wait...</div> }
                    { isLoginSuccess && <div className="text-login__status">Success!</div> }
                    { loginError && <div className="text-login__error">{this.errorMessage}</div> }
                    { console.log('login Error', this.props)}
                </div>
                </div>
                <div className="login">  
                    <form 
                    onSubmit={this.handleSubmit} id="login-form" 
                    autoComplete={this.autoComplete}
                    className="login-form">
                        
                        <div className="">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            autoFocus={true}
                            className="input-text input-text__login"
                            //value={this.state.emal}
                            onChange={this.onEmailChange}
                        />  
                        </div>
                        <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="input-text input-text__login"
                            //value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                        
                        </div>
                        <div className="login-page-sign-in-up">
                        <button className="button button__submit">
                        Login
                        </button>
                        <div>
                            <Link to="/signup">Sign up</Link>
                        </div>
                        
                        </div>  
                    </form>
                </div>
            </div>
        </div>
        
        );
    };
};

const mapStateToProps = (state)=>{
    return {
    isLoginPending: state.auth.isLoginPending,
    isLoginSuccess: state.auth.isLoginSuccess,
    loginError: state.auth.loginError,
    authToken: state.auth.authToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        login: (email,password) => dispatch(login(email,password))
    };
};
// const mapDispatchToProps = (dispatch) => ({
//     startLogin2: () => dispatch(startLogin2())
// });



//export default connect(undefined, mapDispatchToProps)(LoginPage);

// cons mapDispatchToProps

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

//export default LoginPage;

