import React from 'react';
import { NewsProvider } from './context/NewsContext';
import NewsDashboard from './components/NewsDashboard';
import './App.css';

function App(props) {

  return (
    <div id="app">
      <NewsProvider serverState={props.serverState}>
        <NewsDashboard />
      </NewsProvider>
    </div>
  );
}

export default App;
