import React, {Fragment} from 'react';
import Search from '../users/Search';
import Verses from '../verses/Verses';




const Home = () => {
   

    return (
        <Fragment >
            <Search data-aos="flip-up"/>
            <Verses />
        </Fragment>
    );
}

export default Home;