import React, { Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import Verse from './components/verses/Verse';
import Alert from './components/layout/Alert';
import Signin from './components/signin/Signin';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

import VerseState from './context/verse/VerseState';
import AlertState from './context/alert/AlertState';
import './App.css';

// import GoogleImageSearch from 'free-google-image-search' *reminder: uninstall later
 


//import Users from './components/users/Users'; *could be refactored for different purposes


const App = () => {
  return (
    <AlertState>
    <VerseState>
      
      <Router>
      <div className="App">
        <Navbar title="Bible Verse Identifer" icon='fas fa-bible'/>
        <div className="container">
          <Alert />
          <Switch>
            
            <Route eact path='/verse-miner/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/verse/:verseData' component={Verse}/>
            <Route component={NotFound} />
            
          </Switch>
          
        </div>
      </div>
      </Router>
    </VerseState>
    </AlertState>
  );

}

export default App;
