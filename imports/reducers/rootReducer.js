import { combineReducers } from 'redux';
import roomies from './roomateReducer';
import user from './userReducer';
import pageSkip from './pageSkip';

const rootReducer = combineReducers({
    pageSkip,
    roomies,
    user
});

export default rootReducer;