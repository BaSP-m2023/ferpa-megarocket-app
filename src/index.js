import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import Routes from 'routes';
import './index.css';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
