import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom/client';
import './app/layout/style.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';

const store = configureStore()
// console.log(store.getState())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      
      <App />
    {/* </React.StrictMode> */}
  </Provider>
 
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
