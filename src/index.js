import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import Routes from 'routes';
import './index.css';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes />
      </Router>
    </React.StrictMode>
  </Provider>
);
