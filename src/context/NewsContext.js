import React, { createContext, useState, useEffect } from "react";
import NewsApi from "../api/NewsApi";

let initialState = null;

if (typeof window !== "undefined") {
  initialState = window && window.NewsApiInitialState;
}

const api = new NewsApi(initialState);

// create a centralised state for News
export const NewsContext = createContext();

// compose children component with store props
export const NewsProvider = (props) => {
  // create a news state which is the global state for the application
  // if rendered in server side, the initial state will be passed on as props
  const [newsState, setNewsState] = useState(props.serverState || api.state);

  useEffect(() => {
    // subscribe to api changes
    const subscriptionId = api.subscribe(setNewsState);

    console.log("loaded", newsState);

    const getParamFromSearch = () => {
      let search = window.location.search.substring(1);

      if(!search) {
        return {};
      }

      return JSON.parse(
        '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === "" ? value : decodeURIComponent(value);
        }
      );

    }

    // client side rendering decisions can be made here
    // if the client is loaded without ssr, it needs to render the initial state

    if (newsState.page === null) {
      // make an api call to render the initial state of the application
      // todo: read query params from window.location
      let params = getParamFromSearch();
      api.search({ page: params.page || 0 });
    }

    return () => {
      // unsubscribe to api changes
      api.unsubscribe(subscriptionId);
    };

  }, [newsState.page, newsState.articles]);

  return (
    <NewsContext.Provider value={newsState}>
      {props.children}
    </NewsContext.Provider>
  );
};
