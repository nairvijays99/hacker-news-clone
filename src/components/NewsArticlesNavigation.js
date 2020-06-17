import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

export default function NewsArticlesNavigation() {
  const context = useContext(NewsContext);
  const page = context.page;
  const pages = context.pages;
  const prevPage = page - 1;
  const nextPage = page + 1;

  const handlePrevPageClick = (e) => {
    context.setPage(prevPage);
    e.preventDefault();
  };

  const handleNextPageClick = (e) => {
    context.setPage(nextPage);
    e.preventDefault();
  };

  return (
    <div className="news-articles-navigation">
      <div className="news-articles-navigation-previous">
        {prevPage >= 0 && (
          <a
            href={`/page/${prevPage}`}
            title="Prev Page"
            onClick={handlePrevPageClick}
          >
            Previous
          </a>
        )}
      </div>

      <div className="news-articles-navigation-next">
        {nextPage !== pages && (
          <a
            href={`/page/${nextPage}`}
            title="Next Page"
            onClick={handleNextPageClick}
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
}
