import React, { useState, useEffect } from "react";
import NewsGraph from "./NewsGraph";

export default function NewsGraphWrapper() {
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (!render) {
      setRender(true);
    }
  }, [render]);

  return (
    <div className="news-graph">
      {render ? <NewsGraph /> : <p>loading graph...</p>}
    </div>
  );
}
