import React, { useContext } from 'react';
import VerseItem from './VerseItem';
import Spinner from '../layout/Spinner';
import VerseContext from '../../context/verse/verseContext';

const Verses = (    ) => {
    const verseContext = useContext(VerseContext);

    const { loading, verses } = verseContext;
    
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


export default Verses