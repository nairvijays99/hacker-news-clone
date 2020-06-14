import React, {useState, useEffect} from 'react';
import { NewsProvider } from './context/NewsContext';
import NewsDashboard from './components/NewsDashboard';
import './App.css';

function App(props) {

  return (
    <div id="app">
      <NewsProvider store={props.store}>
        <NewsDashboard />
      </NewsProvider>
    </div>
  );
}

export default App;
