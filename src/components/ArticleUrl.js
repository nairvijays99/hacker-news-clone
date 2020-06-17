import React from "react";

const getHostName = (val) => {
  if (!val) {
    return null;
  }
  let url = new URL(val);
  return url.host;
};

export default function ArticleUrl(props) {
  return (
    <div className="article-url">
      <a
        className="article-url-value"
        title={`Go to ${getHostName(props.value)}`}
        href={props.value}
        nofollow="noopener noreferrer nofollow"
      >
        {getHostName(props.value)}
      </a>
    </div>
  );
}
