import React ,{ useContext, useEffect } from 'react';
import SigninContext from '../../context/signin/signinContext';
import AOS from 'aos';
import "aos/dist/aos.css";

const Register = () => {
    const signinContext = useContext(SigninContext);
    useEffect(() => {
        AOS.init({
            delay: 200,
        });
        AOS.refresh();
    
    }, []);
    return(
        <div className='form-card text-center'>
            <h1><b>Register</b></h1>
            <div data-aos="flip-up" className="form">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name"
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                />
                <input type="submit" value="Register" className="btn btn-dark btn-block" />
                <input type="submit" onClick={() => signinContext.onRouteChange('signin')} value="Sign In" className="btn btn-light btn-block" />
                
                <b>Sign in feature has not been implemented yet</b>
            </div>
        </div>
        
    );
}   

export default Register;