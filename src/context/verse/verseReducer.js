import {
    SEARCH_VERSES,
    SET_LOADING,
    CLEAR_VERSES,
    GET_VERSE_ASSOCIATIONS,

} from '../types';

export default (state, action) => {
    switch(action.type) {
        case SEARCH_VERSES:
            return {
                ...state, 
                verses: action.payload,
                loading: false
            };
        case GET_VERSE_ASSOCIATIONS:
            return {
                ...state,
                verseAssociations: action.payload,
                loading: false
            }
        case CLEAR_VERSES:
            return {
                ...state,
                verses: [],
                loading: false
            };
        case SET_LOADING:
            return {
                //State is immutable. Return whatever is in state.
                ...state, 
                loading: true
            };
        default:
            return state;
    }
}