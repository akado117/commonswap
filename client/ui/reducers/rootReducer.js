import { combineReducers } from 'redux';
import user from './userReducer';
import pageSkip from './pageSkip';
import profile from './profileReducer';
import place from './placeReducer';
import images from './imagesReducer';
import trip from './tripReducer';
import modal from './modalReducer';
import service from './serviceReducer';

const rootReducer = combineReducers({
    pageSkip,
    profile,
    place,
    user,
    images,
    trip,
    modal,
    service,
});

export default rootReducer;