import React from "react";

export default function ArticleUpVote(props) {
  const handleButtonClick = (e) => {
    props.upVote();
    e.preventDefault();
  };

  return (
    <div className="article-upvote">
      <button disabled={props.voted} onClick={handleButtonClick}>
        <span className="article-upvote-prefix">▲</span>
        <span className="article-upvote-suffix">UpVote</span>
      </button>
    </div>
  );
}
