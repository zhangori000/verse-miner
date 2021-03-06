import React ,{ useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SigninContext from '../../context/signin/signinContext';
import AOS from 'aos';
import "aos/dist/aos.css";

const Signin = () => {
    const signinContext = useContext(SigninContext);
    useEffect(() => {
        AOS.init({
            delay: 200,
        });
        AOS.refresh();
    
    }, []);
    return(
        <div className='form-card text-center'>
            <h1><b>Sign In</b></h1>
            <div data-aos="flip-up" className="form">
                <input 
                    onChange={signinContext.onEmailChange}
                    type="email" 
                    name="email" 
                    placeholder="Email"
                />
                <input 
                    onChange={signinContext.onPasswordChange}
                    type="password" 
                    name="password" 
                    placeholder="Password"
                />
                <input type="submit" onClick={signinContext.onSubmitSignIn} value="Sign In" className="btn btn-dark btn-block" />
                
                <input type="submit" onClick={() => signinContext.onRouteChange('register')} value="Register" className="btn btn-light btn-block" />
                <b>Sign in feature has not been implemented yet</b>
            </div>
        </div>
        
    );
}   

export default Signin;