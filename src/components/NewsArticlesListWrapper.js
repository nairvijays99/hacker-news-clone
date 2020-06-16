import React from "react";
import NewsArticlesNavigation from "./NewsArticlesNavigation";
import NewsArticlesList from "./NewsArticlesList";

export default function NewsArticlesListWrapper() {
  return (
    <div className="news-articles-list-wrapper">
      <NewsArticlesList />
      <NewsArticlesNavigation />
    </div>
  );
}
