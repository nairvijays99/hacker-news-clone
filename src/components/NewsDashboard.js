import React, {useContext} from 'react';
import {NewsContext} from '../context/NewsContext';

export default function NewsDashboard() {
    const newsStore = useContext(NewsContext);
    //console.log('dashboard context is', newsStore);
    return (
        <>
        <h1>
            Hacker News
        </h1>
        <ul>
            {Object.values(newsStore.articles).map(article => <li key={article.id}>{article.title}</li>)}
        </ul>
        </>
    )
}
