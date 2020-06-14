import React from 'react';
import NewsArticleList from './NewsArticleList';
import NewsGraph from './NewsGraph';

export default function NewsDashboard() {
    return (
        <div id="dashboard">
            <NewsArticleList />
            <NewsGraph />
        </div>
    )
}
