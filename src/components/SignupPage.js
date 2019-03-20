import React from 'react';
import {connect} from 'react-redux';
import {signup} from '../actions/auth';

export class SignupPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // pwLengthPass: false,
            // pwUpperPass: false,
            // pwNumberPass:false,
            // pwSpecialPass:false,
            // pwMatchPass: false,
            //  emValidPass: true
        };

        this.onPasswordChange = this.onPasswordChange.bind(this);       
    };


    checkPasswordLength = (password) => {
        password.length>=0 && password.length < 8 ? this.setState({pwLengthColor: 'red', pwLengthPass: false}) 
       : this.setState({pwLengthColor: 'green', pwLengthPass:true})  ; 
    }

    checkPasswordUpper= (password) => {
       let upperCharacter = (/[A-Z]/.test(password));
            upperCharacter ? this.setState({pwUpperColor: 'green', pwUpperPass: true}) 
        : this.setState({pwUpperColor: 'red', pwUpperPass:false})  ; 
     }

    checkPasswordNumber= (password) => {
        let number = (/[0-9]/.test(password));
        number ? this.setState({pwNumberColor: 'green', pwNumberPass: true}) 
         : this.setState({pwNumberColor: 'red', pwNumberPass:false})  ; 
      }

    checkPasswordSpecial= (password) => {
      
       const pattern= /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/;
        let specialCharacter =pattern.test(password);
       specialCharacter ? this.setState({pwSpecialColor: 'green', pwSpecialPass: true}) 
         : this.setState({pwSpecialColor: 'red', pwSpecialPass:false})  ; 
      }

    checkPasswordMatch= (password, password2) => {
        (password2 === password) ? this.setState({pwMatchColor: 'green', pwMatchPass: true}) 
        : this.setState({pwMatchColor: 'red', pwMatchPass: false}) 
        
       }

    checkValidEmail = (email) => {
        var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail =pattern.test(email);
        validEmail ? this.setState({emailValidColor: 'green', emailValidPass: true}) 
          : this.setState({emailValidColor: 'red', emailValidPass:false})  ; 
    }

    onEmailChange = (e) =>{
        const email = e.target.value;
        this.setState(()=>({email}));
        this.checkValidEmail(email);
    };

    onPasswordChange = (e) => {
        
        const password = e.target.value;
        const password2 = this.state.password2;
        this.setState(()=>({password}));
        this.checkPasswordLength(password);
        this.checkPasswordUpper(password);
        this.checkPasswordSpecial(password);
        this.checkPasswordNumber(password);
        this.checkPasswordMatch(password, password2);
    }

    onPassword2Change = (e) => {
        const password2 = e.target.value;
        this.setState(()=>({password2}));
        let password = this.state.password;
        this.checkPasswordMatch(password, password2);
    }

    handleSubmit =  (e) => {
        e.preventDefault();
        let { email, password} = this.state;
        this.checkEmailPwPass().then((r)=>{
            this.props.signup(email, password)
            .catch((res)=>{
                console.log('email already in use');
                res ? this.setState({error: 'Email already registered'}) : console.log("search failed");      
            }).catch((e)=>{console.log('no match')});
      })
    };

    checkEmailPwPass = async () => {
        
        if (this.state.pwLengthPass && this.state.pwUpperPass && this.state.pwNumberPass && this.state.pwSpecialPass 
            && this.state.pwMatchPass && this.state.emailValidPass) {  
                console.log('async',this.state) ;
                this.setState({error: ''});
                return 'return value from async';
        } else {
                this.setState({error: 'Please enter valid username/password'});
                throw new Error('no match in promise')}
    } 

    render(){
        return(
        <div>
            <h1>Budget</h1>
            <p>It's time to get your expenses under control.</p>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handleSubmit} id="login-form" className="signup-form">
            <div className="login-text-input">
                <input
                type="text"
                name="email"
                placeholder="email"
                autoFocus
                className="input-text input-text__login"
                onChange={this.onEmailChange}
                />
                <input
                name="password"
                type="password"
                placeholder="Password"
                className="input-text input-text__login"
                onChange={this.onPasswordChange}
                />
                <input
                name="password2"
                type="password"
                placeholder="Re-enter Password"
                className="input-text input-text__login"
                onChange={this.onPassword2Change}
                />
            </div>     
            <span style={{color:this.state.emailValidColor}}>enter valid email</span>
            <span style={{color:this.state.pwLengthColor}}>password must be 8 characters</span>
            <span style={{color:this.state.pwUpperColor}}>password must contain a capital letter</span>
            <span style={{color:this.state.pwSpecialColor}}>Password must contain special character</span>
            <span style={{color:this.state.pwNumberColor}}>Password must contain a number</span>
            <span style={{color:this.state.pwMatchColor}}>Passwords must match</span>
            <button className="button button__submit">
            Signup
            </button>
            </form>
        </div>
        );
    };

};

const mapDispatchToProps = (dispatch) => {
    return{
        signup: (email,password) => dispatch(signup(email,password))
    };
};


export default connect(undefined, mapDispatchToProps)(SignupPage);