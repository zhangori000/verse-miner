import React, {Fragment} from 'react';
import Search from '../users/Search';
import Verses from '../verses/Verses';


const Home = () => {
    return (
        <Fragment>
            <Search />
            <Verses />
        </Fragment>
    );
}

export default Home;