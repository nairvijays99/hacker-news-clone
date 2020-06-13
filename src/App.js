import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [store, setStore] = useState({
    pages: {},
    currentPage: null,
    upvoted: [],
    hidden: []
  });

  useEffect(() => {

    console.log('store ->', store.pages[store.currentPage]);
    fetch("https://hn.algolia.com/api/v1/search?tags=story&page=")
    .then((res) => res.json())
    .then((data) => {
      const newState = {
        currentPage: data.page,
        pages: {
          ...store.pages,
          [data.page]: [...data.hits],
        }
      }

      setStore({ 
        ...store,
        ...newState
      });
    });

  }, [store.currentPage]);

  return (

    <div className="App">
      <header className="App-header">
        <p>
          Hacker News
        </p>
        {store.pages[store.currentPage] && store.pages[store.currentPage].map(article => <div key={article.objectID}>{article.title}</div> )}
      </header>
    </div>
  );
}

export default App;
