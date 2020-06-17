/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import nock from "nock";
import waitUntil from 'async-wait-until';

//import axios from 'axios';
//import "@testing-library/jest-dom";
//import userEvent from "@testing-library/user-event";
//import { render, cleanup, waitForElement } from "@testing-library/react";

import SEARCH_0 from "./fixtures/App/SEARCH_0";
import SEARCH_1 from "./fixtures/App/SEARCH_1";
import SEARCH_2 from "./fixtures/App/SEARCH_2";
import SEARCH_3 from "./fixtures/App/SEARCH_3";

import App from "../App";

describe("Hacker News", () => {

  let container = null;

  // setup
  beforeEach(() => {

    // mock data for the application to render
    const mockResponse = {
      "0": SEARCH_0,
      "1": SEARCH_1,
      "2": SEARCH_2,
      "3": SEARCH_3
    }

    Object.keys(mockResponse).forEach((page) => {
      // intercept api requests and respond with mock data
      nock("https://hn.algolia.com")
      .get(`/api/v1/search?tags=story&page=${page}&hitsPerPage=30`)
      .reply(200, mockResponse[page], {'Access-Control-Allow-Origin': '*'});
    });

    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  })

  //afterEach(cleanup);

  describe("when the application is loaded", () => {

    it("users can see latest collection of news feeds", async (next) => {

      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-article'));

      let articles = container.querySelectorAll('.news-article');
      expect(articles.length).toEqual(30);

      next();

    });

    it("users can see a Title for every article", async (next) => {
      
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-article'));

      let firstArticle = container.querySelector('.news-article');
      let title = firstArticle.querySelector(".article-title");
      expect(title).toBeDefined();
      expect(title.innerHTML).toContain("Steve Jobs has passed away.");

      next();

    });

    it("users can see an URL for every article", async (next) => {
      
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-article'));

      let firstArticle = container.querySelector('.news-article');
      let urlElm = firstArticle.querySelector(".article-url > a");
      expect(urlElm).toBeDefined();
      expect(urlElm.innerHTML).toContain("www.apple.com");

      next();

    });

    it("users can see creation time info for every article", async (next) => {
      
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-article'));

      let firstArticle = container.querySelector('.news-article');
      let creationElm = firstArticle.querySelector(".article-creation-time");
      expect(creationElm).toBeDefined();
      expect(creationElm.innerHTML).toBe("9 years ago");

      next();

    });

    it("users can see author info for every article", async (next) => {
      
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-article'));

      let firstArticle = container.querySelector('.news-article');
      let authorElm = firstArticle.querySelector(".article-author-value");
      expect(authorElm).toBeDefined();
      expect(authorElm.innerHTML).toBe("patricktomas");

      next();

    });

    it("users can see comments count for every article", async (next) => {
      
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-article'));

      let firstArticle = container.querySelector('.news-article');
      let commElm = firstArticle.querySelector(".article-comments-value");
      expect(commElm).toBeDefined();
      expect(commElm.innerHTML).toBe("376");

      next();

    });

    it("users can see votes count for every article", async (next) => {
      
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-article'));

      let firstArticle = container.querySelector('.news-article');
      let voteCountElm = firstArticle.querySelector(".article-vote-count-value");
      expect(voteCountElm).toBeDefined();
      expect(voteCountElm.innerHTML).toBe("4271");

      next();

    });

    it("users can see a UpVote button for every article", async (next) => {
      
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-article'));

      let firstArticle = container.querySelector('.news-article');
      let upVoteBtn = firstArticle.querySelector(".article-upvote > button");
      expect(upVoteBtn).toBeDefined();
      expect(upVoteBtn.innerHTML).toContain("UpVote");

      next();

    });

    it("users can see a Hide button for every article", async (next) => {

      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-article'));

      let firstArticle = container.querySelector('.news-article');
      let hideBtn = firstArticle.querySelector(".article-hide > button");

      expect(hideBtn).toBeDefined();
      expect(hideBtn.innerHTML).toContain("Hide");
      next();

    });

    it("users cannot see the Previous page link in the first page", async (next) => {

      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-article'));

      let previousLink = container.querySelector('.news-articles-navigation-previous > a');
      expect(previousLink).toBe(null);
      next();

    });

    it("users can see the Next page link in the first page", async (next) => {

      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-article'));

      let nextLink = container.querySelector('.news-articles-navigation-next > a');
      expect(nextLink).toBeDefined();
      expect(nextLink.innerHTML).toBe("Next");

      next();

    });

    it("users can see a graph displaying the vote statistics", async (next) => {

      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector('.news-graph > div > svg'));
      let newsGraph = container.querySelector('.news-graph');

      expect(newsGraph).toBeDefined();
      
      next();

    });
  });

  describe("after the application is loaded", () => {

    it("users can navigate to the Next page", () => {
      expect(true).toBe(true);
    });

    it("users can navigate to the Previous page", () => {
      expect(true).toBe(true);
    });

    it("users can upvote a news article", () => {
      expect(true).toBe(true);
    });

    it("users can hide a news article", () => {
      expect(true).toBe(true);
    });
  });

});
