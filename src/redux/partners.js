//import { PARTNERS } from '../shared/partners';
import * as ActionTypes from './ActionTypes';

// Update the reducer code in redux/partners.js to respond to the three actions that were added to the action types. Task 1/3. Point 3/7

export const Partners = (state = {isLoading: true, errMess: null, partners: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PARTNERS:
            return {...state, isLoading: false, errMess: null, partners: action.payload};
        case ActionTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null, partners: []};
        case ActionTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};



// ATTENTION/ALERT - for week five assignment, student author (me, Franklin Bueno), borrowed VERY HEAVILY from the screenshots and slack messages from extremely helpful Instructor HE and also boot camp classmates...