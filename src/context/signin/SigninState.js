import React, { useReducer, useContext } from 'react';
import SigninContext from './signinContext';
import SigninReducer from './signinReducer';
import VerseContext from '../verse/verseContext';

import {
    CHANGE_ROUTE, ON_EMAIL_CHANGE, ON_PASSWORD_CHANGE, ON_SUBMIT_SIGNIN
} from '../types';

const SigninState = props => {
    const verseContext = useContext(VerseContext);
    const { setLoading } = verseContext;

    const initialState = {
        route: 'signin',
        signInEmail: '',
        signInPassword: '',
        isSignedIn: false
    }

    const [state, dispatch] = useReducer(SigninReducer, initialState);

    const onEmailChange = (event) => {
        dispatch({
            type: ON_EMAIL_CHANGE,
            payload: event.target.value
        });
    }

    const onPasswordChange = (event) => {
        dispatch({
            type: ON_PASSWORD_CHANGE,
            payload: event.target.value
        });
    }

    const onSubmitSignIn = () => {
        console.log(state);
        onRouteChange('personal');
    }

    //Change Personal Route
    const onRouteChange = (routeToChange) => {
        dispatch({
            type: CHANGE_ROUTE,
            payload: routeToChange
        });
    }


    return <SigninContext.Provider
        value={{
            route: state.route,
            onRouteChange,
            onEmailChange,
            onPasswordChange,
            onSubmitSignIn
        }}
    >
        {props.children}
    </SigninContext.Provider>
}

export default SigninState;