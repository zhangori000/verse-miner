import React, { Component, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import Verses from './components/verses/Verses';
import Verse from './components/verses/Verse';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import Signin from './components/signin/Signin';
import axios from 'axios';
import './App.css';

// import GoogleImageSearch from 'free-google-image-search' *reminder: uninstall later
 


//import Users from './components/users/Users'; *could be refactored for different purposes

const CORSLink = 'https://thawing-brushlands-63746.herokuapp.com/';
const apiLinks = {
  github: 'https://api.github.com/users', 
  bible: 'https://labs.bible.org/api/?passage=romans%201-7&type=json'
};
var currentUseCase = "bible";


class App extends Component {
  constructor() {
    super();
    this.state = {
      verses: [], 
      verseAssociations: {},
      loading: false,
      alert: null
    }
  }
  

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(CORSLink + apiLinks['bible']);
  //   console.log(res.data);
  //   if(currentUseCase === "bible") {
  //     this.setState({ verses: res.data, loading: false})
  //   } 
  //   else if(currentUseCase === "github") {
  //     this.setState({ users: res.data, loading: false});
  //   }
  // }

  //search verses
  searchVerses = async (text) => {
    this.setState({ loading: true });
    
    if(currentUseCase === "bible") {
      //remove outer and inner spaces
      var cleanText = text.trim().replace(/ /g, '');
      if(cleanText[cleanText.length - 1] !== ';'){
        cleanText = cleanText.concat(';');
      }
      console.log(cleanText);
      var passageString = '';
      this.parseVerseInput(cleanText).forEach(verseItem => {
        const [bookname, chapter, verse] = verseItem;
        passageString += `${bookname}%20${chapter}${verse};`; //verse has colon in it. 
        console.log(passageString);
      });
      
      apiLinks['bible'] = `https://labs.bible.org/api/?passage=${passageString}&type=json`
      console.log(apiLinks['bible']);
      const res = await axios.get(CORSLink + apiLinks['bible']);
      console.log('res.data', res.data);
      this.setState({ verses: res.data, loading: false})
      //afterwards, verses is filled with JSON objects containing "bookname", "chapter", and "verse" key (no colon).
    } 
    else if(currentUseCase === "github") {
      console.log("not implemented yet");
    }
  }

  //Parse verse input to assist query
  parseVerseInput = (text) => {
    //goal is to return array to destructure with values Bookname, Chapter, Verse
    const parsedVerses = [];
    let currentIdx = 0;
    while(currentIdx < text.length - 1) {
      console.log(currentIdx);
      var singleVerse = this.getVerse(text, currentIdx);
      var [currentBookname, currentChapter, currentVerse] = singleVerse;
      //api returns gensis 1:1 when query is undefined
      if(currentChapter === '') {
        currentBookname = 'Genesis';
        currentChapter = '1';
        currentVerse = ':1';
        singleVerse = [currentBookname, currentChapter, currentVerse]; //redundant?
        this.setAlert('Invalid input', 'light');
      }
      parsedVerses.push(singleVerse);
      console.log("length:", singleVerse);
      currentIdx += (currentBookname.length + currentChapter.length + currentVerse.length) + 1;
    }
    return parsedVerses;
  }



  //Get Single Verse
  getVerse = (text, startingValue) => {
    const parsedVerse = [];
    //useful for calling substring() function
    let subStringStartPoint = startingValue;
    let subStringEndPoint = startingValue;
    //edge case: 1 Timothy, 2 John, etc.
    while(text[subStringEndPoint] !== ';' && !isNaN(text[subStringEndPoint])) {
      subStringEndPoint++;
    }
    console.log(text[subStringEndPoint]);
    if(text[subStringEndPoint] === ';') {
      console.log("all numbers: error");
      return ['', '', ''];
    }
    //Retrieving Bookname substring
    while(text[subStringEndPoint] !== ';' && isNaN(text[subStringEndPoint])) {
      subStringEndPoint++;
    }
    if(text[subStringEndPoint] === ';') {
      this.setAlert('We Cannot Print An Entire Book', 'light');
      return [text.substring(subStringStartPoint, subStringEndPoint), '', ''];
    }

    parsedVerse.push(text.substring(startingValue ,subStringEndPoint));
    subStringStartPoint = subStringEndPoint;

    //Retreiving Chapter substring
    while(text[subStringEndPoint] !== ';' && text[subStringEndPoint] !== ':') {
      subStringEndPoint++;
    }
    parsedVerse.push(text.substring(subStringStartPoint, subStringEndPoint));

    //Retreiving Verse Substring
    if(text[subStringEndPoint] === ';') {
      //this value SHOULD have been colon. If it is semicolon then there is no verse. Simply return without verse.
      parsedVerse.push('');
      return parsedVerse;
    }
    subStringStartPoint = subStringEndPoint; //keep in mind I did not skip colon. Verse has a colon in front of it. 
    while(text[subStringEndPoint] !== ';') {
      subStringEndPoint++;
    }
    parsedVerse.push(text.substring(subStringStartPoint, subStringEndPoint));
    return parsedVerse;
  }

  //clear verses ----
  clearVerses = () => this.setState({ verses: [], loading: false });

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: {msg, type}});

    setTimeout(() => this.setState({ alert: null}), 3000);
  }

  //Get Single Verse data.
  getVerseAssociations = (verseData) => {
    
    const [bookname, chapter, verse, text] = verseData.split(':');
    if(bookname === 'Psalms') {
      const bookname =  'Psalm';
    }
    const dashedBookname = bookname.replace(" ", "-").toLowerCase();
    const underscoredBookname = bookname.replace(" ", "_").toLowerCase();
    const noSpaceBookname = bookname.replace(" ", "").toLowerCase();
    console.log(bookname);
    this.setState({ loading: true });
    var data = {
      philJohnsonUrl: `https://www.sermonaudio.com/search.asp?subsetitem=${bookname}&subsetcat=bible&keyword=Phil%5FJohnson&SpeakerOnly=true&includekeywords=&ExactVerse=`,
      johnMacarthurUrl: `https://www.sermonaudio.com/search.asp?subsetitem=${bookname}&subsetcat=bible&keyword=johnmacarthur&SourceOnly=true&includekeywords=&ExactVerse=`,
      heartCryUrl: `https://heartcrymissionary.com/resources/sermons/scripture/${dashedBookname}/`,
      paulWasherUrl: `https://www.sermonaudio.com/search.asp?subsetitem=${bookname}&subsetcat=bible&keyword=Paul%5FWasher&SpeakerOnly=true&includekeywords=&ExactVerse=`,
      onlineBibleUrl: `https://netbible.org/bible/${bookname}+${chapter}`,
      bibleOrgUrl: `https://bible.org/book/${bookname}`,
      bibleHubUrl: `https://biblehub.com/sermons/${underscoredBookname}/${chapter}-${verse}.htm`,
      bibleCrossReferences: `https://www.openbible.info/labs/cross-references/search?q=${bookname}+${chapter}%${verse}A8`,
      bibleHubParallel: `https://biblehub.com/${underscoredBookname}/${chapter}-${verse}.htm`,
      constablesNotesUrl: `https://planobiblechapel.org/tcon/notes/pdf/${noSpaceBookname}.pdf`,
      enduringWordUrl: `https://enduringword.com/bible-commentary/${dashedBookname}-${chapter}/`
    };
    this.setState({ verseAssociations: data, loading: false });
  }

  render() {  
    const { verses, verseAssociations, loading} = this.state;
    console.log("App.js Render()", verseAssociations);

    return (
      <Router>
      <div className="App">
        <Navbar title="Bible Verse Identifer" icon='fas fa-bible'/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                  searchVerses={this.searchVerses} 
                  clearVerses={this.clearVerses}
                  showClear={verses.length > 0 ? true : false}
                  setAlert={this.setAlert}
                />
                <Verses loading={loading} verses={verses} />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/verse/:verseData' render={props => (
              <Verse {...props } getVerseAssociations={this.getVerseAssociations} verseAssociations={verseAssociations} loading={loading}/>
            )} />
          </Switch>
          
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
