import React from 'react';
import VerseItem from './VerseItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Users from '../users/Users';

const Verses = ({ verses, loading }) => {
    
    if(loading) {
        return <Spinner />
    } else {
        return(
            
            <div className="card-grid">
                {verses.map(v => (
                    <VerseItem key={v.bookname + v.chapter + ':' + v.verse} verse={v} />
                ))}
            </div>
        );
    }
    
}

Verses.propTypes = {
    verses: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}


export default Verses