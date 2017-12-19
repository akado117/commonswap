import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { setStore } from '../helpers/ConstantsRedux';

const logger = createLogger();
const middleWare = [
    ReduxThunk,
    process.env.NODE_ENV !== 'production' ? logger : undefined,
].filter(midWare => !!midWare);
const enhancers = [
    applyMiddleware(...middleWare),
    // DevTools.instrument()
];
const composeEnhancers = process.env.NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
const Store = createStore(rootReducer, {}, composeEnhancers(...enhancers));
export default Store;
setStore(Store);

// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers/rootReducer';
//
// const logger = () => next => (action) => {
//     console.log(`Dispatching: ${action.type}`);
//     return next(action);
// };
//
// const composeEnhancers = compose;
//
// export default function configureStore(initialState) {
//     return createStore(
//         rootReducer,
//         initialState,
//         composeEnhancers(applyMiddleware(thunk, logger))
//     );
// }