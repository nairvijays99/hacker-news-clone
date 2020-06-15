import "ignore-styles";
import express from "express";
import compression from "compression";
import fs from "fs";
import NewsApi from "../src/api/NewsApi";
import App from "../src/App";
import React from "react";
import ReactDOMServer from "react-dom/server";

const app = express();
const api = new NewsApi();

const PORT = process.env.PORT || 3001;

// resolve file path to a string
const resolveFileToString = (path) => {
  // returning a promise so the invoker can chain methods
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.toString().slice());
    });
  });
};

// server logic
const server = () => {
  // create a reference to cache html markup
  let staticMarkup;

  // read the static index.html file from the fs
  // marking this as a one time operation
  resolveFileToString("build/index.html").then((markup) => {
    // cache the markup string for future requests
    staticMarkup = markup.slice();

    // handle home page requests
    // requests other than 'static' will be handled here for now
    const homePage = (req, res) => {
      //todo: read query params before making the request
      let page = req.query.page || 0;

      api
        .search({
          page: page || 0,
        })
        .then((state) => {
          // compile react component with provided state
          let reactDOMString = ReactDOMServer.renderToString(
            <App serverState={state} />
          );

          // pass the state over to window for client side hydration
          let dynamicMarkup = staticMarkup
            .slice()
            .replace(
              "window.NewsApiInitialState=null",
              `window.NewsApiInitialState=${JSON.stringify(state)}`
            );

            //set ssr to true 
          dynamicMarkup = dynamicMarkup.replace('window.ssr=null', 'window.ssr="true"');

          

          // add dom data to markup
          dynamicMarkup = dynamicMarkup.replace(
            '<div id="root"></div>',
            `<div id="root">${reactDOMString}</div>`
          );

          // send the ss rendered markup of the application
          res.send(dynamicMarkup);
        });
    };

    // gzip
    app.use(compression());

    // handle root requests
    app.get("/", homePage);

    // bugfix: index.html request made by service workers skip the above universal handling of '/' requests
    // todo: better handling of requests
    app.get("/index.html", homePage);

    // handle static asset requests
    app.use(express.static("build"));

    // Start server
    app.listen(PORT, () => {
      console.info(`Running on port ${PORT}`);
    });
  });
};

// let the show begin..
server();
