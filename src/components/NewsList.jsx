import React from 'react'
import { Link } from 'gatsby'

import ListThumbnail from './ListThumbnail'

/**
 * NewsListItem component (for being included in NewsList)
 * @param {Object} props
 * @param {string} props.title 
 * @param {string} props.date
 * @param {string} props.to
 * @param {Object} props.thumbnailImageFile
 * @param {string} props.thumbnailImageAlt
 * @return {JSX.Element}
 */
export const NewsListItem = ({ title, date, to, excerpt, thumbnailImageFile, thumbnailImageAlt }) => {
  const dt = new Date(date)
  return (
    <li className="media">
      <Link className="is-flex" to={to}>
        {
          thumbnailImageFile && 
          <ListThumbnail
            fixed={thumbnailImageFile}
            alt={thumbnailImageAlt}
            className="media-left"
          />
        }
        <div className="media-content">
          <p className="news-title is-size-5">
            { title }
          </p>
          <p className="news-excerpt is-size-6 has-text-grey">
            { excerpt }
          </p>
          <p className="news-meta is-size-6 has-text-grey">
            <time dateTime={dt.toISOString()}>{dt.toLocaleDateString()}</time>
          </p>
        </div>
      </Link>
    </li>
  )
};

/**
 * NewsList component
 * @param {object} props
 * @param {Array.<{title: string; date: string; to: string; thumbnailImageFile: object; thumbnailImageAlt: string}>} props.items
 */

 const NewsList = ({ items }) => (
   <ul className="box news-list">
     {
       items.map(item => <NewsListItem key={`${item.to}`} { ...item } />)
     }
   </ul>
 )

export default NewsList
