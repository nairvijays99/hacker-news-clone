import React from "react";

export default function VoteCount(props) {
  return (
    <div className="article-vote-count">
      <span className="article-vote-count-value">{props.value}</span>
      <span className="article-vote-count-siffix"> votes</span>
    </div>
  );
}
