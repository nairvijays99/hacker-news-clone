import React from 'react';
import NewsArticlesList from './NewsArticlesList';
import NewsArticlesNavigation from './NewsArticlesNavigation';
import NewsGraph from './NewsGraph';

export default function NewsDashboard() {
    return (
        <div className="news-dashboard">
            <div className="news-articles-list-wrapper">
                <NewsArticlesList />
                <NewsArticlesNavigation />
            </div>
            <NewsGraph />
        </div>
    )
}
