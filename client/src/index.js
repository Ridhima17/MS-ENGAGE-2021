import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContextProvider from './Context/VideoState';
import './styles.css';

//render the app into this div 'root'
ReactDOM.render(
    <ContextProvider>
        <App />
    </ContextProvider>,
document.getElementById('root')
);

