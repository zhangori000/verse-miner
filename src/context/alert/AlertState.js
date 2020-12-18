import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = null;

    const[state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert
    const setAlert = (msg, type, errorType) => {
        dispatch({
            type: SET_ALERT,
            payload: { msg, type }
        });

        
        console.log(errorType);
        if(errorType === "invalid") {
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
        }
        else if(errorType === "EntireBook") {
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 6000);
        }
        else if(errorType === "EmptyInput") {
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
        }
    }

    return (
        <AlertContext.Provider
            value={{
                alert: state,
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;