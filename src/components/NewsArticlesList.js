import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import NewsArticle from "./NewsArticle";

export default function NewsArticlesList() {
  const { articles } = useContext(NewsContext);

  return (
      <div className="news-articles-list">
        {Object.values(articles).map((article) => (
          <NewsArticle key={article.id} id={article.id} />
        ))}
      </div>
  );
}
