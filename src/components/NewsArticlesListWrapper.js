import React from "react";
import NewsArticlesNavigation from "./NewsArticlesNavigation";
import NewsArticlesList from "./NewsArticlesList";
import NewsArticlesListHeader from './NewsArticlesListHeader';

export default function NewsArticlesListWrapper() {
  return (
    <div className="news-articles-list-wrapper">
      <NewsArticlesListHeader />
      <NewsArticlesList />
      <NewsArticlesNavigation />
    </div>
  );
}
