
import { createStore, applyMiddleware } from 'redux'
import { syncHistory } from 'react-router-redux'
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers/index'

const logger = createLogger();


// global variable arriving from index.html
const base = document.getElementsByTagName('base')[0]
const BASE_URL = base.attributes[0].value
//
// // manually create history using a custom basename configuration, this will ensure
// // that all routes will be run relative to the value of BASE_URL
const history = useRouterHistory(createHistory)({
  basename: BASE_URL
});

/**
 * History middleware allows action creators to call history methods.
 * The middleware will look for route actions created by push, replace, etc.
 * and apply them to the history.
 */
const reduxRouterMiddleware = syncHistory(history)
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRouterMiddleware,
  logger
)(createStore);

const store = createStoreWithMiddleware(rootReducer, window.devToolsExtension && window.devToolsExtension())

export { store, history }
