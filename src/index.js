import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import Routes from 'routes';
import './index.css';
import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
