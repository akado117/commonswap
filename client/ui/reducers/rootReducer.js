import { combineReducers } from 'redux';
import user from './userReducer';
import pageSkip from './pageSkip';
import profile from './profileReducer';
import place from './placeReducer';
import images from './imagesReducer';
import trip from './tripReducer';
import modal from './modalReducer';

const rootReducer = combineReducers({
    pageSkip,
    user,
    profile,
    place,
    images,
    trip,
    modal,
});

export default rootReducer;