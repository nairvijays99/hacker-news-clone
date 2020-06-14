import React, { createContext } from "react";

// create a centralised state for News
export const NewsContext = createContext();

// compose children component with store props
export const NewsProvider = (props) => {
  return (
    <NewsContext.Provider value={props.store}>
      {props.children}
    </NewsContext.Provider>
  );
};
