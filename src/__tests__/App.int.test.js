/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import nock from "nock";
import waitUntil from "async-wait-until";

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
      "3": SEARCH_3,
    };

    Object.keys(mockResponse).forEach((page) => {
      // intercept api requests and respond with mock data
      nock("https://hn.algolia.com")
        .get(`/api/v1/search?tags=story&page=${page}&hitsPerPage=30`)
        .reply(100, mockResponse[page], { "Access-Control-Allow-Origin": "*" });
    });

    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  describe("when the application is loaded", () => {

    it("users can see latest collection of news feeds", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let articles = container.querySelectorAll(".news-article");
      expect(articles.length).toEqual(30);

      next();
    });

    it("users can see a Title for every article", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let firstArticle = container.querySelector(".news-article");
      let title = firstArticle.querySelector(".article-title");
      expect(title).toBeDefined();
      expect(title.innerHTML).toContain("Steve Jobs has passed away.");

      next();
    });

    it("users can see an URL for every article", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let firstArticle = container.querySelector(".news-article");
      let urlElm = firstArticle.querySelector(".article-url > a");
      expect(urlElm).toBeDefined();
      expect(urlElm.innerHTML).toContain("www.apple.com");

      next();
    });

    it("users can see creation time info for every article", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let firstArticle = container.querySelector(".news-article");
      let creationElm = firstArticle.querySelector(".article-creation-time");
      expect(creationElm).toBeDefined();
      expect(creationElm.innerHTML).toBe("9 years ago");

      next();
    });

    it("users can see author info for every article", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let firstArticle = container.querySelector(".news-article");
      let authorElm = firstArticle.querySelector(".article-author-value");
      expect(authorElm).toBeDefined();
      expect(authorElm.innerHTML).toBe("patricktomas");

      next();
    });

    it("users can see comments count for every article", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let firstArticle = container.querySelector(".news-article");
      let commElm = firstArticle.querySelector(".article-comments-value");
      expect(commElm).toBeDefined();
      expect(commElm.innerHTML).toBe("376");

      next();
    });

    it("users can see votes count for every article", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let firstArticle = container.querySelector(".news-article");
      let voteCountElm = firstArticle.querySelector(
        ".article-vote-count-value"
      );
      expect(voteCountElm).toBeDefined();
      expect(voteCountElm.innerHTML).toBe("4271");

      next();
    });

    it("users can see a UpVote button for every article", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let firstArticle = container.querySelector(".news-article");
      let upVoteBtn = firstArticle.querySelector(".article-upvote > button");
      expect(upVoteBtn).toBeDefined();
      expect(upVoteBtn.innerHTML).toContain("UpVote");

      next();
    });

    it("users can see a Hide button for every article", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let firstArticle = container.querySelector(".news-article");
      let hideBtn = firstArticle.querySelector(".article-hide > button");

      expect(hideBtn).toBeDefined();
      expect(hideBtn.innerHTML).toContain("Hide");
      next();
    });

    it("users cannot see the Previous page link in the first page", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let previousLink = container.querySelector(
        ".news-articles-navigation-previous > a"
      );
      expect(previousLink).toBe(null);
      next();
    });

    it("users can see the Next page link in the first page", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let nextLink = container.querySelector(
        ".news-articles-navigation-next > a"
      );
      expect(nextLink).toBeDefined();
      expect(nextLink.innerHTML).toBe("Next");

      next();
    });

    it("users can see a graph displaying the vote statistics", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-graph > div > svg"));

      let newsGraph = container.querySelector(".news-graph");

      expect(newsGraph).toBeDefined();

      next();
    });
  });

  describe("after the application is loaded", () => {

    it("users can upvote a news article", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let firstArticle = container.querySelector(".news-article");
      let upVoteBtn = firstArticle.querySelector(".article-upvote > button");
      let votesCountElm = firstArticle.querySelector(
        ".article-vote-count-value"
      );
      let currVotes = Number(votesCountElm.innerHTML);
      let newVotes = Number(votesCountElm.innerHTML) + 1;

      expect(upVoteBtn.disabled).toBe(false);
      expect(votesCountElm.innerHTML).toContain(currVotes);

      act(() => {
        upVoteBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(upVoteBtn.disabled).toBe(true);
      expect(Number(votesCountElm.innerHTML)).toBe(newVotes);

      next();
    });

    it("users can hide a news article", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let firstArticle = container.querySelector(".news-article");
      let hideBtn = firstArticle.querySelector(".article-hide-value");

      act(() => {
        hideBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      let newFirstArticle = container.querySelector(".news-article")
      expect(firstArticle === newFirstArticle).toBe(false)
      next();

      expect(true).toBe(true);

      next();
    });

    

    it("users can navigate to the Next page", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let nextBtn = container.querySelector(
        ".news-articles-navigation-next > a"
      );

      let firstArticle = container.querySelector(".news-article");

      act(() => {
        nextBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      // TODO: Temporary workaround. This is not the right way to test async state changes.
      setTimeout(() => {
        let secondPageFirstArticle = container.querySelector(".news-article");
        expect(firstArticle === secondPageFirstArticle).toBe(false);

        next();
      }, 10);
    });

    it("users can navigate to the Previous page", async (next) => {
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let nextBtn = container.querySelector(
        ".news-articles-navigation-next > a"
      );

      let firstArticle = container.querySelector(".news-article");

      act(() => {
        nextBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      // TODO: Temporary workaround. This is not the right way to test async state changes.
      setTimeout(() => {
        let prevBtn = container.querySelector(
          ".news-articles-navigation-previous > a"
        );



        act(() => {
          prevBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        setTimeout(() => {

          let newArticle = container.querySelector(".news-article");
          expect(newArticle.innerHTML === firstArticle.innerHTML).toBe(true)
          next();

        }, 10);

      }, 10);


    });

    it("users should not see Next page link in last page", async (next) => {
    
      act(() => {
        render(<App />, container);
      });

      await waitUntil(() => container.querySelector(".news-article"));

      let nextBtn = container.querySelector(
        ".news-articles-navigation-next > a"
      );

      act(() => {
        // goto /page/1
        nextBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      // TODO: Temporary workaround. This is not the right way to test async state changes.
      setTimeout(() => {

        expect(nextBtn.href).toContain('page/3');

        act(() => {
          // goto /page/2
          nextBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        setTimeout(() => {
          expect(nextBtn.href).toContain('page/3');

          act(() => {
            // goto /page/3
            nextBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          });
          
          setTimeout(() => {
            // you are in /page/3
            nextBtn = container.querySelector(
              ".news-articles-navigation-next > a"
            );
            expect(nextBtn).toBe(null);
            next();

          }, 20)
          
        }, 20);
        
        
      }, 20);

    });
  });
});
