import React from 'react';
import './Signin.css';


const Signin = () => {
    return(
        <div className='form-card text-center'>
            <form className="form">
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
                <input type="submit" value="Sign In" className="btn btn-dark btn-block" />
                <input type="submit" value="Register" className="btn btn-light btn-block" />
            </form>
        </div>
        
    );
}   

export default Signin;