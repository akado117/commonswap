import { combineReducers } from 'redux';
import roomies from './roomateReducer';
import user from './userReducer';
import pageSkip from './pageSkip';
import profile from './profileReducer';
import place from './placeReducer';

const rootReducer = combineReducers({
    pageSkip,
    roomies,
    user,
    profile,
    place,
});

export default rootReducer;