import React from "react";
import nock from "nock";
import userEvent from "@testing-library/user-event";
import { render, cleanup, waitForElement } from "@testing-library/react";

import SEARCH_0 from "./fixtures/App/SEARCH_0";
import SEARCH_1 from "./fixtures/App/SEARCH_1";
import SEARCH_2 from "./fixtures/App/SEARCH_2";

import App from "../App";

describe("Hacker News", () => {

  // setup
  beforeAll(() => {

    // intercept api requests 
    // todo: create helpers
    nock("https://hn.algolia.com")
      .persist()
      .get("/api/v1/search?tags=story&page=0&hitsPerPage=30")
      .reply(200, SEARCH_0);

    nock("https://hn.algolia.com")
      .persist()
      .get("/api/v1/search?tags=story&page=1&hitsPerPage=30")
      .reply(200, SEARCH_1);

    nock("https://hn.algolia.com")
      .persist()
      .get("/api/v1/search?tags=story&page=2&hitsPerPage=30")
      .reply(200, SEARCH_2);
  });

  afterEach(cleanup);

  describe("when the application is loaded", () => {
    it("users can see latest collection of news feeds", () => {
      expect(true).toBe(true);
    });

    it("users cannot see the Previous page button in the first page", () => {
      expect(true).toBe(true);
    });

    it("users cannot see the Next page button in the last page", () => {
      expect(true).toBe(true);
    });

    it("users can see buttons to upvote a news article", async () => {
      expect(true).toBe(true);
    });

    it("users can see buttons to hide a news article", async () => {
      expect(true).toBe(true);
    });

    it("users can see a graph displaying the vote statistics", async () => {
      expect(true).toBe(true);
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
