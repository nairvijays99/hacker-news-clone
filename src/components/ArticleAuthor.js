import React from "react";

export default function ArticleAuthor(props) {
  return (
    <div className="article-author">
      <span className="article-author-prefix">by</span>
      <span className="article-author-value">{props.value}</span>
    </div>
  );
}
