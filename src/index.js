import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
/*
Render the App function component within the HTML tag with id value "root"
*/
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
