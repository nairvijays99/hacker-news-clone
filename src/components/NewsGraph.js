import React, { useContext, useState, useEffect } from "react";
import { NewsContext } from "../context/NewsContext";
import {
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
} from "victory";

export default function NewsGraph(props) {
  const context = useContext(NewsContext);
  const articles = context.articles;
  const [data, setData] = useState([{ x: 0, y: 0 }]);

  useEffect(() => {
    let highestVote = 0;
    let newsData = Object.values(articles).reduce(
      (graphDataCollection, article) => {
        if (article.votes > highestVote) {
          highestVote = article.votes;
        }
        graphDataCollection.push({
          x: article.id,
          y: article.votes,
          id: article.id,
        });
        return graphDataCollection;
      },
      []
    );

    newsData.length && setData([...newsData]);
  }, [articles]);

  return (
    <div className="news-graph-wrapper">
      <VictoryGroup data={data} color="#1976d2" height={150}>
        <VictoryLine />
        <VictoryScatter size={4} />
        <VictoryAxis
          label="Id's"
          style={{
            tickLabels: { angle: -90, fontSize: 20 },
          }}
        />
      </VictoryGroup>
    </div>
  );
}
