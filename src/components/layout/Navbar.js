import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css";

const Navbar = ({ icon, title }) =>  {
    useEffect(() => {
        AOS.init({
            delay: 200,
        });
        AOS.refresh();
    
    }, []);
    return(
        

        <nav className="navbar bg-primary" data-aos="fade-down">
            <h1>
                <i className={icon}/> {title} 
            </h1>
            <ul>
                <li>
                    <Link to='/verse-miner'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/personal'>Personal Account</Link>
                </li>
            </ul>
        </nav>
    );
}
Navbar.defaultProps = {
    title: 'Github Identifier',
    icon: 'fab fa-github'
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Navbar;