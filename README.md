#Hacker News Assessment - Publicis Sapient

Hacker News is a community started by Paul Graham for sharing &quot;Anything that good hackers
would find interesting. That includes more than hacking and startups. If you had to reduce it to a
sentence, the answer might be: anything that gratifies one&#39;s intellectual curiosity.&quot; 

Original Link: [Refernce Application](https://news.ycombinator.com/) 

API: [https://hn.algolia.com/api](https://hn.algolia.com/api)

Latest Deployment: http://hacker-news-clone-ssr.herokuapp.com/

Since the shell (index.html) is cached by service worker, it's advisable to test ssr either in incognito mode or ```curl https://hacker-news-clone-ssr.herokuapp.com/```. SW applies the default cache-first strategy that react bundles with CRA. 

###Usage:

`npm run dev` to run server development. Need to run `npm run build-local` after client side changes.
`npm run react` is equivalet to create-react-app's `npm run start`. Ideal for client side development.
`npm run test` to run integration test.
`npm run verify-test` to run test coverage.
`npm run build-local` to build local bundles for client and server
`npm run serve` to serve the build

##Problem Statement

Create a hacker news clone using React with Server Side Rendering and hydration.

##Solution

Created a single page application using react front-end library and express.js for server side rendering. 

##Could not be completed

1) Proxy api requests through our http server. The implementation should be straight forward in ```server.js``` and ```NewsApi.js```.
2) Abstractions and cleanup. This applies to most modules.
3) Need better approach to test async functionality. More tests
4) Graph Customisation - Could not match it with markup
5) useReducers with context
6) Issues with babel transpiled server code. Running prod server on babel node.
7) Client side and server side security vularabilities
8) Added some aria roles for elements
9) SEO,Accessibility, PWA - No extra effort added. But the scores are pretty good. 
10) Offline mode shows a blank shell. Shell can be customised to show some meaningful data.
11) Created seperate context for articles
12) Use useContext in article components
13) Did not like the test. Though it works it's sloppy. Need better approach to cover async functionality. Could not write tests for Server side
14) Deployment of branch builds.


--------------------------

###Component Tree Breakdown

<Shell>
  <App store={currentPage, articles: [article, article]} >
    <NewsDashboard>
      <NewsArticleList {articles}>
        <NewsArticle {articles[article]}>
          <Comments {article}>
          <VoteCount {article}>
          <UpVote {article}>
          <Hide {article}>
          <AuthorName {article}>
          <AuthorWebsite {article}>
          <Time {article}>
          <Title {article}>
        </NewsArticle>
        <NewsArticle>...</NewsArticle>
      </NewsArticleList>
      <NewsArticleNavigation>
        <NextPost {currentPage} >
        <PrevPost {currentPage} >
      </NewsArticleNavigation>
      <Graph>TBD</Grapph>
    </NewsDashboard>
  </App>
</Shell>

#Server Side Rendering

Stage 1:
1) Users access Hacker-News-Clone dashboard
2) Express.js server will intercept '/' request
2) DataFetch module will make an api call
4) Create a store with raw data and processed the data
5) Render <App /> to string with store data
6) Content replacement of <div root> and expose raw data as {initialData} in window scope

Stage 2:
1) Respond based on page query
2) Mem-Cache response


#Client Side Rendering

Stage 1:
1) Users access Hacker-News-Clone dashboard
2) Server responds with initial markup and initial data
3) Create a store and process initial data
4) Merge data with local app data (hidden articles, upvotes)
5) Hydra <App /> with store data

Stage 2:
1) Set up Service Worker
2) Enhancements, SEO & Accessibility

#Deployment

#API's

Fetch Pages -> https://hn.algolia.com/api/v1/search?tags=story&page=&hitsPerPage=30


