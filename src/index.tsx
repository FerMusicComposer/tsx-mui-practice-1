import './styles/main.scss';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
//import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const Element = () => <h1>Test</h1>;

root.render(
    <React.StrictMode>
        <Element />
    </React.StrictMode>,
);

if (module.hot) {
    module.hot.accept();
}
