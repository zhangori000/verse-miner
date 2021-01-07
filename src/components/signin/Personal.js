import React, {Fragment, useContext} from 'react';
import Spinner from '../layout/Spinner';
import SigninContext from '../../context/signin/signinContext';
import VerseContext from '../../context/verse/verseContext';



const Personal = () => {
    const signinContext = useContext(SigninContext);
    const verseContext = useContext(VerseContext);
    if(verseContext.loading) {
        return <Spinner />
    }
    else {
        return (
        
            <Fragment>
                <h1>Your Own Space</h1>
                <p><b>Not implemented yet</b></p>
                <p>Personalization of notes, verses, websites, etc.</p>
                <button onClick={() => signinContext.onRouteChange('signin')}> Sign Out </button>
            </Fragment>
        )
    }
    
}

export default Personal;