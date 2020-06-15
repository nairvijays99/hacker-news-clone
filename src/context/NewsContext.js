import React, { createContext, useState, useEffect } from "react";
import NewsApi from "../api/NewsApi";



let initialState = null;

let votedArticles = "";
let hiddenArticles = "";

if (typeof window !== "undefined") {
  initialState = window && window.NewsApiInitialState;
  votedArticles = localStorage.getItem("upvotes") || "";
  hiddenArticles = localStorage.getItem("hidden") || "";
}


const addStrategy = (strategy, value) => {
  let currentValue = localStorage.getItem(strategy) || "";
  currentValue = currentValue.split(",");
  currentValue.push(value);
  localStorage.setItem(strategy, currentValue.join(","));
}

let localStrategies = {
  upvotes: votedArticles.split(","),
  hidden: hiddenArticles.split(","),
};

const api = new NewsApi(initialState, localStrategies);

// create a centralised state for News
export const NewsContext = createContext();

// compose children component with store props
export const NewsProvider = (props) => {
  // create a news state which is the global state for the application
  // if rendered in server side, the initial state will be passed on as props
  const [newsState, setNewsState] = useState(props.serverState || api.state);

  const setPage = (page) => {
    window.history.pushState({}, `Page ${page}`, `/page/${page}`);
    api.search({ page: page });
  };

  const upVote = (articleId) => {
    api.upVote(articleId);

    //save to local storage
    addStrategy("upvotes",  articleId);
  };

  const hide = (articleId) => {
    api.hide(articleId);

    //save to local storage
    addStrategy("hidden",  articleId);
  };


  useEffect(() => {
    // subscribe to api changes
    const subscriptionId = api.subscribe(setNewsState);

    const getPage = () => {
      let pathName = window.location.pathname;
      let pathArr = pathName.split("/").slice(1);

      let pageInPath = pathArr[0] === "page" ? pathArr[1] : false;

      return pageInPath || 0;
    };

    // client side rendering decisions can be made here
    // if the client is loaded without ssr, it needs to render the initial state

    if (newsState.page === null) {
      // make an api call to render the initial state of the application
      // todo: read query params from window.location
      api.search({ page: getPage() });
    }

    return () => {
      // unsubscribe to api changes
      api.unsubscribe(subscriptionId);
    };
  }, [newsState.page, newsState.articles]);

  return (
    <NewsContext.Provider value={{ ...newsState, setPage, upVote, hide }}>
      {props.children}
    </NewsContext.Provider>
  );
};
