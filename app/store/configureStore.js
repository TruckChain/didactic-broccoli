import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { reducer as searchReducer, reduxSearch } from 'redux-search';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { isClient, isDebug } from '../../config/app';

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState, history) {
  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, routerMiddleware(history)];
  let store;

  if (isClient && isDebug) {
    middleware.push(createLogger());
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middleware),
      reduxSearch({
        // Configure redux-search by telling it which resources to index for searching
        resourceIndexes: {
          // In this example carriers will be searchable by :title and :author
          carriers: ['name']
        },
        // This selector is responsible for returning each collection of searchable resources
        resourceSelector: (resourceName, state) => {
          // In our example, all resources are stored in the state under a :resources Map
          // For example "books" are stored under state.resources.carriers
          return state.resources.get(resourceName)
        }
      }),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), f => f));
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('../reducers');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
