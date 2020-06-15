import React, { createContext, useState, useEffect } from "react";
import NewsApi from "../api/NewsApi";

// node wouldn't be happy with window.something here
let initialState = null;
let upvotes = "";
let hidden = "";

if (typeof window !== "undefined") {
  // override the values in browser mode
  initialState = window && window.NewsApiInitialState;
  upvotes = localStorage.getItem("upvotes") || "";
  hidden = localStorage.getItem("hidden") || "";
}

// strategies for this app sourced from local store
let localStrategies = {
  upvotes: upvotes.split(","),
  hidden: hidden.split(","),
};

// initiate api with initialState which will the server rendered state 
// and strategies which need to be applied before setting new state
const api = new NewsApi(initialState, localStrategies);

const addStrategy = (strategy, value) => {
  let currentValue = localStorage.getItem(strategy) || "";
  currentValue = currentValue.split(",");
  currentValue.push(value);
  localStorage.setItem(strategy, currentValue.join(","));
}

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
    addStrategy("upvotes",  articleId);
  };

  const hide = (articleId) => {
    api.hide(articleId);
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
