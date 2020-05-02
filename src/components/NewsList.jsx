import React from 'react'
import "bulma"

/**
 * NewsListItem component (for being included in NewsList)
 * @param {object} props
 * @param {string} props.title 
 * @param {number} props.timestamp
 * @param {string} props.url
 * @return {JSX.Element}
 */
export const NewsListItem = ({ title, timestamp, url }) => {
  const dt = new Date(timestamp * 1000)
  return (
    <li className="card news-li">
      <a className="card-content news-li-content" href={url}>
      <img
          src="https://bulma.io/images/placeholders/1280x960.png"
          alt="Placeholder"
          className="news-li-thumbnail"
        />
        <div className="content">
          <span className="news-li-title">
            { title }
          </span>
          <time className="news-li-timestamp" dateTime={dt.toISOString()}>{dt.toLocaleDateString()}</time>
        </div>
      </a>
    </li>
  )
};

/**
 * NewsList component
 * @param {object} props
 * @param {Array.<{title: string; timestamp: number; url: string}>} props.items
 */

 const NewsList = ({ items }) => (
   <ul className="news-ul">
     {
       items.map(item => <NewsListItem key={item.timestamp} { ...item } />)
     }
   </ul>
 )

export default NewsList
