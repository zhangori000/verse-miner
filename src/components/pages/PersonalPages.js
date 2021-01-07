import React, {Fragment, useContext} from 'react';
import Personal from '../signin/Personal';
import Signin from '../signin/Signin';
import Register from '../signin/Register';
import SigninContext from '../../context/signin/signinContext';




const PersonalPages = () => {
    const signinContext = useContext(SigninContext);
    console.log(signinContext.route);
    return (
        <Fragment >
            { signinContext.route === 'personal'
                ?   <Personal />
                : (
                    signinContext.route === 'signin' 
                    ?   <Signin />
                    :   <Register />
                )
            }
        </Fragment>
    );
}

export default PersonalPages;