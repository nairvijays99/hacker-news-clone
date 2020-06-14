import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import NewsStoreApi from './NewsStoreApi';

const store = new NewsStoreApi()

if (window.initialState) {

  // create a store api with initial data
  let storeData = store.setData(window.initialState);

  // clean up initialState
  delete window.initialState;
  
  // hydrate using server rendered data
  ReactDOM.hydrate(
    <React.StrictMode>
      <App store={storeData}/>
    </React.StrictMode>,
    document.getElementById('root')
  );

} else {
  // falback if there is no ssr
  // fetch pages api
  store.fetchPage().then((storeData) => {
    
    // render using fetched data
    ReactDOM.render(
      <React.StrictMode>
        <App store={storeData}/>
      </React.StrictMode>,
      document.getElementById('root')
    );

  });

}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
