import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const VerseItem = ({ verse: { bookname, chapter, verse, text }}) => {
    return(
        <div className='card text-center'>
            <h3>{`${bookname} ${chapter}:${verse}`}</h3>

            <div>
                <Link  to={`/verse/${bookname}:${chapter}:${verse}`} className='btn btn-dark btn-sm my-1'>
                    More
                </Link>
                <p>
                    {/* add function to parse html within text later */}
                    {text}
                </p>
            </div>
        </div>
    );
}

VerseItem.propTypes = {
    verse: PropTypes.object.isRequired
}

export default VerseItem;

