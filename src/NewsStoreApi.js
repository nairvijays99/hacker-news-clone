import axios from 'axios';

const initialData = {
    articles: {},
    page: null,
    upvotes: [],
    hidden: []
};

export default class {

  constructor(rawData = false) {
      if (rawData) this.processRawData(rawData);
  }

  fetchPage = (page = 0) => {
    return axios
    .get(`https://hn.algolia.com/api/v1/search?tags=story&page=${page}&hitsPerPage=30`)
    .then((resp) => {
        return {
            processedData: this.processRawData(resp.data),
            rawData: resp.data
        }
    });
  }

  processRawData = (rawData) => {
    let articles = rawData.hits.reduce((acc, article) => {

        let articleData = {
            author: article.author,
            comments: article.num_comments,
            created_at: article.created_at,
            hidden: false,
            id: article.objectID,
            title: article.title,
            votes: article.points,
            url: article.url
        }


        acc[articleData.id] = articleData;

        return acc;

    }, {});

    if (!this.data) {
        this.data = {...initialData};
    }

    this.data.articles = articles;
    this.data.page = rawData.page;

    return this.data;
  }
}