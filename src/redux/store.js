import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSaga from 'redux-saga';
import { createLogger } from 'redux-logger';

import reducers from 'redux/modules/';
import rootSaga from 'sagas/';
import {fromJS} from "immutable";

const saga = createSaga();
const logger = createLogger({ diff: true });


const middlewareEnhancer = (() =>
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(saga, logger))
    : applyMiddleware(saga))();

export default createStore(
  combineReducers(reducers),
  fromJS({}),
  middlewareEnhancer,
);

saga.run(rootSaga);
