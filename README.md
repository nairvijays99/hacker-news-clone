Hacker News clone assessment

#Context

Hacker News is a community started by Paul Graham for sharing &quot;Anything that good hackers
would find interesting. That includes more than hacking and startups. If you had to reduce it to a
sentence, the answer might be: anything that gratifies one&#39;s intellectual curiosity.&quot; Link:
https://news.ycombinator.com/

#Problem Statement
Create a hacker news clone using React with Server Side Rendering and hydration..

#Component Tree Breakdown
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


