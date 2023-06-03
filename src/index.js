import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from './Components/Layout';
import './index.css';
import Header from './Components/Header/index';
import Footer from './Components/Shared/Footer/index';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Layout />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
