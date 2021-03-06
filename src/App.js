import React, { Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import PersonalPages from './components/pages/PersonalPages';
import Navbar from './components/layout/Navbar';
import Verse from './components/verses/Verse';
import Alert from './components/layout/Alert';
import Signin from './components/signin/Signin';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

import VerseState from './context/verse/VerseState';
import AlertState from './context/alert/AlertState';
import SigninState from './context/signin/SigninState';
import './App.css';

// import GoogleImageSearch from 'free-google-image-search' *reminder: uninstall later
 


//import Users from './components/users/Users'; *could be refactored for different purposes


const App = () => {
  

  return (
    
    <AlertState>
    <VerseState>
    <SigninState>
      
      <Router>
      <div className="App" >
        <Navbar title="Bible Verse Identifer" icon='fas fa-bible' />
        <div className="container">
          <Alert />
          <Switch>
            
            <Route exact path='/verse-miner/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/personal' component={PersonalPages} />
            <Route exact path='/verse/:verseData' component={Verse}/>
            <Route component={NotFound} />
            
          </Switch>
          
        </div>
      </div>
      </Router>
    </SigninState>
    </VerseState>
    </AlertState>
    
  );

}

export default App;
