import { combineReducers } from 'redux';
import roomies from './roomateReducer';
import user from './userReducer';
import pageSkip from './pageSkip';
import profile from './profileReducer';

const rootReducer = combineReducers({
    pageSkip,
    roomies,
    user,
    profile,
});

export default rootReducer;