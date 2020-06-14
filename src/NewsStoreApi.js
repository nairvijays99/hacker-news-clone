import axios from 'axios';

export default class {

  constructor(initialData) {
      
      this.defaultData = {
        articles: {},
        page: null,
        upvotes: [],
        hidden: []
    }

    this.data = {...initialData} || {...this.defaultData};
  }

  fetchPage = (page = 0) => {
    return axios
    .get(`https://hn.algolia.com/api/v1/search?tags=story&page=${page}&hitsPerPage=30`)
    .then((resp) => {
        return this.processRawData(resp.data)
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

    this.data.articles = articles;
    this.data.page = rawData.page;

    return this.data;
  }
}