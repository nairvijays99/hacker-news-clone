import React from "react";

export default function ArticleComments(props) {
  return (
    <div className="article-comments">
      <span className="article-comments-value">{props.value}</span>
      <span className="article-comments-siffix"> comments</span>
    </div>
  );
}
