import React from "react";

export default function NewsArticlesListHeader() {
  return (
    <div className="news-articles-list-header">
      <div className="article-comments">Comments</div>
      <div className="article-vote-count">Vote Count</div>
      <div className="article-upvote">UpVote</div>
      <div className="article-details">News Details</div>
    </div>
  );
}
