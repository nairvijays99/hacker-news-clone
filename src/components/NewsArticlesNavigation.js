import React from 'react'

export default function NewsArticlesNavigation() {
    return (
        <div className="news-articles-navigation">
            <div className="news-articles-navigation-previous">
                <a href="?page=0">Previous</a>
            </div>
            <div className="news-articles-navigation-next">
                <a href="?page=1">Next</a>
            </div>
        </div>
    )
}
