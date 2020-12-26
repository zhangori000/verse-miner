import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css";

const VerseItem = ({ verse: { bookname, chapter, verse, text }}) => {
    useEffect(() => {
        AOS.init({
            delay: 200,
        });
        AOS.refresh();
    
    }, []);

    return(
        <div className='card text-center' data-aos='zoom-in-down'>
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

