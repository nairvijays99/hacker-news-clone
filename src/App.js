import React, {useState, useEffect} from 'react';
import './App.css';

function App(props) {

  let articles = props.store.articles;

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hacker News
        </p>
       {Object.values(articles).map(article => <div key={article.id}>{article.title}</div> )}
      </header>
    </div>
  );
}

export default App;
