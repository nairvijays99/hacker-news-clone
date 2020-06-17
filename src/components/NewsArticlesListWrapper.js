import React, { useContext } from "react";
import NewsArticlesNavigation from "./NewsArticlesNavigation";
import NewsArticlesList from "./NewsArticlesList";
import NewsArticlesListHeader from "./NewsArticlesListHeader";
import { NewsContext } from "../context/NewsContext";

export default function NewsArticlesListWrapper() {
  const { loading } = useContext(NewsContext);

  return (
    <div className="news-articles-list-wrapper">
      {loading && <div className="articles-loading">Loading..</div>}
      <NewsArticlesListHeader />
      <NewsArticlesList />
      <NewsArticlesNavigation />
    </div>
  );
}
