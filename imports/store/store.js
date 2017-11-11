import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
const logger = createLogger();
const enhancers = [
    applyMiddleware(ReduxThunk, logger),
   // DevTools.instrument()
];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(rootReducer, {}, composeEnhancers(...enhancers));
export default Store;

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