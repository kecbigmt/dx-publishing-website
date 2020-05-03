import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

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
    <li className="card news-li">
      <Link className="card-content news-li-content" to={to}>
        {
          thumbnailImageFile && 
          <Img
            fixed={thumbnailImageFile}
            alt={thumbnailImageAlt}
            className="news-li-thumbnail"
          />
        }
        <div className="content">
          <span className="news-li-title">
            { title }
          </span>
          <span className="news-li-excerpt">
            { excerpt }
          </span>
          <time dateTime={dt.toISOString()}>{dt.toLocaleDateString()}</time>
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
   <ul className="news-ul">
     {
       items.map(item => <NewsListItem key={`${item.to}`} { ...item } />)
     }
   </ul>
 )

export default NewsList
