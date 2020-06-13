import express from 'express';
import fs from 'fs';
import NewsStoreApi from '../src/NewsStoreApi';
import App from '../src/App';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();
const dataStore = new NewsStoreApi();

const homeMW = (req, res) => {
    fs.readFile('build/index.html', 'utf-8', (err, data) => {
        dataStore.fetchPage().then((resp) => {
            let htmlContent = data.toString();
            let markup = ReactDOMServer.renderToString(<App store={resp.processedData} />);
            htmlContent = htmlContent.replace('window.initialState={}', `window.initialState=${JSON.stringify(resp.rawData)};`);
            htmlContent = htmlContent.replace('...', markup);
            res.send(htmlContent);
        })
    });
}

app.get('/', homeMW);

app.get('/index.html', homeMW);

// serve static assets
app.use(express.static('build'));


//TODO: Read env configuration
let port = process.env.PORT || 3001;
app.listen(port, () => {
 console.info(`Running on port ${port}`);
});