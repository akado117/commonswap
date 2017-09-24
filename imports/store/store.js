import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
//import DevTools from '../../../imports/client/components/DevTools';
const logger = createLogger();
const enhancers = [
    applyMiddleware(ReduxThunk, logger),
   // DevTools.instrument()
];
const Store = createStore(rootReducer, {}, compose(...enhancers));
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