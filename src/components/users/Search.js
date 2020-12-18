import React, { useState, useContext } from 'react';

import VerseContext from '../../context/verse/verseContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const verseContext = useContext(VerseContext);
    const alertContext = useContext(AlertContext);
    
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if(text === '') {
            alertContext.setAlert('Please Enter Something', 'light', "EmptyInput");
        } else {
            verseContext.searchVerses(text);
            setText('');
        }
        
    }
    const onChange = (e) => setText(e.target.value)

    return(
        <div>
            <form onSubmit={onSubmit} className="form">
                <input 
                    type="text" 
                    name="text" 
                    placeholder="John 3:16-18; John 3-8"
                    value={text}
                    onChange={onChange}
                />
                <input type="submit" value="search" className="btn btn-dark btn-block" />
            </form>
            {verseContext.verses.length > 0 && (
            <button 
                className="btn btn-light btn-block" 
                onClick={verseContext.clearVerses}
            >
                Clear
            </button>
            )}
        </div>
    );
}



export default Search;