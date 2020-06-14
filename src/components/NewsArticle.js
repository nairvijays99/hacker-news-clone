import React, {useContext} from 'react';
import {NewsContext} from '../context/NewsContext';
import ArticleAuthor from './ArticleAuthor';
import ArticleHide from './ArticleHide';
import ArticleUrl from './ArticleUrl';
import ArticleComments from './ArticleComments';
import ArticleCreationTime from './ArticleCreationTime';
import ArticleTitle from './ArticleTitle';
import ArticleUpVote from './ArticleUpVote';
import ArticleVoteCount from './ArticleVoteCount';


export default function NewsArticle(props) {

    const context = useContext(NewsContext);
    const article = context.articles[props.id];

    return (
        <div className="news-article">
            <ArticleTitle value={article.title} />
            <ArticleUrl value={article.url} />
            <ArticleAuthor value={article.author} />
            <ArticleCreationTime value={article.created_at} />
            <ArticleUpVote value={article.votes}/>
            <ArticleVoteCount value={article.votes}/>
            <ArticleComments value={article.comments} />
            <ArticleHide />
        </div>
    )
}
