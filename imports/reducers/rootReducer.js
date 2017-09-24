import { combineReducers } from 'redux';
import roomies from './roomateReducer';
import user from './userReducer';


const rootReducer = combineReducers({
    roomies,
    user
});

export default rootReducer;