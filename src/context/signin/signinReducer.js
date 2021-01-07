import {
    CHANGE_ROUTE,
    ON_EMAIL_CHANGE,
    ON_PASSWORD_CHANGE,
    ON_SUBMIT_SIGNIN,
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case ON_EMAIL_CHANGE:
            return {
                ...state,
                signInEmail: action.payload,
            }
        case ON_PASSWORD_CHANGE:
            return {
                ...state,
                signInPassword: action.payload
            }
        case CHANGE_ROUTE:
            if (action.payload === 'signout') {
                return {
                    ...state, 
                    isSignedIn: false
                }
            } else if (action.payload === 'home') {
                return {
                    ...state,
                    isSignedIn: false
                }
            }
            return {
                ...state,
                route: action.payload,
            }
        default:
            return state;
    } 
}