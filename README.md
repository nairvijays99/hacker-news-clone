#Hacker News Assessment for Publicis Sapient

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

####Completed Features & Integrations
1) Responsive (Mobile & Desktop experience)
2) Upvote (cached locally)
3) Hide (cached locally)
4) Next (Bookmarkable)
5) Prev (Bookmarkable)
6) Graph (Customisation incomplete)
7) Integration test (No server side test. No individual units for components. No acceptance tests.)
8) CI
9) PWA
10) SSR

No functional bugs

##Stack
1) React - The main Stack
2) Express.js - Server
3) Axios - Async requests for server side and client side
4) Victory - Graph
5) babel-node - for runtime transpilation
6) compression - gzip assets
7) nock - mock api requests
8) Travis - CI
9) Heroku - Deployment

Tried to keep dependency minimal

##Could not be completed

1) Proxy api requests through our http server. The implementation should be straight forward in ```server.js``` and ```NewsApi.js```.
2) Abstractions (agents, helpers etc) and cleanup. This applies to most modules.
3) Need better approach to test async functionality. More tests
4) Graph Customisation
5) useReducers with context
6) Issues with babel transpiled server code. Running prod server on babel node.
7) Client side and server side security vularabilities
8) Added some aria roles for elements
9) SEO,Accessibility, PWA - No extra effort added. But the scores are pretty good. 
10) Offline mode shows a blank shell. Shell can be customised to show some meaningful data.
11) Created seperate context for articles
12) Use useContext in article components (zero prop drill)
13) Did not like the test. Though it works it's sloppy. Need better approach to cover async functionality. Could not write tests for Server side.
14) Deployment of branch builds.
15) Momoize api response in session (or from local store)


##Server Side Life Cycle
in a nutshell..

1) node ./src/server/index.js -> Let's call it #SERVER_SCRIPT
2) #SERVER_SCRIPT reads and caches the local asset ```build/index.html```. This is generated by react build script.
3) http://<HOISTED_URL>.com
4) Request is intercepted by #SERVER_SCRIPT
5) #SERVER_SCRIPT fetches the initial state
6) ReactDOMServer(<App serverState={initstate}/>)
7) Goes through Client Side Lifecycle from #7 by passing state to news context
7) Initial state (```window.NewsApiState={initState}``` && ```window.ssr=true;```) is written to response string using index.html template
8) Empty #root is replaced with inital markup generated by ReactDOMServer
9) sendToClient()

##Client Side Lifecycle 
in a nutshell..

...if running on a #SERVER_SCRIPT node server
1) http://<HOISTED_URL>.com
2) Server responds with initial rendered data
3) ./src/dom/index.js #CLIENT_SCRIPT
4) Checks for ```ssr``` flag in window scope
6) hydrate(<App />) if it's server side rendered (```window.ssr=false```)
7) <App /> renders <NewsDashboard /> with <NewsContext /> provider
8) <NewsContext /> reads the initial state from ```window.NewsApiState``` (```props.serverState``` in node) and sets it as default <API/> state
9) React render life cycle
10) Done

...if running on a asset server (pure client side app)

1) http://<HOISTED_URL>.com
2) Server responds with index.html
3) ./src/dom/index.js #CLIENT_SCRIPT
4) Checks for ```ssr``` flag in window scope
6) render(<App />) if it's not server side rendered (```window.ssr=false```)
7) <App /> renders <NewsDashboard /> with <NewsContext /> provider
8) <NewsContext /> checks for initial state (```window.NewsApiState=false```)
9) <NewsContext /> trigger a <NewsApi/> fetch call
10) <NewsContext /> subscribes to <NewsApi/> state
11) <NewsApi/> completes initial fetch and updates its state
12) <NewsContext /> is notified
13) React render life cycle
14) Done

----------------------------------------------------------

Pre/initial development

###Component Tree Breakdown

<Shell>
  <App  >
    <NewsDashboard>
      <NewsArticleList>
        <NewsArticle>
          <Comments>
          <VoteCount>
          <UpVote>
          <Hide>
          <AuthorName>
          <AuthorWebsite>
          <Time>
          <Title>
        </NewsArticle>
        <NewsArticle>...</NewsArticle>
      </NewsArticleList>
      <NewsArticleNavigation>
        <NextPost>
        <PrevPost>
      </NewsArticleNavigation>
      <Graph></Grapph>
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


