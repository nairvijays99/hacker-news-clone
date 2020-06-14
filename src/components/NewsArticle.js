import React, {useContext} from 'react';
import {NewsContext} from '../context/NewsContext';
import ArticleAuthorName from './ArticleAuthorName';
import ArticleUrl from './ArticleUrl';
import ArticleComments from './ArticleComments';
import ArticleCreationTime from './ArticleCreationTime';
import ArticleTitle from './ArticleTitle';
import ArticleUpVote from './ArticleUpVote';
import ArticleVoteCount from './ArticleVoteCount';


export default function NewsArticle(props) {

    const context = useContext(NewsContext);
    const article = context.articles[props.id];

    console.log('article title = ', article.title);

    return (
        <div className="newsArticle">
            <ArticleTitle value={article.title} />
            <ArticleAuthorName value={article.authorName} />
            <ArticleUrl value={article.url} />
            <ArticleComments value={article.comments} />
            <ArticleCreationTime value={article.created_at} />
            <ArticleVoteCount value={article.votes}/>
            <ArticleUpVote value={article.votes}/>
        </div>
    )
}
