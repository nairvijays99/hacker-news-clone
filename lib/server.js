import express from 'express';
import compression from 'compression';
import fs from 'fs';
import NewsStoreApi from '../src/NewsStoreApi';
import App from '../src/App';
import React from 'react';
import ReactDOMServer from 'react-dom/server';


const app = express();
// TODO: Store implementation will change
const dataStore = new NewsStoreApi();

const PORT = process.env.PORT || 3001;

// resolve file path to a string
const resolveFileToString = (path) => {
    // returning a promise so the invoker can chain methods
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if(err) {
                reject(err);
            }    
            resolve(data.toString().slice());
        });
    });
}

// server logic
const server = () => {

    // create a reference to cache html markup
    let staticMarkup;

    // read the static index.html file from the fs
    // marking this as a one time operation
    resolveFileToString('build/index.html').then((markup) => {

        // cache the markup string for future requests
        staticMarkup = markup.slice();

        // handle home page requests
        // requests other than 'static' will be handled here for now
        const homePage = (req, res) => {
        
            dataStore.fetchPage().then((data) => {
                // compile react component with fetch data
                let reactDOMString = ReactDOMServer.renderToString(<App store={data} />);
                
                // pass the state over to window for client side hydration
                let dynamicMarkup = staticMarkup.slice().replace('window.initialState=null', `window.initialState=${JSON.stringify(data)}`);
                
                // add dom data to markup
                dynamicMarkup = dynamicMarkup.replace('<div id="root"></div>', `<div id="root">${reactDOMString}</div>`);
                
                // send the ss rendered markup of the application
                res.send(dynamicMarkup);
            });
        }

        // gzip
        app.use(compression());

        // handle root requests
        app.get('/', homePage);

        // bugfix: index.html request made by service workers skip the above universal handling of '/' requests
        // todo: better handling of requests
        app.get('/index.html', homePage);

        // handle static asset requests
        app.use(express.static('build'));

        // Start server
        app.listen(PORT, () => {
            console.info(`Running on port ${PORT}`);
        });       
    });
};

// let the show begin..
server();

