import React, {useState, useEffect} from 'react';
import { NewsProvider } from './context/NewsContext';
import NewsDashboard from './components/NewsDashboard';
import './App.css';

function App(props) {

  return (
    <NewsProvider store={props.store}>
      <NewsDashboard />
    </NewsProvider>
  );
}

export default App;
