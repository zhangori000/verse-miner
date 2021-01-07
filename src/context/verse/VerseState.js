import React, { useReducer ,useContext} from 'react';
import axios from 'axios';

import VerseContext from './verseContext';
import VerseReducer from './verseReducer';
import AlertContext from '../alert/alertContext';


import {
    SEARCH_VERSES,
    SET_LOADING,
    CLEAR_VERSES,
    GET_VERSE_ASSOCIATIONS,

} from '../types';

const VerseState = props => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const initialState = {
        verses: [],
        verse: {},
        verseAssociations: {},
        loading: false
    }

    const [state, dispatch] = useReducer(VerseReducer, initialState);


    // Search Verse
    const CORSLink = 'https://thawing-brushlands-63746.herokuapp.com/';
    const apiLinks = {
    bible: 'https://labs.bible.org/api/?passage=romans%201-7&type=json'
    };
    var currentUseCase = "bible";

    // function
    const searchVerses = async (text) => {
        
        setLoading();
        
        if(currentUseCase === "bible") {

        //remove outer and inner spaces in preparation for algorithm
        var cleanText = text.trim().replace(/ /g, '');
        if(cleanText[cleanText.length - 1] !== ';'){
            cleanText = cleanText.concat(';');
        }
        //check cleanText
        console.log(cleanText);
        var passageString = '';

        //input text can have multiple verses. We need to parse each individual verse
        parseVerseInput(cleanText).forEach(verseItem => {
            const [bookname, chapter, verse] = verseItem;
            passageString += `${bookname}%20${chapter}${verse};`; //verse has colon in it. 
            console.log(passageString);
        });
        
        apiLinks['bible'] = `https://labs.bible.org/api/?passage=${passageString}&type=json`
        console.log(apiLinks['bible']);
        const res = await axios.get(CORSLink + apiLinks['bible']);
        console.log('res.data', res.data);
        dispatch({
            type: SEARCH_VERSES,
            payload: res.data
        });
        //afterwards, verses is filled with JSON objects containing "bookname", "chapter", and "verse" key (no colon).
        } 
        else {
            console.log("not implemented yet");
        }
    }

        //Parse verse input to assist query
    const parseVerseInput = (text) => {
        
        //goal is to return array to destructure with values Bookname, Chapter, Verse
        const parsedVerses = [];
        let currentIdx = 0;
        while(currentIdx < text.length - 1) {
            console.log(currentIdx);
            var singleVerse = getVerse(text, currentIdx);
            var [currentBookname, currentChapter, currentVerse] = singleVerse;
            //api returns gensis 1:1 when query is undefined
            
            if(currentChapter === '') {
                var errorName = "invalid";
                if(currentVerse === "Entire Book") {
                errorName = "EntireBook";
                }
                currentBookname = 'Genesis';
                currentChapter = '1';
                currentVerse = ':1';
                singleVerse = [currentBookname, currentChapter, currentVerse]; //redundant?
                if(errorName === "EntireBook") {
                setAlert('We cannot print out ENTIRE books; only chapters. e.g -> Eph 2-3; Micah 1-7; John 2; Lk 3', 'light', errorName);
                
                } else {
                setAlert('Invalid input', 'light', errorName);
                }
                
            }
            parsedVerses.push(singleVerse);
            console.log("length:", singleVerse);
            currentIdx += (currentBookname.length + currentChapter.length + currentVerse.length) + 1;
        }
        return parsedVerses;
    }



    //Get Single Verse
    const getVerse = (text, startingValue) => {
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
        console.log("cannot print entire books");
        return [text.substring(subStringStartPoint, subStringEndPoint), '', 'Entire Book'];
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


    // Get Verse Associations
    const getVerseAssociations = (verseData) => {
        var [bookname, chapter, verse, text] = verseData.split(':');
        if(bookname === 'Psalms') {
        bookname =  'Psalm';
        }
        const dashedBookname = bookname.replace(" ", "-").toLowerCase();
        const underscoredBookname = bookname.replace(" ", "_").toLowerCase();
        const noSpaceBookname = bookname.replace(" ", "").toLowerCase();
        console.log(bookname);
        setLoading();
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
        dispatch({
            type: GET_VERSE_ASSOCIATIONS,
            payload: data
        });
  }


    // Clear Verses
    const clearVerses = () => dispatch({ type: CLEAR_VERSES });

    
    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    

    return (
        
        <VerseContext.Provider
            value={{
                verses: state.verses,
                verse: state.verse,
                verseAssociations: state.verseAssociations,
                loading: state.loading,
                searchVerses,
                clearVerses,
                getVerseAssociations,
                setLoading
            }} 
        >
            {props.children}
        </VerseContext.Provider>
        
    );

    
};

export default VerseState;