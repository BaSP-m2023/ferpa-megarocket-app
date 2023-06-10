import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './rootReducers';
import thunk from 'redux-thunk';

export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));
