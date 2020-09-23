import { applyMiddleware, createStore } from 'redux';
import { phonebookReducer } from './reducers';
// import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from '../middlewares/loggers';

const middlWares = [logger];

const store = createStore(
  phonebookReducer,
  composeWithDevTools(applyMiddleware(...middlWares)),
);
export default store;

// import { applyMiddleware, createStore, combineReducers } from 'redux'
// // import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension'

// import { phonebookReducer } from './reducers';
// import { logger } from '../middlewares/loggers'

// const rootRedcer = combineReducers({

//   noteBook: phonebookReducer,
// items : itemsRewducer ,

// })

// const middlWares = [logger]

// const store = createStore(rootRedcer, composeWithDevTools(applyMiddleware(...middlWares)));
// export default store;
