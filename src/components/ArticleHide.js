import React from "react";

export default function ArticleHide(props) {
  const handleButtonClick = (e) => {
    props.hide();
    e.preventDefault();
  };

  return (
    <div className="article-hide">
      <button className="article-hide-value" onClick={handleButtonClick}>
        Hide
      </button>
    </div>
  );
}
