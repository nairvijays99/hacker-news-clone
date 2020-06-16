import React from "react";
import NewsArticlesListWrapper from "./NewsArticlesListWrapper";
import NewsGraphWrapper from "./NewsGraphWrapper";

export default function NewsDashboard() {
  return (
    <div className="news-dashboard">
      <NewsArticlesListWrapper />
      <NewsGraphWrapper />
    </div>
  );
}