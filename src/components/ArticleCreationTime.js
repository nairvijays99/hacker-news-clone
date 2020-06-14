import React from 'react'

export default function ArticleCreationTime(props) {

    const getTimeAgo = (timestamp) => {

        let currentTime = new Date();
        let targetTime = new Date(timestamp);
        let elapsedTime = currentTime - targetTime;
        let ms = 1000;
        let min = 60 * ms;
        let hour = 60 * min;
        let day = hour * 24;
        let month = day * 31;
        let year = day * 365;

        if (elapsedTime < min) {
            return Math.round(elapsedTime/ms) + ' seconds ago';
        }

        if (elapsedTime < hour) {
            return Math.round(elapsedTime/min) + ' minutes ago';
        }

        if (elapsedTime < day) {
            return Math.round(elapsedTime/hour) + ' hours ago';
        }

        if (elapsedTime < month) {
            return Math.round(elapsedTime/day) + ' days ago';
        }

        if (elapsedTime < year) {
            return Math.round(elapsedTime/month) + ' months ago';
        }

        if (elapsedTime > year) {
            return Math.round(elapsedTime/year) + ' years ago';
        }
    };

    return (
        <div className='article-creation-time'>
            {getTimeAgo(props.value)}
        </div>
    )
}
