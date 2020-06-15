import axios from "axios";
const API_ENDPOINT = "https://hn.algolia.com/api/v1/";

// when the application loads in the browser, check for the initial state passed on by the server,
// if it's available use it as the initial state to hydrate the client side react
// node will ignore the window check and and return the default empty state
// todo: use prop-types for default shape

const INITIAL_STATE = {
  articles: {},
  page: null,
};

// default params to fetch data for the initial state of the application
// in our case, search endpoint should return the first lists of articles from the article list

const INITIAL_PARAMS = {
  search: {
    tags: "story",
    page: 0,
    hitsPerPage: 30,
  },
};

class NewsApi {
  constructor(state) {
    // set the initial state of the application
    this.state = { ...INITIAL_STATE };

    // set default params to fetch initial state
    this.params = { ...INITIAL_PARAMS };

    this.subscribers = [];

    // expose axios as agent for api calls
    this.agent = axios.create({
      baseURL: API_ENDPOINT.slice(),
    });

    // set newly passed state
    this.setState(state);

    return this;
  }

  setState(state) {
    if (!state || !state.articles) {
      return;
    }

    // in case you need it in future
    this.prevState = this.state;

    // override the current state if a new state was passed with creation
    Object.assign(this.state, { ...state });

    // check for any user values in local storage and apply strategies on state
    this.applyLocalStorageStrategies();

    // let all subscribers know about the state change
    this.publish();
  }

  search(search = {}) {
    // extend search from default params
    const params = Object.assign({ ...this.params.search }, search);

    // wrapping this in a promise chain for the convenience of invocators
    // ex: server.js
    return new Promise((resolve, reject) => {

      this.agent.get("/search", { params }).then((response) => {
        let responseData = response.data;
        let articles = this.processArticles(responseData);
        let page = responseData.page;

        // new state creation
        let newState = {...this.state};
        newState.articles = articles;
        newState.page = page;

        // set the new state
        this.setState(newState);

        resolve(this.state);

      }).catch((err) => {

        reject(err);

      });
    });
  }

  processArticles = (rawData) => {
    return rawData.hits.reduce((articles, article) => {
      let articleData = {
        author: article.author,
        comments: article.num_comments,
        created_at: article.created_at,
        hidden: false,
        id: article.objectID,
        title: article.title,
        votes: article.points,
        url: article.url,
      };

      articles[articleData.id] = articleData;

      return articles;
    }, {});
  };

  getWindowContext() {
    if (typeof window !== "undefined") {
      return window;
    } else {
      return null;
    }
  }

  getLocalStorage() {
    if (!this.getWindowContext() || !this.getWindowContext().localStorage) {
      return null;
    } else {
      return this.getWindowContext().localStorage;
    }
  }

  applyLocalStorageStrategies() {
    // upvotes, hide etc will be save on the client machine
    // ideally this should be part of api.post(), but storing it locally for this example

    if (!this.getLocalStorage()) {
      return null;
    }

    let localStorage = this.getLocalStorage();
    let strategies = localStorage.getItem("NewsApiStrategies");

    if (!strategies) {
      return;
    }

    let hiddenArticles = strategies.hidden || [];
    let upVotedArticles = strategies.upvotes || [];

    Object.values(this.state.articles).forEach((article) => {
      if (hiddenArticles.match(article.id)) {
        article.hidden = true;
      }

      if (upVotedArticles.match(article.id)) {
        article.voted = true;
      }
    });
  }

  subscribe(setStateFn) {
    return this.subscribers.push(setStateFn);
  }

  publish() {
    this.subscribers.forEach((setState) => {
      setState({
        ...this.state,
      });
    });
  }

  unsubscribe(subscriptionId) {
    this.subscribers.splice(subscriptionId - 1, 1);
  }
}

export default NewsApi;
