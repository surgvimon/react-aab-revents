import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();



// import * as serviceWorker from './serviceWorker';

// const rootEl = document.getElementById('root');
// function render() {
//   ReactDOM.render(<App />, rootEl );
// }

// if (module.hot) {
//   module.hot.accept('./app/layout/App', function() {
//     setTimeout(render);
//   });
// }
// render();

// serviceWorker.register();
